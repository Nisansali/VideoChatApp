// import {
//   useGame,
//   usePlayer,
//   usePlayers,
//   useRound,
// } from "@empirica/core/player/classic/react";

// import { Loading } from "@empirica/core/player/react";
// import React from "react";
// import { JellyBeans } from "./examples/JellyBeans";
// import { MineSweeper } from "./examples/MineSweeper";
// import VideoChat from "./VideoChat"; // 👈 import new stage
// import  { useEffect } from "react";

// export function Stage() {

//   const player = usePlayer();
//   const players = usePlayers();
//   const round = useRound();
//   const game = useGame();

//   console.log(player.id)
//    if (!player || !game || !round) {
//     return <div>Loading...</div>; // ⏳ prevent premature render
//   }

//   console.log("✅ Ready:", {
//     playerId: player._id,
//     gameId: game._id,
//     roundId: round._id,
//   });

//   useEffect(() => {
//   if (!player || !players || !game || !round) return;

//   const otherPlayerIds = players
//     .filter((p) => p.id !== player.id)
//     .map((p) => `${game.id.slice(-6)}-${round.id.slice(-6)}-${p.id.slice(-6)}`);

//   window.dispatchEvent(
//     new CustomEvent("empirica-peers", { detail: otherPlayerIds })
//   );
// }, [players, player, game, round]);

//   if (player.stage.get("submit")) {
//     if (players.length === 1) {
//       return <Loading />;
//     }

//     return (
//       <div className="text-center text-gray-400 pointer-events-none">
//         Please wait for other player(s).
//       </div>
//     );
//   }

//   switch (round.get("task")) {
//     case "videochat":
//       return <VideoChat
//         playerId={player.id}
//         gameId={game.id}
//         roundId={round.id}
//       />; // 👈 render video chat stage
//     case "jellybeans":
//       return <JellyBeans />;
//     case "minesweeper":
//       return <MineSweeper />;
//     default:
//       return <div>Unknown task</div>;
//   }
// }

import {
  useGame,
  usePlayer,
  usePlayers,
  useRound,
} from "@empirica/core/player/classic/react";

import { Loading } from "@empirica/core/player/react";
import React, { useEffect } from "react";
import { JellyBeans } from "./examples/JellyBeans";
import { MineSweeper } from "./examples/MineSweeper";
import VideoChat from "./VideoChat"; // 👈 import the video chat stage

export function Stage() {
  const player = usePlayer();
  const players = usePlayers();
  const round = useRound();
  const game = useGame();

  // ✅ Don't proceed until all hooks are ready
  if (!player || !players || !game || !round) {
    return <div>Loading...</div>;
  }

  // ✅ Logging to confirm IDs are defined
  console.log("✅ Ready:", {
    playerId: player.id,
    gameId: game.id,
    roundId: round.id,
  });

  // ✅ Broadcast peer list to VideoChat via event
  useEffect(() => {
    if (!player || !players || !game || !round) return;

    const shortId = (id) => id?.slice(-6);

    const otherPlayerIds = players
      .filter((p) => p.id !== player.id)
      .map((p) => `${shortId(game.id)}-${shortId(round.id)}-${shortId(p.id)}`);

    console.log("📡 Broadcasting peers:", otherPlayerIds);

    window.dispatchEvent(
      new CustomEvent("empirica-peers", { detail: otherPlayerIds })
    );
  }, [players, player, game, round]);

  // ✅ Handle waiting UI if a player already submitted
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

  // ✅ Show correct task UI based on round
  switch (round.get("task")) {
    case "videochat":
      return (
        <VideoChat
          playerId={player.id}
          gameId={game.id}
          roundId={round.id}
          onReady={() => setIsReady(true)}
        />
      );
    case "jellybeans":
      return <JellyBeans />;
    case "minesweeper":
      return <MineSweeper />;
    default:
      return <div>Unknown task</div>;
  }
}
