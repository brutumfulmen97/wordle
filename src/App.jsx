/* eslint-disable react/prop-types */
import { useEffect, useRef, useState, useCallback } from "react";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";

const words = [
    "hello",
    "world",
    "react",
    "array",
    "class",
    "debug",
    "float",
    "index",
    "regex",
    "scope",
    "stack",
    "tuple",
    "yield",
];

const randomWord = words[Math.floor(Math.random() * words.length)];

function App() {
    const [word] = useState(randomWord);
    const [board, setBoard] = useState(Array(6).fill(null));
    const [currentGuess, setCurrentGuess] = useState("");
    const [keyboard, setKeyboard] = useState([
        [
            {
                key: "q",
                clicked: false,
                isIn: false,
                isNotIn: false,
                isCorrect: false,
            },
            {
                key: "w",
                clicked: false,
                isIn: false,
                isNotIn: false,
                isCorrect: false,
            },
            {
                key: "e",
                clicked: false,
                isIn: false,
                isNotIn: false,
                isCorrect: false,
            },
            {
                key: "r",
                clicked: false,
                isIn: false,
                isNotIn: false,
                isCorrect: false,
            },
            {
                key: "t",
                clicked: false,
                isIn: false,
                isNotIn: false,
                isCorrect: false,
            },
            {
                key: "y",
                clicked: false,
                isIn: false,
                isNotIn: false,
                isCorrect: false,
            },
            {
                key: "u",
                clicked: false,
                isIn: false,
                isNotIn: false,
                isCorrect: false,
            },
            {
                key: "i",
                clicked: false,
                isIn: false,
                isNotIn: false,
                isCorrect: false,
            },
            {
                key: "o",
                clicked: false,
                isIn: false,
                isNotIn: false,
                isCorrect: false,
            },
            {
                key: "p",
                clicked: false,
                isIn: false,
                isNotIn: false,
                isCorrect: false,
            },
        ],
        [
            {
                key: "a",
                clicked: false,
                isIn: false,
                isNotIn: false,
                isCorrect: false,
            },
            {
                key: "s",
                clicked: false,
                isIn: false,
                isNotIn: false,
                isCorrect: false,
            },
            {
                key: "d",
                clicked: false,
                isIn: false,
                isNotIn: false,
                isCorrect: false,
            },
            {
                key: "f",
                clicked: false,
                isIn: false,
                isNotIn: false,
                isCorrect: false,
            },
            {
                key: "g",
                clicked: false,
                isIn: false,
                isNotIn: false,
                isCorrect: false,
            },
            {
                key: "h",
                clicked: false,
                isIn: false,
                isNotIn: false,
                isCorrect: false,
            },
            {
                key: "j",
                clicked: false,
                isIn: false,
                isNotIn: false,
                isCorrect: false,
            },
            {
                key: "k",
                clicked: false,
                isIn: false,
                isNotIn: false,
                isCorrect: false,
            },
            {
                key: "l",
                clicked: false,
                isIn: false,
                isNotIn: false,
                isCorrect: false,
            },
        ],
        [
            { key: "Enter", clicked: false },
            {
                key: "z",
                clicked: false,
                isIn: false,
                isNotIn: false,
                isCorrect: false,
            },
            {
                key: "x",
                clicked: false,
                isIn: false,
                isNotIn: false,
                isCorrect: false,
            },
            {
                key: "c",
                clicked: false,
                isIn: false,
                isNotIn: false,
                isCorrect: false,
            },
            {
                key: "v",
                clicked: false,
                isIn: false,
                isNotIn: false,
                isCorrect: false,
            },
            {
                key: "b",
                clicked: false,
                isIn: false,
                isNotIn: false,
                isCorrect: false,
            },
            {
                key: "n",
                clicked: false,
                isIn: false,
                isNotIn: false,
                isCorrect: false,
            },
            {
                key: "m",
                clicked: false,
                isIn: false,
                isNotIn: false,
                isCorrect: false,
            },
            { key: "Backspace", clicked: false },
        ],
    ]);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [won, setWon] = useState(false);

    const ref = useRef(null);

    const handleType = useCallback(
        async (key) => {
            if (!(typeof key === "string")) {
                key = key.key;
            }
            if (key === "Enter") {
                if (currentGuess.length !== 5) return;
                if (board.at(-2) !== null) {
                    setIsGameOver(true);
                }
                const res = await fetch(
                    `https://api.dictionaryapi.dev/api/v2/entries/en/${currentGuess}`
                );
                const data = await res.json();
                if (data.title === "No Definitions Found") {
                    toast.error("Invalid Word", {
                        style: {
                            zoom: 1.5,
                        },
                    });
                    ref.current.classList.add("animate-bounce-once");
                    return;
                }
                setBoard((prev) => {
                    const newBoard = [...prev];
                    newBoard[newBoard.findIndex((r) => r === null)] =
                        currentGuess;
                    return newBoard;
                });
                if (word === currentGuess.toLowerCase()) {
                    setIsGameOver(true);
                    setWon(true);
                }
                setIsSubmitted(true);
                setKeyboard((prev) => {
                    const newKeyboard = [...prev];
                    newKeyboard.forEach((row) => {
                        row.map((k) => {
                            if (k.key === "Enter") return k;
                            if (k.key === "Backspace") return k;
                            if (currentGuess.includes(k.key)) {
                                if (
                                    word.indexOf(k.key) ===
                                    currentGuess.indexOf(k.key)
                                ) {
                                    k.isCorrect = true;
                                }
                                if (word.includes(k.key)) {
                                    k.isIn = true;
                                } else {
                                    k.isNotIn = true;
                                }
                                return k;
                            }
                        });
                    });
                    return newKeyboard;
                });
                setCurrentGuess("");

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
            if (key.match(/[^a-z]/i)) return;
            setCurrentGuess((prev) => prev + key);
        },
        [currentGuess, board, word]
    );

    useEffect(() => {
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
    }, [currentGuess, board, isGameOver, word, handleType]);

    function getKeyColor(key) {
        if (key.clicked === true) {
            return "rgb(148 163 184)";
        }
        if (isSubmitted) {
            if (key.isIn === true && !key.isCorrect) {
                return "orange";
            }
            if (key.isCorrect === true) {
                return "lightgreen";
            }
            if (key.isNotIn === true) {
                return "darkgrey";
            }
        }
    }

    return (
        <main className="w-full h-screen flex flex-col justify-center items-center gap-24">
            <Toaster />
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
                            forwardRef={ref}
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
                                        style={{
                                            backgroundColor: getKeyColor(key),
                                        }}
                                    >
                                        {key.key}
                                    </div>
                                ))}
                            </div>
                        );
                    })
                ) : won ? (
                    <h1 className="text-4xl font-bold text-slate-200">
                        YOU WON
                    </h1>
                ) : (
                    <h1 className="text-4xl font-bold text-slate-200">
                        YOU LOST
                    </h1>
                )}
            </div>
        </main>
    );
}

