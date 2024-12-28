import "./App.css";
import useGetQuote from "./hooks/useGetQuote";
import { useEffect, useState } from "react";

function App() {
    const [showStats, setShowStats] = useState(false);
    const [showAbout, setShowAbout] = useState(false);
    const [complete, setComplete] = useState(false);
    const [theDate, setTheDate] = useState(new Date());
    const [guessedValues] = useState<string[]>([]);
    const [guessedArray, setGuessedArray] = useState<
        { index: number; letter: string }[]
    >([]);
    const [gameQuote, setGameQuote] = useState<
        { letter: string; randomChar: string }[]
    >([]);
    const { data, isLoading, error } = useGetQuote(
        "https://api.api-ninjas.com/v1/quotes"
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setTheDate(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (data?.quote) {
            const characters = "¢ȸʭʢʡϠϡϮϯϪϖϗϑΨѯѪש₪₹ꬸʥѨӜ₼₾ꞎאָȽϞͰ┐┘";
            let quoteArray = data.quote.split("");
            let letterToRandomChar: { [key: string]: string } = {};
            let usedChars = new Set<string>();
            let unwantedChars = ["'", ",", ":", ";", "-", "?", "!", ".", " "];

            let filteredQuoteArray = quoteArray.filter(
                (letter) => !unwantedChars.includes(letter)
            );

            let newQuoteArray = filteredQuoteArray.map((letter) =>
                letter.toLowerCase()
            );

            let randomCharArray = newQuoteArray.map((letter, index) => {
                if (!letterToRandomChar[letter.toLowerCase()]) {
                    let randomChar;
                    do {
                        randomChar = characters.charAt(
                            Math.floor(Math.random() * characters.length)
                        );
                    } while (usedChars.has(randomChar));
                    usedChars.add(randomChar);
                    letterToRandomChar[letter.toLowerCase()] = randomChar;
                }
                return {
                    letter: filteredQuoteArray[index],
                    randomChar: letterToRandomChar[letter.toLowerCase()],
                };
            });

            setGameQuote(randomCharArray);
            setGuessedArray(
                new Array(newQuoteArray.length).fill({ letter: "", index: -1 })
            );
        }
    }, [data]);

    //potential use in the future
    // function revealLetter(guessedLetter?: string, letter?: string, index?: number) {
    //     if (guessedLetter?.toLowerCase() === letter?.toLowerCase()) {
    //         console.log("Correct letter", guessedLetter);
    //     }
    // }

    function updateGuessedArray(guessedLetter?: string, index?: number) {
        const newGuessedArray = [...guessedArray];
        newGuessedArray[index!] = { letter: guessedLetter!, index: index! };
        setGuessedArray(newGuessedArray);
    }

    function submitGuess() {
        for (let i = 0; i < guessedArray.length; i++) {
            if (
                guessedArray[i].letter.toLowerCase() !==
                gameQuote[i].letter.toLowerCase()
            ) {
                setComplete(false);
                return;
            } else {
                setComplete(true);
            }
        }
    }

    return (
        <>
            <div className="header">
                <div
                    className="header-text"
                    onClick={
                        showAbout ? () => null : () => setShowStats(!showStats)
                    }
                >
                    {showStats ? "HIDE STATS" : "SHOW STATS"}
                </div>
                <div
                    className="header-text"
                    onClick={
                        showStats ? () => null : () => setShowAbout(!showAbout)
                    }
                >
                    {showAbout ? "HIDE ABOUT" : "SHOW ABOUT"}
                </div>
            </div>
            {showStats && !showAbout && <div>Stats Page Planned</div>}
            {showAbout && !showStats && (
                <div>
                    It's just a cryptogram in the style of a Zodiac cipher. Once
                    you think you have the solution, click the "Check Solution"
                    button to see if you are correct!
                    <br />
                    <br />
                    There is an API Call at midnight every day that receives a
                    new random 'famous' quote. That quote is then turned into a
                    Zodiac cipher.
                    <br />
                    <br />
                    I create this project to practice TypeScript and React, as
                    well as API calls and typing.
                    <br />
                    <br />
                    If you have any questions or suggestions, or would like to
                    work on a project together, please feel free to reach out on{" "}
                    <a
                        href="https://www.linkedin.com/in/danielthurber/"
                        target="_blank"
                    >
                        LinkedIn.
                    </a>
                </div>
            )}
            {!showStats && !showAbout && (
                <>
                    <div>
                        <h1
                            style={{
                                color: "red",
                                textShadow: "2px 2px 4px rgb(0, 0, 0)",
                            }}
                        >
                            ⱿФDIѦC
                        </h1>
                        <h2
                            style={{
                                color: "red",
                                textShadow: "2px 2px 4px #000000",
                                fontSize: "1.5rem",
                            }}
                        >{`${theDate.toLocaleString()}`}</h2>
                    </div>
                    <div className="card">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>Error: {error}</p>
                        ) : (
                            <div className="blockquote">
                                <div className="quote-container" key={`quote`}>
                                    {gameQuote.map((item, index) => (
                                        <>
                                            <div className="letter-container">
                                                <div className="guess">
                                                    <div className="guess-box">
                                                        <input
                                                            style={{
                                                                textTransform:
                                                                    "uppercase",
                                                            }}
                                                            type="text"
                                                            className="guess-input"
                                                            onChange={(e) => {
                                                                updateGuessedArray(
                                                                    e.target
                                                                        .value,
                                                                    index
                                                                );
                                                                let newGuessedValues =
                                                                    [
                                                                        ...guessedValues,
                                                                    ];
                                                                newGuessedValues[
                                                                    index
                                                                ] =
                                                                    e.target.value;
                                                                return newGuessedValues;
                                                            }}
                                                            value={
                                                                guessedValues[
                                                                    index
                                                                ]
                                                            }
                                                            maxLength={1}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="zod-signs">
                                                    {item.randomChar}
                                                </div>
                                            </div>
                                        </>
                                    ))}
                                </div>

                                <footer className="blockquote-footer">
                                    <cite>
                                        {complete
                                            ? `- ${data?.author}`
                                            : "- Solve to Reveal Author"}
                                    </cite>
                                </footer>
                                <div className="submit-button">
                                    <button onClick={() => submitGuess()}>
                                        Check Solution
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="by-footer">
                        by&nbsp;
                        <a
                            href="https://www.linkedin.com/in/danielthurber/"
                            target="_blank"
                        >
                            Daniel Thurber
                        </a>
                    </div>
                </>
            )}
        </>
    );
}

export default App;
