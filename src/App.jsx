import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [word, setWord] = useState("WORDLE");
    const [board, setBoard] = useState(Array(6).fill(null));
    const [currentGuess, setCurrentGuess] = useState("");

    useEffect(() => {
        function handleType(e) {
            if (e.key === "Enter") {
                setBoard((prev) => {
                    const newBoard = [...prev];
                    newBoard[newBoard.findIndex((r) => r === null)] =
                        currentGuess;
                    return newBoard;
                });
                setCurrentGuess("");
                return;
            }
            if (e.key === "Backspace") {
                setCurrentGuess((prev) => prev.slice(0, -1));
                return;
            }
            if (e.key.length > 1) {
                return;
            }
            if (currentGuess.length === 5) {
                return;
            }
            setCurrentGuess((prev) => prev + e.key);
        }
        window.addEventListener("keydown", handleType);

        return () => window.removeEventListener("keydown", handleType);
    }, [currentGuess]);

    return (
        <main className="w-full h-screen flex flex-col justify-center items-center gap-24">
            <h1 className="text-2xl font-bold">{word}</h1>
            <div className="bg-teal-900 w-[500px] h-[600px] flex flex-col justify-between gap-4 p-4">
                {board.map((row, i) => {
                    const isCurrentGuess =
                        i === board.findIndex((r) => r === null);
                    return (
                        <Line
                            row={isCurrentGuess ? currentGuess : row ?? ""}
                            key={i}
                            isCurrentGuess={isCurrentGuess}
                        />
                    );
                })}
            </div>
        </main>
    );
}

export default App;

// eslint-disable-next-line react/prop-types
function Line({ row, isCurrentGuess }) {
    let tiles = [];
    for (let i = 0; i < 5; i++) {
        const char = row[i];
        tiles.push(
            <div
                key={i}
                className="w-full h-full bg-red-300 flex justify-center items-center text-2xl text-black font-bold"
            >
                {char}
            </div>
        );
    }

    return (
        <div className="flex w-full h-full justify-center items-center gap-4">
            {tiles}
        </div>
    );
}
