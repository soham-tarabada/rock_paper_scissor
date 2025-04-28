import React, { useState } from "react";
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";

const choices = [
  { name: "rock", icon: <FaHandRock size={40} color="#000000" /> },
  { name: "paper", icon: <FaHandPaper size={40} color="#000000" /> },
  { name: "scissors", icon: <FaHandScissors size={40} color="#000000" /> }
];

const convertCase = (choice) => {
  if (choice === "paper") return "Paper";
  if (choice === "scissors") return "Scissors";
  return "Rock";
};

export default function RockPaperScissors() {
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [result, setResult] = useState("");
  const [selected, setSelected] = useState({});
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);

  const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex].name;
  };

  const resetGame = () => {
    setUserScore(0);
    setComputerScore(0);
    setResult("");
    setSelected({});
    setUserChoice(null);
    setComputerChoice(null);
  };

  const handleWin = (user, computer) => {
    setUserScore((prev) => prev + 1);
    setResult(`${convertCase(user)} (you) beats ${convertCase(computer)} (comp). You win!`);
    setSelected({ type: "win", choice: user });
  };

  const handleLose = (user, computer) => {
    setComputerScore((prev) => prev + 1);
    setResult(`${convertCase(computer)} (comp) beats ${convertCase(user)} (you). You lose!`);
    setSelected({ type: "lose", choice: user });
  };

  const handleDraw = (user) => {
    setResult(`It was a draw! You both chose ${convertCase(user)}`);
    setSelected({ type: "draw", choice: user });
  };

  const play = (user) => {
    const computer = getComputerChoice();
    setUserChoice(user);
    setComputerChoice(computer);

    const combination = user + computer;

    switch (combination) {
      case "paperrock":
      case "rockscissors":
      case "scissorspaper":
        handleWin(user, computer);
        break;
      case "rockpaper":
      case "scissorsrock":
      case "paperscissors":
        handleLose(user, computer);
        break;
      default:
        handleDraw(user);
        break;
    }
  };

  const getButtonClass = (name) => {
    if (selected.choice !== name) return "";
    if (selected.type === "win") return "border-green-400 bg-green-900 shadow-lg shadow-green-700";
    if (selected.type === "lose") return "border-red-400 bg-red-900 shadow-lg shadow-red-700";
    return "border-gray-600 bg-gray-800 shadow-lg shadow-gray-700";
  };

  const renderChoiceIcon = (name) => {
    const choice = choices.find((c) => c.name === name);
    return choice ? choice.icon : null;
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans p-4">
      <header className="bg-white font-bold text-gray-800 py-4 text-center text-3xl">
        Rock Paper Scissors
      </header>

      <div className="flex justify-center items-center my-10 gap-10 relative">
        <div className="flex flex-col items-center">
          <div className="text-xs uppercase mb-2">You</div>
          <div className="w-16 h-16 flex items-center justify-center border rounded-full bg-gray-800">
            {renderChoiceIcon(userChoice)}
          </div>
        </div>

        <div className="border-4 border-white text-center text-4xl rounded-lg py-4 px-10 relative">
          <span>{userScore}</span> : <span>{computerScore}</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-xs uppercase mb-2">Comp</div>
          <div className="w-16 h-16 flex items-center justify-center border rounded-full bg-gray-800">
            {renderChoiceIcon(computerChoice)}
          </div>
        </div>
      </div>

      <div className="text-center text-2xl font-light leading-loose">
        <p>{result || "Make your move."}</p>
      </div>

      <div className="text-center py-10">
        {choices.map(({ name, icon }) => (
          <button
            key={name}
            onClick={() => play(name)}
            className={`inline-block border-4 rounded-full p-3 mx-3 transition-all duration-300 ${getButtonClass(
              name
            )}`}
          >
            <div className="invert">{icon}</div>
          </button>
        ))}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={resetGame}
          className="bg-white text-gray-800 px-6 py-2 font-semibold hover:bg-gray-300 transition"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}