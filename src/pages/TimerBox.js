import React from "react";
import "./timer-box.css";

export function TimerBox(props) {
    return(
        <div className="timer-box">
            <p>{props.title}</p>
            <p>{props.value}</p>
        </div>
    )

}