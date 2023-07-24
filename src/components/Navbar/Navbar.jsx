import React, { useState } from 'react';
import style from './navbar.module.css';
import { NavLink, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

export default function Navbar({ habits, setHabits }) {
  const [title, setTitle] = useState("");

  /* ------------ Function to add new habit ------------ */
  const handleSubmit = (e) => {
    e.preventDefault();
    let months = [
      "Jan",
      "Feb",
      "March",
      "Apr",
      "May",
      "June",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    let dates = [];
    for (let i = 6; i >= 0; i--) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - i);
      let mm = currentDate.getMonth();
      mm = months[mm];
      let dd = currentDate.getDate();
      let day = currentDate.toLocaleDateString("en-US", { weekday: "short" });
      if (dd < 10) dd = "0" + dd;

      const d = {
        date: dd + " " + mm,
        day: day,
        status: "0",
      };
      // Storing date, month and day in dates array to show on weekView.
      dates.push(d);
    }

    const newHabit = {
      title: title,
      date: Date.now(),
      dates: dates,
    };

    const updatedHabits = [...habits, newHabit];
    // Update the habits state after deleting
    setHabits(updatedHabits);
    // Update the habitData in local storage
    localStorage.setItem("habitData", JSON.stringify(updatedHabits));
    setTitle("");
    toast.info("Habit added successfully..!");
  };
  return (
    <div className={style.container}>
      <div className={style.aside}>
        <div className={style.title}>
          <h1>Habit Tracker</h1>
          <p>
            The ultimate habit tracker that empowers you to add, track, and
            conquer your habits with ease!
          </p>
        </div>
        <div className={style.addHabit}>
          <form onSubmit={handleSubmit} className={style.addForm}>
            <input
              type="text"
              placeholder="Enter Habit"
              value={title}
              required
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <button type="submit" className={style.add_btn}>
              Add Habit
            </button>
          </form>
        </div>
      </div>

      <div className={style.main}>
        <div className={style.navbar}>
          <NavLink
            to="/"
            style={({ isActive }) =>
              isActive
                ? {
                  color: "#362b40",
                  backgroundColor: "#dce1f7",
                  boxShadow: "rgba(0, 0, 0, .3) 5px 8px 8px -5px",
                }
                : {}
            }
          >
            Daily{" "}
          </NavLink>
          <NavLink
            to="/weekly"
            style={({ isActive }) =>
              isActive
                ? {
                  color: "#362b40",
                  backgroundColor: "#dce1f7",
                  boxShadow: "rgba(0, 0, 0, .3) 5px 8px 8px -5px",
                }
                : {}
            }
          >
            Weekly{" "}
          </NavLink>
        </div>

        <Outlet />
      </div>
    </div>
  )
}
