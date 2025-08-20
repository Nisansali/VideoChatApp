
import { ClassicListenersCollector } from "@empirica/core/admin/classic";
export const Empirica = new ClassicListenersCollector();



Empirica.onGameStart(({ game }) => {

  const groups = ["control", "aiHumanFirst", "aiFirst"];
  const shuffledGroups = groups.sort(() => Math.random() - 0.5);

  game.players.forEach((player, index) => {
    const group = shuffledGroups[index % groups.length];
    player.set("controlGroup", group);
    console.log(`Assigned player ${player.id} to group: ${group}`);
  });

  const round0 = game.addRound({

    name: "Round 1 - Video Chat",
    task: "videochat",
    });
  round0.addStage({ name: "Video Chat", duration: 20 });

  game.players.forEach((player) => {
    player.set("ready", true);
  });

  const round = game.addRound({
    name: "Round 1 - Survey End ",
    task: "surveyend",
  });
  round.addStage({ name: "Answer", duration: 100 });

  const round2 = game.addRound({
    name: "Round 1 - Mid Survey ",
    task: "midsurvey",
  });
  round2.addStage({ name: "Answer", duration: 700 });

  const round3 = game.addRound({
    name: "Round 2- Intro",
    task: "freshbiteintro",
  });
  round3.addStage({ name: "FreshBite", duration: 100 });

  const round4 = game.addRound({
    name: "Round 2 - VideoChat",
    task: "videochatfb",
  });
  round4.addStage({ name: "Answer", duration: 30 });

  const round5 = game.addRound({
    name: "Round 2 - TaskResponse",
    task: "taskresponsesurvey2",
  });
  round5.addStage({ name: "Answer", duration: 100 });
});



Empirica.onRoundStart(({ round }) => {});

Empirica.onStageStart(({ stage }) => {});

Empirica.onStageEnded(({ stage }) => {});

Empirica.onRoundEnded(({ round }) => {});

Empirica.onGameEnded(({ game }) => {});





