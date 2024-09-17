import { useEffect, useState } from "react";
import "./Calendar.scss";
import Days from "../days/Days";

function Calendar() {
  const today = new Date(); // Exempel: Tue Sep 17 2024 09:16:37 GMT+0200 (centraleuropeisk sommartid)

  const [month, setMonth] = useState("Något är fel"); // nuvarande månad i sträng
  const [fullYear, setFullYear] = useState(); // 2024
  const [datesAndEvents, setDatesAndEvents] = useState(); // alla event i databasen

  useEffect(() => {
    const monthNumber = today.getMonth(); // september = 8

    const months = [
      "Januari",
      "Februari",
      "Mars",
      "April",
      "Maj",
      "Juni",
      "Juli",
      "Augusti",
      "September",
      "Oktober",
      "November",
      "December",
    ];
    setMonth(months[monthNumber]);
    setFullYear(today.getFullYear());
  }, [today]);

  useEffect(() => {
    async function getDates() {
      const url = "http://localhost:3000/api/allDates";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        setDatesAndEvents(json);
        console.log(json);
      } catch (error) {
        console.error(error.message);
      }
    }
    getDates();
  }, []);

  return (
    <div className="calendar">
      <header className="month">
        <p className="month__text">
          {month} {fullYear}
        </p>
      </header>
      <div className="weekDays">
        <p>Måndag</p>
        <p>Tisdag</p>
        <p>Onsdag</p>
        <p>Torsdag</p>
        <p>Fredag</p>
        <p>Lördag</p>
        <p>Söndag</p>
      </div>
      <Days today={today} datesAndEvents={datesAndEvents} />
    </div>
  );
}

export default Calendar;
