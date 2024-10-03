import { useState } from "react";
import "./InfoBox.scss";
import save from "../../assets/save.svg";

function InfoBox(props) {
  let day = props.day.day;
  let notesWithId = props.day.notes;
  console.log(notesWithId);

  const [notes, setNotes] = useState(props.day.notes.notes);
  console.log(props.day);

  let week;
  if (day.dayOnCalendar < 6) {
    week = "one";
  } else if (day.dayOnCalendar < 14) {
    week = "two";
  } else if (day.dayOnCalendar < 21) {
    week = "three";
  } else if (day.dayOnCalendar < 28) {
    week = "four";
  } else if (day.dayOnCalendar < 35) {
    week = "five";
  }
  async function saveInfo() {
    const date = day.date;
    console.log(date);
    console.log(notes);

    const newDate = { date, notes };
    if (notesWithId._id) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/updateDate/${notesWithId._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              date: notesWithId.date,
              notes: newDate.notes,
            }),
          }
        );

        const result = await response.json();

        if (response.ok) {
          console.log("funkar perfekt!");
        } else {
          console.log(result.error);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await fetch("http://localhost:3000/api/addDate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newDate),
        });

        if (!response.ok) {
          throw new Error(`Failed to add date: ${response.statusText}`);
        }

        const result = await response.json();
        // setMessage("Date added successfully!");
        //   setDate("");
        //   setEvent("");
      } catch (error) {
        //   setMessage(`Error: ${error.message}`);
        console.log(error);
      }
    }
  }

  return (
    <div className={`infoBox ${week}`}>
      <div className="infoBox__notes">
        <h3>
          {day.number}/{day.month}
        </h3>
        <textarea
          onChange={(e) => setNotes(e.target.value)}
          name="notes"
          id="notes"
          defaultValue={notes}
        ></textarea>
      </div>
      <div>
        <img
          onClick={saveInfo}
          className="save-btn"
          src={save}
          alt="Save button"
        />
      </div>
    </div>
  );
}

export default InfoBox;
