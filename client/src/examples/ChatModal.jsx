

import React from "react";
import { Button } from "../components/Button.jsx";
import { usePlayer } from "@empirica/core/player/classic/react";

export function ChatModal( ) {
   const player = usePlayer();

 const handleNext = () => {
  player.stage.set("submit", true); 
};
  return (
    <div className="mt-3 sm:mt-5 p-20">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Instruction One
      </h3>
      <div className="mt-2 mb-6">
        <p className="text-sm text-gray-500">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam
          laudantium explicabo pariatur iste dolorem animi vitae error totam. At
          sapiente aliquam accusamus facere veritatis.
        </p>
      </div>
      <Button handleClick={handleNext} autoFocus>
        <p>Next</p>
      </Button>
    </div>
  );
}