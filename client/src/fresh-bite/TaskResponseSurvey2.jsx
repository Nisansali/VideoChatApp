import React from "react";
import { Button } from "../components/Button.jsx";
import { usePlayer } from "@empirica/core/player/classic/react";

export function TaskResponseSurvey2() {
  const player = usePlayer();

  const handleNext = () => {
    player.stage.set("submit", true);
  };

  return (
    <div className="pt-20 px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* LEFT: Survey iframe */}
      <div className="lg:col-span-2 flex flex-col items-center">
        <iframe
          title="FocusFlow Survey"
          src={import.meta.env.VITE_QUALTRICS_TASKRESPONSESURVEY2_URL}
          className="w-full h-[700px] rounded-lg border border-gray-300"
        ></iframe>

        <Button
          handleClick={handleNext}
          autoFocus
          className="mt-6 px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Next
        </Button>
      </div>

      {/* RIGHT: Instructions */}
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-lg mb-2">
            Task #1: Choose 2{" "}
            <span className="text-red-500">FreshBite</span> Features
          </h2>
          <ul className="list-disc ml-5 space-y-1 text-sm">
            <li>App-blocking feature (temporarily blocks distracting apps)</li>
            <li>AI meal suggestions based on what you have at home</li>
            <li>Grocery list builder</li>
            <li>Food journal</li>
            <li>Nutrition feedback</li>
            <li>Weekly meal planner</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-2">
            Task #2: Choose 2{" "}
            <span className="text-red-500">FreshBite</span> Launch Strategies
          </h2>
          <ul className="list-disc ml-5 space-y-1 text-sm">
            <li>Launching a social media (TikTok, Instagram) challenge using influencers</li>
            <li>Offering referral rewards for inviting friends</li>
            <li>Organizing an offline event to showcase the product</li>
            <li>Running a leaderboard contest with prizes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
