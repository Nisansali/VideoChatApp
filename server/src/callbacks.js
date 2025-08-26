import { ClassicListenersCollector } from "@empirica/core/admin/classic";
export const Empirica = new ClassicListenersCollector();

Empirica.onGameStart(({ game }) => {
  // Safely read treatment factors with defaults
  //const playersPerGroup = Number(game.treatment.playerCount || 3);
  const { playerCount } = game.get("treatment");
  const { duration } = game.get("treatment");
  const { aiUse } = game.get("treatment")
  const {treatmentName} = game.get("treatment");

  // const aiUse = (game.treatment.aiUse || "no").toLowerCase() === "yes";

  console.log("Players per group:", playerCount);
  console.log("Round duration:", duration);   
  console.log("AI usage:", aiUse);
  console.log("Treatment Name:" , treatmentName)



  game.players.forEach(player => {
    player.set("treatName", treatmentName);
  });

  // const shuffledPlayers = [...game.players].sort(() => Math.random() - 0.5);

  //  shuffledPlayers.forEach((player, index) => {
  //   player.set("gameTreatment", treatmentName);

  // });



  const round0 = game.addRound({
   name: "Round 1 - Video Chat",
    task: "videochat",
  });
   round0.addStage({ name: "Video Chat", duration });

const round = game.addRound({
    name: "Round 1 - Survey End ",
    task: "surveyend",
  });
  round.addStage({ name: "Answer", duration: 10000 });

  const round2 = game.addRound({
    name: "Round 1 - Mid Survey ",
    task: "midsurvey",
  });
  round2.addStage({ name: "Answer",duration});

  const round3 = game.addRound({
    name: "Round 2- Intro",
    task: "freshbiteintro",
  });
  round3.addStage({ name: "FreshBite", duration });

  const round4 = game.addRound({
    name: "Round 2 - VideoChat",
    task: "videochatfb",
  });
  round4.addStage({ name: "Answer", duration });

  const round5 = game.addRound({
    name: "Round 2 - TaskResponse",
    task: "taskresponsesurvey2",
  });
  round5.addStage({ name: "Answer",duration });

});
