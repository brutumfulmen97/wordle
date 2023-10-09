import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [word, setWord] = useState("WORDLE");
    const [board, setBoard] = useState(Array(6).fill(null));
    const [currentGuess, setCurrentGuess] = useState("");
    const [keyboard] = useState([
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
        ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"],
    ]);

    function handleType(key) {
        if (key === "enter") {
            if (currentGuess.length !== 5) return;
            setBoard((prev) => {
                const newBoard = [...prev];
                newBoard[newBoard.findIndex((r) => r === null)] = currentGuess;
                return newBoard;
            });
            setCurrentGuess("");
            return;
        }
        if (key === "backspace") {
            setCurrentGuess((prev) => prev.slice(0, -1));
            return;
        }
        if (key.length > 1) {
            return;
        }
        if (currentGuess.length === 5) {
            return;
        }
        setCurrentGuess((prev) => prev + key);
    }

    useEffect(() => {
        function handleType(e) {
            if (e.key === "Enter") {
                if (currentGuess.length !== 5) return;
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
            <div className="bg-transparent w-[500px] h-[600px] flex flex-col justify-between gap-4 p-4">
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
            <div>
                {keyboard.map((row, i) => {
                    return (
                        <div
                            key={i}
                            className="flex justify-center items-center gap-2"
                        >
                            {row.map((key, keyI) => (
                                <div
                                    key={keyI}
                                    className="p-4 bg-slate-200 mt-2 text-black text-center rounded-md cursor-pointer hover:bg-slate-400"
                                    onClick={() => handleType(key)}
                                >
                                    {key}
                                </div>
                            ))}
                        </div>
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
                className="w-full h-full bg-white flex justify-center items-center text-2xl text-black font-bold "
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
