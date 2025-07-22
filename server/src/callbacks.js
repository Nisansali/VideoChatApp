
import { ClassicListenersCollector } from "@empirica/core/admin/classic";
export const Empirica = new ClassicListenersCollector();

Empirica.onGameStart(({ game }) => {

  const round0 = game.addRound({

    name: "Round 0 - Video Chat",
    task: "videochat",
    });
  round0.addStage({ name: "Video Chat", duration: 10 });

  game.players.forEach((player) => {
    player.set("ready", true);
  });

  const round = game.addRound({
    name: "Round 1 - Survey End ",
    task: "surveyend",
  });
  round.addStage({ name: "Answer", duration: 10 });

  const round2 = game.addRound({
    name: "Round 2 - Chat Modal",
    task: "modal",
  });
  round2.addStage({ name: "Play", duration: 10 });
});

Empirica.onRoundStart(({ round }) => {});

Empirica.onStageStart(({ stage }) => {});

Empirica.onStageEnded(({ stage }) => {});

Empirica.onRoundEnded(({ round }) => {});

Empirica.onGameEnded(({ game }) => {});





