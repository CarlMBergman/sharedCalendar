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
      <div className="day" onClick={() => props.toggleInfoBox(day1)}>
        <p className="day__number">{props.day.number}</p>
      </div>
    </>
  );
}

export default Day;
