import { EmpiricaClassic } from "@empirica/core/player/classic";
import { EmpiricaContext } from "@empirica/core/player/classic/react";
import { EmpiricaMenu, EmpiricaParticipant } from "@empirica/core/player/react";
import React from "react";
import { Game } from "./Game";
import { ExitSurvey } from "./intro-exit/ExitSurvey";
import { Introduction } from "./intro-exit/Introduction";
import { MainInstructions } from "./intro-exit/MainInstructions.jsx";
import { FocusFlowIntro } from "./focus-flow/FocusFlowIntro.jsx";

export default function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const playerKey = urlParams.get("participantKey") || "";

  const { protocol, host } = window.location;
  const url = `${protocol}//${host}/query`;

  function introSteps({ game, player }) {
    return [Introduction , MainInstructions , FocusFlowIntro];
  }

   function exitSteps({ game, player }) {
    const group = player.get("treatName");
    console.log("this is group name" , group)
    if (group === "automated" || group === "augmented") {
      // automated augmented group → show full ExitSurvey
      return [ExitSurvey];
    } else {
      // Others → just show Thank You message
      return [() => (
        <div className="h-full flex items-center justify-center text-xl">
          Thank you for participating!
        </div>
      )];
    }
  }

  return (
    <EmpiricaParticipant url={url} ns={playerKey} modeFunc={EmpiricaClassic}>
      <div className="h-screen relative">
        <EmpiricaMenu position="bottom-left" />
        <div className="h-full overflow-auto">
          <EmpiricaContext introSteps={introSteps} exitSteps={exitSteps}>
            <Game />
          </EmpiricaContext>
        </div>
      </div>
    </EmpiricaParticipant>
  );
}
