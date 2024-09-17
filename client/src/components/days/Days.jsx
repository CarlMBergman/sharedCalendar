import Day from "../day/Day";
import "./Days.scss";
import InfoBox from "../infoBox/InfoBox";
import { useState } from "react";

function Days(props) {
  const [showInfoBox, setShowInfoBox] = useState(false);
  const [dayInInfoBox, setDayInInfoBox] = useState();
  const firstDayOfMonth = new Date(
    props.today.getFullYear(),
    props.today.getMonth(),
    1
  ); // första dagen i månaden, Exempel: Sun Sep 01 2024 00:00:00 GMT+0200 (centraleuropeisk sommartid)

  const weekdayOfFirstDay = firstDayOfMonth.getDay(); // returnerar 0-6 där 0 är söndag

  let currentMonth = [];

  for (let day = 0; day < 35; day++) {
    if (day === 0 && weekdayOfFirstDay === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 6);
    } else if (day === 0) {
      firstDayOfMonth.setDate(
        firstDayOfMonth.getDate() + (day - weekdayOfFirstDay)
      );
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }
    const newDate = new Date(firstDayOfMonth);
    const toStringDate = newDate.toDateString();
    let calendarDay = {
      currentMonth: firstDayOfMonth.getMonth() === props.today.getMonth(),
      date: toStringDate,
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      selected: firstDayOfMonth.toDateString() === props.today.toDateString(),
      year: firstDayOfMonth.getFullYear(),
      dayOnCalendar: day,
    };
    currentMonth.push(calendarDay);
  }

  function toggleInfoBox(day1) {
    console.log("day: " + day1.notes);
    setDayInInfoBox(day1);
    setShowInfoBox((current) => !current);
  }

  const days = currentMonth.map((day, i) => {
    // Check if props.datesAndEvents exists and find the matching date
    if (props.datesAndEvents) {
      const matchingEvent = props.datesAndEvents
        ? props.datesAndEvents.find((date) => date.date === day.date)
        : null;

      if (matchingEvent) {
        console.log(matchingEvent);

        return (
          <Day
            toggleInfoBox={(day1) => toggleInfoBox(day1)}
            notes={matchingEvent}
            day={day}
            key={i}
          />
        );
      }

      return (
        <Day toggleInfoBox={(day1) => toggleInfoBox(day1)} day={day} key={i} />
      );
    } else {
      return (
        <Day toggleInfoBox={(day) => toggleInfoBox(day)} day={day} key={i} />
      );
    }
  });

  return (
    <div className="monthDays">
      {showInfoBox && <InfoBox day={dayInInfoBox} />}
      {days}
    </div>
  );
}

export default Days;
