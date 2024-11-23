import React, { useEffect, useContext } from "react";
import MainFrame from "./MainFrame";
import { MainContext } from "../contexts/MainContext";

const Home = () => {
  const {
    state,
    setState,
    moves,
    setNumOfDisks,
    numOfDisks,
    generateArr,
  } = useContext(MainContext);

  const handleChange = (e) => {
    setNumOfDisks(e.target.value);
  };

  useEffect(() => {
    setState({
      ...state,
      start: {
        title: "start",
        disks: generateArr(),
      },
      transition: {
        title: "transition",
        disks: [],
      },
      end: {
        title: "end",
        disks: [],
      },
    });
  }, [numOfDisks]);

  useEffect(() => {
    if (
      moves === Math.pow(2, numOfDisks) - 1 &&
      state["end"].disks.length === numOfDisks
    )
      alert(
        "Congrats, you have solved the Tower of Hanoi using the minimum number of steps. Increase the number of disks to make the puzzle more difficult"
      );
  }, [moves]);

  return (
    <div className="bg-cover bg-center min-h-screen flex flex-col items-center px-4 py-6" style={{ backgroundImage: "url('/background.jpg')" }}>
      {/* Header Section */}
      <header className="text-center mb-8">
        <div className="flex justify-center items-center space-x-4">
          <img
            src="https://social.nisb.in/Condensed---Black-Circle.c3214b41.png"
            alt="Event Logo"
            className="w-16 h-16"
          />
          <h1 className="text-white text-5xl font-extrabold tracking-wide uppercase">
            Ctrl + Alt + Fun
          </h1>
        </div>
        <h2 className="text-gray-200 text-3xl font-semibold mt-4 capitalize tracking-wide">
          Tower of Hanoi
        </h2>
      </header>

      {/* Main Content Section */}
      <div className="row-start-6 row-end-10 mt-8 w-full max-w-4xl">
        <MainFrame />
      </div>

      {/* Controls Section */}
      <div className="flex justify-between items-center space-x-12 mt-8 w-full max-w-4xl">
        <div>
          <label
            htmlFor="pieces"
            className="text-2xl tracking-wide text-white"
          >
            Pieces :
          </label>
          <input
            onChange={handleChange}
            id="pieces"
            className="px-4 py-2 rounded-md bg-gray-800 bg-opacity-50 text-gray-300 border border-gray-600 focus:ring-2 focus:ring-gray-400 outline-none"
            type="number"
            min="3"
            max="6"
            value={numOfDisks}
          />
        </div>
        <span className="text-2xl tracking-wide text-white text-center">
          Moves : {moves}
        </span>
        <span className="text-2xl tracking-wide text-white text-center">
          Expected : {Math.pow(2, numOfDisks) - 1}{" "}
          <span className="text-sm">(moves)</span>
        </span>
      </div>
    </div>
  );
};

export default Home;
