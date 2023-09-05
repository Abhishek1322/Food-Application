import React from "react";
import "./multiStepProgressBar.css";
import { ProgressBar, Step } from "react-step-progress-bar";

const MultiStepProgressBar = ({ page, onPageNumberClick }) => {
  var stepPercentage = 0;
  if (page === "pageone") {
    stepPercentage = 0;
  } else if (page === "pagetwo") {
    stepPercentage = 50;
  }
  else if (page === "pagethree") {
    stepPercentage = 100;
  } else {
    stepPercentage = 0;
  }

  return (
    <ProgressBar percent={stepPercentage}>
    <Step>
      {({ accomplished, index }) => (
       
        <div
          className={`indexedStep ${stepPercentage < 25 ? "inprogess"  : stepPercentage >= 25 ? "completed" : ""}`}
          //onClick={() => onPageNumberClick("pageone")}
          >
        </div>
      )}
    </Step>
    <Step>
      {({ accomplished, index }) => (
        <div
          className={`indexedStep ${stepPercentage == 50 ? "inprogess" : stepPercentage >= 75 ? " completed"  : ""}`}
          //onClick={() => onPageNumberClick("pagethree")}
        >
        </div>
      )}
    </Step>
    <Step>
      {({ accomplished, index }) => (
        <div
          className={`indexedStep ${ stepPercentage == 100 ? "inprogess"  : ""}`}
          //onClick={() => onPageNumberClick("pagefive")}
        >
        </div>
      )}
    </Step>
    </ProgressBar>
  );
};

export default MultiStepProgressBar;
