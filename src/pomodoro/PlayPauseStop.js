import React from "react";


function PlayPauseStop({playPause,appStatus,classNames,stop}) {
    return (
        <div className="row">
            <div className="col">
                <div
                    className="btn-group btn-group-lg mb-2"
                    role="group"
                    aria-label="Timer controls"
                >
                    <button
                        type="button"
                        className="btn btn-primary"
                        data-testid="play-pause"
                        title="Start or pause timer"
                        onClick={playPause}
                    >
                    <span
                        className={classNames({
                        oi: true,
                        "oi-media-play": !appStatus.includes("counting"),
                        "oi-media-pause": appStatus.includes("counting"),
                        })}
                    />
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        title="Stop the session"
                        onClick={stop}
                    >
                        <span className="oi oi-media-stop" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PlayPauseStop;