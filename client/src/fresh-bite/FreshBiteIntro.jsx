import React from "react";
import { Button } from "../components/Button.jsx";
import { useGame, usePlayer } from "@empirica/core/player/classic/react";

export function FreshBiteIntro() {

    const player = usePlayer();

    const game = useGame();
    const treatment = game.get("treatment")
    console.log('TREATMENT hh',treatment)

    const handleNext = () => {
    player.stage.set("submit", true); 
    window.location.reload(); 
    };

  return (
    <div className="mt-3 sm:mt-5 p-10 max-w-4xl mx-auto">
  <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
    Round 2 – FreshBite
  </h2>

  <div className="text-sm text-gray-700 space-y-4">
    <p>
      <strong>FreshBite</strong> is a healthy eating app that gives fast recipe ideas and tracks meals for young adults.
    </p>

    <p>
      <strong>Target Audience:</strong> Working professionals aged 25–35 who want to eat better on a budget
    </p>

    <p>
      <strong>Main Goals:</strong> Provide easy healthy meals, track nutrition, and encourage consistent eating habits
    </p>

    <p>
      <strong>Example Features:</strong> 5-minute recipe suggestions, AI meal planner, grocery lists
    </p>

    <p>
      <strong>
        Click here to open the PDF file containing the app and task descriptions:
      </strong>{" "}
      <em>[The link will be added later]</em>
    </p>

    <p className="font-semibold">
      Please keep this PDF open until you complete all tasks for FreshBite.
    </p>

    <p>
      On the next screen, you’ll again join the same team for a{" "}
      <strong>20-minute video call</strong> to collaborate and complete two tasks for FreshBite.
    </p>

    <p>
      Before starting, <strong>select one team member again to submit the final responses</strong> for both tasks.
    </p>

    <p>
      After the discussion, the designated team member will have <strong>5 minutes</strong> to enter your team’s answers on the following screen.
    </p>

    <p>
      <strong>Each response should be between 100 and 200 words.</strong> Be sure to prepare your team responses together during the call.
    </p>

    <p>
      In this round, if you are allowed to use AI to assist your task, you will be able to see the AI chatbot next to the video call screen. You and your team members can use AI during the 20-minute video call.
    </p>
  </div>

  <div className="mt-8 text-center">
    <Button handleClick={handleNext}>
      <p>Join Video Call</p>
    </Button>
  </div>
</div>

  
  );
}
