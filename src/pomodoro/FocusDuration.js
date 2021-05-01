import React from "react";


function FocusDuration({mouseClickHandler,focusTime,minutesToDuration}) {
    return (
        <div className="col">
            <div className="input-group input-group-lg mb-2">
                <span className="input-group-text" data-testid="duration-focus">
                    Focus Duration: {minutesToDuration(focusTime)}
                </span>
                <div className="input-group-append">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        data-testid="decrease-focus"
                        onClick = {mouseClickHandler}
                    >
                        <span style={{pointerEvents:"none"}} className="oi oi-minus" />
                    </button>              
                    <button
                        type="button"
                        className="btn btn-secondary"
                        data-testid="increase-focus"
                        onClick = {mouseClickHandler}
                    >
                        <span style={{pointerEvents:"none"}} className="oi oi-plus" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FocusDuration;