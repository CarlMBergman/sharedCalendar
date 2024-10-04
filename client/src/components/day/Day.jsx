import "./Day.scss";
import InfoBox from "../infoBox/InfoBox";
import { useState } from "react";

function Day(props) {
  let day1;

  if (props.notes) {
    day1 = {
      day: props.day || {},
      notes: props.notes || {},
    };
  } else {
    day1 = {
      day: props.day || {},
      notes: {
        notes: "Skriv något här...",
      },
    };
  }

  return (
    <>
      <div
        className={`day current-month-${day1.day.currentMonth}`}
        onClick={() => props.toggleInfoBox(day1)}
      >
        <p className="day__number">{props.day.number}</p>
        {day1.notes.notes !== "Skriv något här..." ? (
          <div className="red-dot"></div>
        ) : null}
      </div>
    </>
  );
}

export default Day;
