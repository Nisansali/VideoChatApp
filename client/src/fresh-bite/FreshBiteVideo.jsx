import React, { useEffect, useRef, useState } from "react";
import DailyIframe from "@daily-co/daily-js";

export default function FreshBiteVideo({ playerId, gameId, roundId }) {
  const localVideoRef = useRef();
  const callObjectRef = useRef(null);

  const [remoteStreams, setRemoteStreams] = useState({});
  const [participantNames, setParticipantNames] = useState({});
  const [isRecording, setIsRecording] = useState(false);

  const roomUrlA = `https://brainstorm-project-25.daily.co/freshBite`;

  useEffect(() => {
    // ✅ Guard: reuse existing call instance if one already exists
    if (!callObjectRef.current) {
      callObjectRef.current = DailyIframe.createCallObject();
    }

    const callObject = callObjectRef.current;

    // If already joined another room, leave first
    if (callObject.meetingState() !== "new") {
      callObject.leave();
    }

    callObject.join({ url: roomUrlA });

    const handleJoined = () => {
      const localTrack = callObject.participants().local?.tracks?.video?.track;
      const localUser = callObject.participants().local?.user_name ?? "You";

      setParticipantNames((prev) => ({
        ...prev,
        [callObject.participants().local?.session_id]: localUser,
      }));

      if (localTrack && localVideoRef.current) {
        localVideoRef.current.srcObject = new MediaStream([localTrack]);
      }
    };

    const handleParticipantUpdated = (event) => {
      const { session_id, local, user_name, tracks } = event.participant;

      if (local) return;

      if (user_name) {
        setParticipantNames((prev) => ({
          ...prev,
          [session_id]: user_name,
        }));
      }

      const videoTrack = tracks.video?.track;
      const isPlayable = tracks.video?.state === "playable";

      if (isPlayable && videoTrack) {
        setRemoteStreams((prev) => {
          if (prev[session_id]) return prev;
          return {
            ...prev,
            [session_id]: new MediaStream([videoTrack]),
          };
        });
      }
    };

    const handleParticipantLeft = (event) => {
      const { session_id } = event.participant;
      setRemoteStreams((prev) => {
        const updated = { ...prev };
        delete updated[session_id];
        return updated;
      });

      setParticipantNames((prev) => {
        const updated = { ...prev };
        delete updated[session_id];
        return updated;
      });
    };

    callObject.on("joined-meeting", handleJoined);
    callObject.on("participant-updated", handleParticipantUpdated);
    callObject.on("participant-left", handleParticipantLeft);

    return () => {
      // ✅ Proper cleanup to avoid duplicate instance errors
      callObject.leave();
      callObject.destroy();
      callObjectRef.current = null;

      callObject.off("joined-meeting", handleJoined);
      callObject.off("participant-updated", handleParticipantUpdated);
      callObject.off("participant-left", handleParticipantLeft);
    };
  }, [roomUrlA]); // Still depends on roomUrl so it can switch rooms safely

  const startRecording = async () => {
    try {
      await callObjectRef.current.startRecording();
      setIsRecording(true);
    } catch (err) {
      console.error("Failed to start recording:", err);
    }
  };

  const stopRecording = async () => {
    try {
      await callObjectRef.current.stopRecording();
      setIsRecording(false);
    } catch (err) {
      console.error("Failed to stop recording:", err);
    }
  };

  const RemoteVideo = ({ stream, name }) => {
    const ref = useRef();
    useEffect(() => {
      if (ref.current && stream) {
        if (ref.current.srcObject !== stream) {
          ref.current.srcObject = stream;
        }
      }
    }, [stream]);

    return (
      <div style={{ textAlign: "center" }}>
        <video
          ref={ref}
          autoPlay
          playsInline
          style={{ width: "500px", border: "2px solid blue" }}
        />
        <div style={{ marginTop: "5px", fontWeight: "bold" }}>{name}</div>
      </div>
    );
  };

  return (
    <div>
      {/* Recording Controls */}
      <div style={{ marginBottom: "20px" }}>
        {!isRecording ? (
          <button onClick={startRecording}>Start Recording</button>
        ) : (
          <button onClick={stopRecording}>Stop Recording</button>
        )}
      </div>

      {/*  Video Streams */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <div style={{ textAlign: "center" }}>
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            style={{ width: "500px", border: "2px solid black" }}
          />
          <div style={{ marginTop: "5px", fontWeight: "bold" }}>You</div>
        </div>

        {Object.entries(remoteStreams).map(([id, stream]) => (
          <RemoteVideo
            key={id}
            stream={stream}
            name={participantNames[id] || "Participant"}
          />
        ))}
      </div>
    </div>
  );
}
