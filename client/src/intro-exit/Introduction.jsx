import React from "react";

import { Button } from "../components/Button";

export function Introduction({ next , player }) {
  console.log("Survey URL:", process.env.REACT_APP_QUALTRICS_SURVEY_URL);


  return (
    <div className="mt-3 sm:mt-5 p-10">
      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
        Participant Questionnaire (Demographic Information)      
      </h3>
    
      {/* Survey iframe */}
      <iframe
        title="Qualtrics Survey"
        src={import.meta.env.VITE_QUALTRICS_SURVEY_URL}
        width="100%"
        height="700"
        frameBorder="0"
        style={{ border: "none" }}
        allowFullScreen
      ></iframe>

      {/* Red warning box */}
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
        <p><strong>Note:</strong> Please complete the survey before continuing to the video call.</p>
      </div>

      {/* Continue button */}
      <div className="mt-6 text-right">
        <Button handleClick={next}>
          <p>Continue</p>
    

        </Button>
      </div>
    </div>
  );
}
