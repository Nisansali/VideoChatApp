import React from "react";
import { Button } from "../components/Button.jsx";

export function FocusFlowIntro({ next }) {
  return (
    <div className="mt-3 sm:mt-5 p-10 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
        Round 1 – FocusFlow
      </h2>

      <div className="text-sm text-gray-700 space-y-4">
        <p>
          <strong>FocusFlow</strong> is a digital productivity app designed to help college students
          stay focused and manage their time better.
        </p>

        <p>
          <strong>Target Audience:</strong> University students aged 18–24 who often get distracted while studying
        </p>

        <p>
          <strong>Main Goals:</strong> Help students concentrate, reduce distractions, and build strong study habits
        </p>

        <p>
          <strong>Example Features:</strong> Task timer, goal reminders, motivational music, accountability tools
        </p>

        <p>
          <strong>
            Click here to open the PDF file containing the app and task descriptions:
          </strong>{" "}
          <em>[The link will be added later]</em>
        </p>

        <p className="font-semibold">
          Please keep this PDF open until you complete all tasks for FocusFlow.
        </p>

        <p>
          On the next screen, you’ll join your team for a <strong>20-minute video call</strong> to collaborate and complete two tasks.
        </p>

        <p>
          Before starting, <strong>select one team member to submit the final responses</strong> for both tasks.
        </p>

        <p>
          After the discussion, the designated team member will have <strong>5 minutes</strong> to enter your team’s answers on the following screen.
        </p>

        <p>
          <strong>Each response should be between 100 and 200 words.</strong> Be sure to prepare your team responses together during the call.
        </p>
      </div>

      <div className="mt-8 text-center">
        <Button handleClick={next}>
          <p>Join Video Call</p>
        </Button>
      </div>
    </div>
  );
}
