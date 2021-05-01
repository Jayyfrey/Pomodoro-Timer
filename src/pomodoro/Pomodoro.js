import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import {secondsToDuration,minutesToDuration} from "../utils/duration";
import BreakDuration from "./BreakDuration"
import FocusDuration from "./FocusDuration"
import PlayPauseStop from "./PlayPauseStop"
import ProgressBar from "./ProgressBar"

function Pomodoro() {
  const [appStatus, setAppStatus] = useState("setup")
  const [focusTime, setFocusTime] = useState(25)
  const [breakTime, setBreakTime] = useState(5)
  const [progressBarValue, setProgressBarValue] = useState(0)
  const [progressBarWidth, setProgressBarWidth] = useState("0%")
  const [focusCountdown, setFocusCountdown] = useState(minutesToDuration(focusTime))
  const [breakCountdown, setBreakCountdown] = useState(minutesToDuration(breakTime))
  
  function processCountdown() {
    if (appStatus === "countingFocus") {
      setFocusCountdown((currentValue) => {
        
        const minutesAndSeconds = currentValue.split(":");
        const countDownValueSecs = parseFloat(minutesAndSeconds[0])*60 + parseFloat(minutesAndSeconds[1]);
        const newCountDownValue = secondsToDuration((countDownValueSecs - 1));
        const progressBarIncrement = 100 / (focusTime*60);
        setProgressBarValue((currentProgressBarValue) => parseFloat(currentProgressBarValue) + progressBarIncrement);
        setProgressBarWidth((currentProgressBarWidth) => parseFloat(currentProgressBarWidth) + progressBarIncrement + "%");
      if (countDownValueSecs === 1) {
        setAppStatus("countingBreak");
          setProgressBarValue(0);
          setProgressBarWidth("0%");
          new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
      }
      return newCountDownValue
      })
    } else {
      setBreakCountdown((currentValue) => {
       
        const minutesAndSeconds = currentValue.split(":");
        const countDownValueSecs = parseFloat(minutesAndSeconds[0])*60 + parseFloat(minutesAndSeconds[1]);
        const newCountDownValue = secondsToDuration((countDownValueSecs - 1));
        const progressBarIncrement = 100 / (breakTime*60);
        setProgressBarValue((currentProgressBarValue) => parseFloat(currentProgressBarValue) + progressBarIncrement);
        setProgressBarWidth((currentProgressBarWidth) => parseFloat(currentProgressBarWidth) + progressBarIncrement + "%");
       
        if (countDownValueSecs === 1) {
          new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
          setFocusCountdown(minutesToDuration(focusTime));
          setBreakCountdown(minutesToDuration(breakTime));
          setProgressBarWidth("0%");
          setProgressBarValue(0);
          setAppStatus("countingFocus");
        }
        return newCountDownValue
      })
    }
  }

  useInterval(
    () => {
      processCountdown()   
    },
    appStatus.includes("counting") ? 1000 : null
  );





  function playPause() {
    switch (appStatus) {
      case "setup":
        setAppStatus("countingFocus");
        break;
      case "countingFocus":
        setAppStatus("pauseFocus");
        break;
      case "countingBreak":
        setAppStatus("pauseBreak");
        break;
      case "pauseFocus":
        setAppStatus("countingFocus")
        break;
      case "pauseBreak":
        setAppStatus("countingBreak")
        break;
        default:
    }
  }

  function stop() {
    setAppStatus("setup");
    setFocusTime(25);
    setBreakTime(5);
    setFocusCountdown(minutesToDuration(focusTime));
    setBreakCountdown(minutesToDuration(breakTime));
    setProgressBarWidth("0%");
    setProgressBarValue(0);
  }

  const mouseClickHandler = (event) => {
    const buttonTestID = event.target.attributes["data-testid"].value;
    if (appStatus === "setup") {
      switch (buttonTestID) {
        case "decrease-focus":
          setFocusTime((currentFocusTime) => Math.max(5,currentFocusTime - 5));
          setFocusCountdown(minutesToDuration(Math.max(5,parseFloat(focusCountdown) - 5)));
          break
        case "increase-focus":      
          setFocusTime(Math.min(60,focusTime + 5));
          setFocusCountdown(minutesToDuration(Math.min(60,parseFloat(focusCountdown) + 5)));
          break          
        case "decrease-break":
            setBreakTime(Math.max(1,breakTime - 1));
            setBreakCountdown(minutesToDuration(Math.max(1,parseFloat(breakTime) - 1)));
            break          
        case "increase-break":
            setBreakTime(Math.min(15,breakTime + 1));
            setBreakCountdown(minutesToDuration(Math.min(15,parseFloat(breakTime) + 1)));
            break 
            default:         
      }
    }
  }


  return (
    <div className="pomodoro">
      <div className="row">
        <FocusDuration 
          mouseClickHandler={mouseClickHandler} 
          focusTime={focusTime} 
          minutesToDuration={minutesToDuration}
        />
        <BreakDuration
          mouseClickHandler={mouseClickHandler} 
          breakTime={breakTime} 
          minutesToDuration={minutesToDuration}
        />
      </div>
        <PlayPauseStop
          playPause={playPause} 
          appStatus={appStatus}
          classNames={classNames}
          stop={stop}
      /> 
      <ProgressBar 
        minutesToDuration={minutesToDuration}
        focusTime={focusTime}
        focusCountdown={focusCountdown}
        breakTime={breakTime}
        breakCountdown={breakCountdown}
        progressBarValue={progressBarValue} 
        progressBarWidth={progressBarWidth}
        appStatus={appStatus}
      />
    </div>
  );
}

export default Pomodoro;
