
import React, { useEffect, useRef, useState, useCallback } from "react";

export default function VideoChat({ playerId, gameId, roundId }) {
  const [peer, setPeer] = useState(null);
  const [connections, setConnections] = useState({});
  const localVideoRef = useRef();
  const peersRef = useRef({});
  const myStreamRef = useRef();

  const shortId = (id) => id.slice(-6);
  const basePeerId = `${shortId(gameId)}-${shortId(roundId)}-${shortId(playerId)}`;
  const maxRetries = 5;

  const handlePeers = useCallback(
    (e) => {
      const otherIds = e.detail;
      otherIds.forEach((id) => {
        if (!peersRef.current[id] && id !== peer?.id && peer && myStreamRef.current) {
          console.log(`📞 Calling peer ${id} from ${peer.id}`);
          const call = peer.call(id, myStreamRef.current);
          call.on("stream", (remoteStream) => {
            addRemoteVideo(id, remoteStream);
          });
          call.on("error", (err) => {
            console.error("Call error:", err);
          });
          peersRef.current[id] = call;
        }
      });
    },
    [peer]
  );

  useEffect(() => {
    window.addEventListener("empirica-peers", handlePeers);
    return () => {
      window.removeEventListener("empirica-peers", handlePeers);
    };
  }, [handlePeers]);

  useEffect(() => {
    let Peer; // declared outside for scope
    let attempt = 0;

    const generatePeerId = () =>
      attempt === 0 ? basePeerId : `${basePeerId}-${attempt}`;

    const connectPeer = () => {
      const id = generatePeerId();
      console.log(`🔌 Attempting connection with peer ID: ${id}`);

      const newPeer = new Peer(id, {
        host: "localhost",
        port: 9000,
        path: "/",
        secure: false,
      });

      newPeer.on("open", () => {
        console.log("Peer connected with ID:", newPeer.id);
        setPeer(newPeer);
      });

      newPeer.on("call", (call) => {
        console.log("Incoming call from", call.peer);
        call.answer(myStreamRef.current);
        call.on("stream", (remoteStream) => {
          if (!peersRef.current[call.peer]) {
            addRemoteVideo(call.peer, remoteStream);
            peersRef.current[call.peer] = call;
          }
        });
        call.on("error", (err) => {
          console.error("Call error (incoming):", err);
        });
      });

      newPeer.on("error", (err) => {
        if (err.type === "unavailable-id" && attempt < maxRetries) {
          console.warn(`ID "${id}" is taken. Retrying...`);
          attempt++;
          connectPeer(); // Retry with a new ID
        } else {
          console.error("Peer error:", err);
        }
      });
    };

    import("peerjs").then(({ default: ImportedPeer }) => {
      Peer = ImportedPeer;

      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          myStreamRef.current = stream;
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
          connectPeer(); // safe to use Peer now
        })
        .catch((err) => {
          console.error("getUserMedia error:", err);
        });
    });

    return () => {
      if (peer) peer.destroy();
      Object.values(peersRef.current).forEach((call) => call.close());
      if (myStreamRef.current) {
        myStreamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []); // only on mount

  function addRemoteVideo(id, stream) {
    setConnections((prev) => ({
      ...prev,
      [id]: stream,
    }));
  }

  const RemoteVideo = ({ stream }) => {
    const ref = useRef();
    useEffect(() => {
      if (ref.current) {
        ref.current.srcObject = stream;
      }
    }, [stream]);

    return (
      <video
        ref={ref}
        autoPlay
        playsInline
        style={{ width: "500px", border: "2px solid blue" }}
      />
    );
  };

  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      <video
        ref={localVideoRef}
        autoPlay
        muted
        playsInline
        style={{ width: "500px", border: "2px solid black" }}
      />
      {Object.entries(connections).map(([id, stream]) => (
        <RemoteVideo key={id} stream={stream} />
      ))}
    </div>
  );
}
