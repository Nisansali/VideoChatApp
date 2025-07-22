import React from "react";

export default function RecordingControls({ callObject }) {
  const startRecording = async () => {
    try {
      await callObject.startRecording({
        layout: { type: "grid" },
      });
    } catch (err) {
      console.error("Start recording error:", err);
    }
  };

  const stopRecording = async () => {
    try {
      await callObject.stopRecording();
    } catch (err) {
      console.error("Stop recording error:", err);
    }
  };

  return (
    <div>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
    </div>
  );
}
