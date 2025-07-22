

import {
  useGame,
  usePlayer,
  usePlayers,
  useRound,
} from "@empirica/core/player/classic/react";

import { Loading } from "@empirica/core/player/react";
import React from "react";
import VideoChat from "./VideoChat"; // 👈 import new stage
import  { useEffect } from "react";
import { Survey } from "./examples/Survey.jsx";
import { ChatModal } from "./examples/ChatModal.jsx";

export function Stage() {

  const player = usePlayer();
  const players = usePlayers();
  const round = useRound();
  const game = useGame();

  console.log(player.id)
   if (!player || !game || !round) {
    return <div>Loading...</div>; // ⏳ prevent premature render
  }

  console.log("✅ Ready:", {
    playerId: player._id,
    gameId: game._id,
    roundId: round._id,
  });

  if (player.stage.get("submit")) {
    if (players.length === 1) {
      return <Loading />;
    }

    return (
      <div className="text-center text-gray-400 pointer-events-none">
        Please wait for other player(s).
      </div>
    );
  }

  switch (round.get("task")) {
    case "videochat":
      return <VideoChat
        playerId={player.id}
        gameId={game.id}
        roundId={round.id}
      />; 
    case "surveyend":
      return <Survey />;
    case "modal":
      return <ChatModal />;
    default:
      return <div>Unknown task</div>;
  }
}


