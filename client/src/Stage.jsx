import {
  useGame,
  usePlayer,
  usePlayers,
  useRound,
} from "@empirica/core/player/classic/react";

import { Loading } from "@empirica/core/player/react";
import React from "react";
import  { useEffect } from "react";
import { PostRound1Survey } from "./focus-flow/surveys/PostRound1Survey.jsx";
import  VideoChat  from "./VideoChat.jsx"
import { TaskResponseSurvey1 } from "./focus-flow/surveys/TaskResponseSurvey1.jsx";
import { FreshBiteIntro } from "./fresh-bite/FreshBiteIntro.jsx";
import { TaskResponseSurvey2 } from "./fresh-bite/TaskResponseSurvey2.jsx";
import FreshBiteVideo from "./fresh-bite/FreshBiteVideo.jsx";

export function Stage() {

  const player = usePlayer();
  const players = usePlayers();
  const round = useRound();
  const game = useGame();

  console.log(player.id)
   if (!player || !game || !round) {
    return <div>Loading...</div>; 
  }

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
      return <TaskResponseSurvey1 />;
    case "midsurvey":
      return <PostRound1Survey />
    case "freshbiteintro":
      return <FreshBiteIntro />;
    case "videochatfb":
      return <VideoChat />;
    case "taskresponsesurvey2":
      return <TaskResponseSurvey2/>
    default:
      return <div>Unknown task</div>;
  }
}


