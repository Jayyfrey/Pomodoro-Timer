import React from "react";


function ProgressBar({minutesToDuration,focusTime,focusCountdown,breakTime, breakCountdown,progressBarValue,progressBarWidth,appStatus}) {
    
    const pauseMessage = (appStatus.includes("pause") ? "PAUSED" : "")
    
    const message = (appStatus.includes("countingFocus") || appStatus.includes("pauseFocus")) ? "Focusing for " : "On Break for ";
    const timeSetting = (appStatus.includes("countingFocus") || appStatus.includes("pauseFocus")) ? minutesToDuration(focusTime) : minutesToDuration(breakTime);
    const remainingTime = (appStatus.includes("countingFocus") || appStatus.includes("pauseFocus")) ? focusCountdown : breakCountdown;
    
    if (appStatus === "setup") {
        return ""
    } else {
        return (
            <div>
                <div className="row mb-2">
                    <div className="col">
                        <h2 data-testid="session-title">{message} {timeSetting} minutes</h2>
                        <p className="lead" data-testid="session-sub-title">
                        {remainingTime} remaining
                        </p>
                        <h1>{pauseMessage}</h1>
                    </div>
                </div>
            <div className="row mb-2">
                <div className="col">
                    <div className="progress" style={{ height: "20px" }}>
                        <div
                            className={"progress-bar"}
                            role="progressbar"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            aria-valuenow={progressBarValue} 
                            style={{ width: progressBarWidth }}
                        />
                        </div>
                    </div>
                </div>
            </div>

        )
    }


}

export default ProgressBar;