export default App;

function getTileColor(word, row) {
    let colors = [Array(5).fill("lightgray")];

    // if (word[i] === char.toLowerCase()) colors[i] = "lightgreen";
    // if (!word.includes(char.toLowerCase())) colors[i] = "lightgray";
    // if (word.includes(char.toLowerCase()) && char !== word[i])
    //     colors[i] = "orange";
    const guess = row.toLowerCase();
    const unmatchedWordChars = new Set();

    // First, mark green for correct letters in the correct position
    for (let i = 0; i < word.length; i++) {
        if (word[i] === guess[i]) {
            colors[i] = "lightgreen";
        } else {
            unmatchedWordChars.add(word[i]);
        }
    }

    // Then, mark yellow for correct letters in the wrong position
    for (let i = 0; i < guess.length; i++) {
        if (
            (word[i] !== guess[i] && unmatchedWordChars.has(guess[i])) ||
            word.match(new RegExp(guess[i], "g"))?.length > 1
        ) {
            colors[i] = "orange";
            unmatchedWordChars.delete(guess[i]);
        }
    }

    // Fill in the rest with gray (incorrect letters)

    return colors;
}

function Line({ row, word, isCurrentGuess, isSubmitted, forwardRef }) {
    let tiles = [];
    for (let i = 0; i < 5; i++) {
        const char = row[i];
        if (!isCurrentGuess && row.length === 5 && isSubmitted) {
            let colors = getTileColor(word, row);
            // if (char.toLowerCase() === word[i]) {
            //     color = "lightgreen";
            // } else if (word.includes(char.toLowerCase()) && char !== word[i]) {
            //     color = "orange";
            // } else {
            //     color = "lightgray";
            // }
            tiles.push(
                <div
                    key={i}
                    className="w-full h-full bg-slate-100 flex justify-center items-center text-2xl text-black font-bold rounded-md transition-colors duration-500 animate-spin-slow "
                    style={{ backgroundColor: colors[i] }}
                >
                    {char.toUpperCase()}
                </div>
            );
        } else {
            tiles.push(
                <div
                    key={i}
                    className="w-full h-full bg-slate-100 flex justify-center items-center text-2xl text-black font-bold rounded-md transition-colors duration-500"
                >
                    {char?.toUpperCase()}
                </div>
            );
        }
    }

    if (isCurrentGuess) {
        return (
            <div
                ref={forwardRef}
                className="flex w-full h-full justify-center items-center gap-4"
            >
                {tiles}
            </div>
        );
    } else {
        return (
            <div className="flex w-full h-full justify-center items-center gap-4">
                {tiles}
            </div>
        );
    }
}
