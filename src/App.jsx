/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [word] = useState("wordl");
    const [board, setBoard] = useState(Array(6).fill(null));
    const [currentGuess, setCurrentGuess] = useState("");
    const [keyboard, setKeyboard] = useState([
        [
            { key: "q", clicked: false },
            { key: "w", clicked: false },
            { key: "e", clicked: false },
            { key: "r", clicked: false },
            { key: "t", clicked: false },
            { key: "y", clicked: false },
            { key: "u", clicked: false },
            { key: "i", clicked: false },
            { key: "o", clicked: false },
            { key: "p", clicked: false },
        ],
        [
            { key: "a", clicked: false },
            { key: "s", clicked: false },
            { key: "d", clicked: false },
            { key: "f", clicked: false },
            { key: "g", clicked: false },
            { key: "h", clicked: false },
            { key: "j", clicked: false },
            { key: "k", clicked: false },
            { key: "l", clicked: false },
        ],
        [
            { key: "Enter", clicked: false },
            { key: "z", clicked: false },
            { key: "x", clicked: false },
            { key: "c", clicked: false },
            { key: "v", clicked: false },
            { key: "b", clicked: false },
            { key: "n", clicked: false },
            { key: "m", clicked: false },
            { key: "Backspace", clicked: false },
        ],
    ]);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [won, setWon] = useState(false);

    function handleType(key) {
        if (key === "Enter") {
            if (currentGuess.length !== 5) return;
            if (board.at(-2) !== null) {
                setIsGameOver(true);
            }
            setBoard((prev) => {
                const newBoard = [...prev];
                newBoard[newBoard.findIndex((r) => r === null)] = currentGuess;
                return newBoard;
            });
            if (word === currentGuess) {
                setIsGameOver(true);
                setWon(true);
            }
            setCurrentGuess("");
            setIsSubmitted(true);

            return;
        }
        if (key === "Backspace") {
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
            if (isGameOver) return;
            if (e.key === "Enter") {
                if (currentGuess.length !== 5) return;
                if (board.at(-2) !== null) setIsGameOver(true);
                setBoard((prev) => {
                    const newBoard = [...prev];
                    newBoard[newBoard.findIndex((r) => r === null)] =
                        currentGuess;
                    return newBoard;
                });
                if (word === currentGuess) {
                    setIsGameOver(true);
                    setWon(true);
                }
                setCurrentGuess("");
                setIsSubmitted(true);
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
            setKeyboard((prev) => {
                const newKeyboard = [...prev];
                newKeyboard.forEach((row) => {
                    row.map((k) => {
                        if (k.key === e.key) k.clicked = true;
                        return k;
                    });
                });
                return newKeyboard;
            });
        }

        function handleKeyUp(e) {
            setKeyboard((prev) => {
                const newKeyboard = [...prev];
                newKeyboard.forEach((row) => {
                    row.map((k) => {
                        if (k.key === e.key) k.clicked = false;
                        return k;
                    });
                });
                return newKeyboard;
            });
        }

        window.addEventListener("keydown", handleType);

        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keyup", handleKeyUp);
            window.removeEventListener("keydown", handleType);
        };
    }, [currentGuess, board, isGameOver, word]);

    console.log(`${word}, ${currentGuess}`);

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
                            word={word}
                            isCurrentGuess={isCurrentGuess}
                            isSubmitted={isSubmitted}
                        />
                    );
                })}
            </div>
            <div>
                {!isGameOver ? (
                    keyboard.map((row, i) => {
                        return (
                            <div
                                key={i}
                                className="flex justify-center items-center gap-2"
                            >
                                {row.map((key, keyI) => (
                                    <div
                                        key={keyI}
                                        className="p-4 bg-slate-200 mt-2 text-black text-center font-bold text-lg rounded-md cursor-pointer hover:bg-slate-400"
                                        onClick={() => handleType(key.key)}
                                        style={
                                            key.clicked === true
                                                ? {
                                                      backgroundColor:
                                                          "rgb(148 163 184)",
                                                  }
                                                : {}
                                        }
                                    >
                                        {key.key}
                                    </div>
                                ))}
                            </div>
                        );
                    })
                ) : won ? (
                    <h1>YOU WON</h1>
                ) : (
                    <h1>YOU LOST</h1>
                )}
            </div>
        </main>
    );
}

export default App;

function Line({ row, word, isCurrentGuess, isSubmitted }) {
    let tiles = [];
    for (let i = 0; i < 5; i++) {
        const char = row[i];
        if (!isCurrentGuess && row.length === 5 && isSubmitted) {
            let color;
            if (char === word[i]) color = "lightgreen";
            else if (word.includes(char) && char !== word[i]) color = "orange";
            else color = "lightgray";
            tiles.push(
                <div
                    key={i}
                    className="w-full h-full bg-white flex justify-center items-center text-2xl text-black font-bold "
                    style={{ backgroundColor: color }}
                >
                    {char}
                </div>
            );
        } else {
            tiles.push(
                <div
                    key={i}
                    className="w-full h-full bg-white flex justify-center items-center text-2xl text-black font-bold "
                >
                    {char}
                </div>
            );
        }
    }

    return (
        <div className="flex w-full h-full justify-center items-center gap-4">
            {tiles}
        </div>
    );
}
