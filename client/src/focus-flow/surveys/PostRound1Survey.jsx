
import React from "react";
import { Button } from "../../components/Button.jsx";
import { usePlayer } from "@empirica/core/player/classic/react";

export function PostRound1Survey( ) {

    const player = usePlayer();

    const handleNext = () => {
    player.stage.set("submit", true); 
    };
    
  return (
    <div className="mt-3 sm:mt-5 p-20">
       <iframe
        title="Qualtrics Survey"
         src={import.meta.env.VITE_QUALTRICS_POSTROUND_URL}
        width="1000"
        height="700"
        frameBorder="0"
        style={{ border: "none" }}
        allowFullScreen
      ></iframe>
      
      <Button handleClick={handleNext} autoFocus>
        <p>Next</p>
      </Button>
    </div>
  );
}