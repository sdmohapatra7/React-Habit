import { useState, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import Daily from "./components/DailyVew/DailyView";
import Weekly from "./components/WicklyView/WicklyView";
function App() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("habitData");
    const parsedData = JSON.parse(data);
    const habitData = Array.isArray(parsedData) ? parsedData : [];
    // updating habits array from localStorage data
    setHabits(habitData);
  }, []);

  useEffect(() => {
    console.log("habit state after update", habits);
    console.log(
      "local storage after update",
      JSON.parse(localStorage.getItem("habitData"))
    );
  }, [habits]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar habits={habits} setHabits={setHabits} />,
      children: [
        { path: "/", element: <Daily habits={habits} setHabits={setHabits} /> },
        {
          path: "/weekly",
          element: <Weekly habits={habits} setHabits={setHabits} />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer autoClose={2000} position="top-left" />
    </>
  );
}

export default App;
