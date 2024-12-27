import "./App.css";
// import GuessBox from "./components/guess-box";
import useGetQuote from "./hooks/useGetQuote";
import { useEffect, useState } from "react";

function App() {
    // const [guessBoxActive, setGuessBoxActive] = useState(false);
    // const [guessBoxPosition, setGuessBoxPosition] = useState({ x: 0, y: 0 });
    const [gameQuote, setGameQuote] = useState<
        { letter: string; randomChar: string }[]
    >([]);
    const { data, isLoading, error } = useGetQuote(
        "https://api.api-ninjas.com/v1/quotes"
    );

    useEffect(() => {
        if (data?.quote) {
            const characters = "¢ȸʭʢʡϠϡϮϯϪϖϗϑΨѯѪש₪₹ꬸʥѨӜ₼₾ꞎאָ";
            let quoteArray = data.quote.split("");
            let letterToRandomChar: { [key: string]: string } = {};
            let usedChars = new Set<string>();

            let newQuoteArray = quoteArray.map((letter) => {
                if (
                    letter !== " " &&
                    letter !== "." &&
                    letter !== "'" &&
                    letter !== "," &&
                    letter !== ":" &&
                    letter !== ";" &&
                    letter !== "-" &&
                    letter !== "?" &&
                    letter !== "!"
                ) {
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
                        letter: "_",
                        randomChar: letterToRandomChar[letter.toLowerCase()],
                    };
                } else {
                    return {
                        letter: letter,
                        randomChar: "",
                    };
                }
            });

            setGameQuote(newQuoteArray);
        }
    }, [data]);

    function revealLetter(letter?: string) {
        const userInput = prompt("Enter a letter to reveal the quote");
        if (!userInput) return;

        if (userInput?.toLowerCase() !== letter?.toLowerCase()) {
            alert("Incorrect letter");
        } else {
            let newQuoteArray = [...gameQuote];
            for (let i = 0; i < gameQuote.length; i++) {
                if (
                    userInput?.toLowerCase() ===
                        data?.quote?.[i].toLowerCase() &&
                    newQuoteArray[i].letter === "_"
                ) {
                    newQuoteArray[i].letter = data?.quote?.[i];
                }
            }
            setGameQuote(newQuoteArray);
        }
    }

    return (
        <>
            <div>
                {/* <h1>ɀФᴆⱡѦ₡</h1> */}
                <h1>ⱿФDIѦC</h1>
            </div>
            <div className="card">
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    <div className="blockquote">
                        <p className="quote-container">
                            {gameQuote.map((item, index) => (
                                <>
                                    <div
                                        className="letter-container"
                                        key={index}
                                    >
                                        {item.letter !== " " &&
                                            item.letter !== "." && (
                                                <div
                                                    className="guess"
                                                    onClick={() =>
                                                        revealLetter(
                                                            data?.quote?.[index]
                                                        )
                                                    }
                                                    // onClick={(event) => {
                                                    //     setGuessBoxActive(
                                                    //         !guessBoxActive
                                                    //     );
                                                    //     setGuessBoxPosition({
                                                    //         x: event.clientX,
                                                    //         y: event.clientY,
                                                    //     });
                                                    // }}
                                                />
                                            )}
                                        <div className="letters">
                                            {item.letter !== " " && item.letter}
                                        </div>
                                        <div className="zod-signs">
                                            {item.letter !== " " &&
                                            item.letter !== "." &&
                                            item.letter !== "'" &&
                                            item.letter !== "," &&
                                            item.letter !== ":" &&
                                            item.letter !== ";" &&
                                            item.letter !== "-" &&
                                            item.letter !== "?" &&
                                            item.letter !== "!"
                                                ? item.randomChar
                                                : ""}
                                        </div>
                                    </div>
                                </>
                            ))}
                        </p>
                        {/* {guessBoxActive && (
                            <GuessBox
                                active={guessBoxActive}
                                setActive={setGuessBoxActive}
                                style={{
                                    left: guessBoxPosition.x,
                                    top: guessBoxPosition.y,
                                }}
                            />
                        )} */}
                        <footer>
                            <cite>- {data?.author}</cite>
                        </footer>
                    </div>
                )}
            </div>
        </>
    );
}

export default App;
