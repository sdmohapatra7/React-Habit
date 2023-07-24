import React from 'react';
import style from './wicklyView.module.css';

export default function WicklyView({ habits, setHabits }) {
  /* ------------ Function to toggle habit status ------------ */
  const toggleStatus = (e, habitIndex, dateIndex) => {
    e.preventDefault();
    const updatedHabits = [...habits];
    const habit = updatedHabits[habitIndex];
    // Check if the habit and dates are defined
    if (habit && habit.dates) {
      const date = habit.dates[dateIndex];
      // Update the status based on the current value
      if (date.status === "0") {
        date.status = "y";
      } else if (date.status === "y") {
        date.status = "n";
      } else if (date.status === "n") {
        date.status = "0";
      }

      updatedHabits[habitIndex] = habit;
      // Update the habits state with the updated array
      setHabits(updatedHabits);
      // Update the habitData in local storage
      localStorage.setItem("habitData", JSON.stringify(updatedHabits));
    }
  };
  return (
    <div className={style.container}>
    {habits.length === 0 ? (
      <div className={style.no_hbt}>
        <p>Oops! No habits yet. Start building a productive routine.</p>
      </div>
    ) : (
      <div className={style.habitList}>
        <h2>Weekly View</h2>
        {habits.map((habit, index) => (
          <div key={index} className={style.habitItem}>
            <h3>{habit.title}</h3>
            <div className={style.habitDates}>
              {habit.dates.map((date, id) => (
                <div key={id}>
                  <p>{date.date}</p>
                  <p style={{ textAlign: "center", marginTop: "-15px" }}>
                    {date.day}
                  </p>
                  {date.status === "0" ? (
                    <img
                      alt="unmarked"
                      onClick={(e) => toggleStatus(e, index, id)}
                      src="https://cdn-icons-png.flaticon.com/128/136/136889.png"
                    />
                  ) : date.status === "n" ? (
                    <img
                      alt="cross"
                      onClick={(e) => toggleStatus(e, index, id)}
                      src="https://cdn-icons-png.flaticon.com/128/5974/5974771.png"
                    />
                  ) : (
                    <img
                      alt="tick"
                      onClick={(e) => toggleStatus(e, index, id)}
                      src="https://cdn-icons-png.flaticon.com/128/4315/4315445.png"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  )
}
