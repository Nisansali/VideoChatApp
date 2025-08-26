// import { Chat, useGame , usePlayer } from "@empirica/core/player/classic/react";
// import React, { useEffect } from "react";
// import { Profile } from "./Profile";
// import { Stage } from "./Stage";

// export function Game() {
//   const game = useGame();
//   const player = usePlayer();
//    if (!player) {
//     return <div>Loading...</div>;
//   }
//   useEffect(() => {
//     if (player) {
//       const group = player.get("controlGroup");
//       console.log("Player's group:", group);
//     }
//   }, [player]);

//   const group = player.get("controlGroup")
//   const { playerCount } = game.get("treatment");

//   return (
//     <div className="h-full w-full flex">
//       <div className="h-full w-full flex flex-col">
//         <Profile />
//         <div className="h-full flex items-center justify-center">
//           <Stage />
//         </div>
//       </div>

//       {playerCount > 1 && (
//         <div className="h-full w-128 border-l flex justify-center items-center">
//           <Chat scope={game} attribute="chat" />
//         </div>
//       )}
//     </div>
//   );
// }

import { Chat, useGame, usePlayer, useRound } from "@empirica/core/player/classic/react";
import React, { useEffect } from "react";
import { Profile } from "./Profile";
import { Stage } from "./Stage";

export function Game() {
  const game = useGame();
  const player = usePlayer();
  const round = useRound(); // 👈 get the current round

  if (!player) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    if (player) {
      const group = player.get("controlGroup");
      console.log("Player's group:", group);
    }
  }, [player]);

  const group = player.get("controlGroup");
  const { playerCount } = game.get("treatment");
  
  const treatment = game.get("treatment")
  console.log('TREATMENT',treatment)

  // Detect if current task is a survey
  const isSurvey = round?.get("task")?.toLowerCase().includes("survey");
  const isSurveyIntro = round?.get("task")?.toLowerCase().includes("intro");

  return (
    <div className="h-full w-full flex">
      <div className="h-full w-full flex flex-col">
        <Profile />
        <div className="h-full flex items-center justify-center">
          <Stage />
        </div>
      </div>

      {/* Only show chat if more than 1 player AND not in a survey */}
      {playerCount > 1 && !isSurvey &&  !isSurveyIntro &&(
        <div className="h-full w-128 border-l flex justify-center items-center">
          <Chat scope={game} attribute="chat" />
        </div>
      )}
    </div>
  );
}
