import React from "react";
import { Button } from "../components/Button.jsx";

export function MainInstructions({ next }) {
  return (
    <div className="mt-3 sm:mt-5 p-10 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
        Please read instructions carefully
      </h2>

      <div className="text-sm text-gray-700 space-y-4">
        <p>
          Imagine you are part of the product development team at <strong>Innovatech</strong>,
          a leading technology company specializing in developing and managing
          mobile applications that solve everyday problems for consumers.
        </p>
        <p>
          Your role today involves brainstorming an idea with your team (which will
          be a 3-person team) to develop product development and marketing strategies
          for 2 new mobile applications (<strong>FocusFlow</strong> and <strong>FreshBite</strong>)
          that the company is interested in launching. Participants will complete 2
          structured tasks for each mobile application per round with their assigned
          team, totaling 4 tasks.
        </p>
        <p>
          In each round, your team will complete 2 tasks (feature development and marketing)
          for a new mobile application. <strong>Each member of the team must share their thoughts or
          ideas for each task during the group discussion.</strong>
        </p>
        <p>
          In the first round, <strong>no one is allowed to use generative artificial intelligence (AI)</strong>
          platforms to assist your task. However, in the second round, your team <strong>may or may not</strong>
          be provided with the private generative artificial intelligence (GenAI) chatbot to assist a task.
          We will inform you at the beginning of the second round whether your team is allowed to use AI
          or not, and if so, how to use it.
        </p>
        <p>
          A GenAI platform can respond to a wide variety of questions and offer information on many subjects.
          It keeps track of earlier parts of a conversation, allowing users to make follow-up edits or
          clarifications. Trained on a large dataset, it can help users in multiple ways, including writing
          text, translating languages, summarizing content, and more, but <strong>accuracy of information is not always guaranteed</strong>.
        </p>
        <p className="font-semibold italic">
          Please proceed to the next page to learn about the first mobile application “FocusFlow” and the task description.
        </p>
      </div>

      <div className="mt-8 text-center">
        <Button handleClick={next}>
          <p>Continue</p>
        </Button>
      </div>
    </div>
  );
}
