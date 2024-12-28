import "./App.css";
import GuessBox from "./components/guess-box";
import useGetQuote from "./hooks/useGetQuote";
import { useEffect, useState } from "react";

function App() {
    const [guessBoxValue, setGuessBoxValue] = useState("");
    const [complete] = useState(false);
    // const [guessArray, setGuessArray] = useState<string[]>([]);
    const [gameQuote, setGameQuote] = useState<
        { letter: string; randomChar: string }[]
    >([]);
    const { data, isLoading, error } = useGetQuote(
        "https://api.api-ninjas.com/v1/quotes"
    );

    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        if (data?.quote) {
            const characters = "¢ȸʭʢʡϠϡϮϯϪϖϗϑΨѯѪש₪₹ꬸʥѨӜ₼₾ꞎאָ";
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
        }
    }, [data]);

    function revealLetter(letter?: string, index?: number) {
        if (letter === guessBoxValue) {
            console.log(index, letter);
            console.log(gameQuote);
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
                        <div className="quote-container" key={`quote`}>
                            {gameQuote.map((item, index) => (
                                <>
                                    <div className="letter-container">
                                        <div
                                            className="guess"
                                            onChange={() =>
                                                revealLetter(item.letter, index)
                                            }
                                        >
                                            <GuessBox
                                                revealed={!revealed}
                                                setRevealed={setRevealed}
                                                value={guessBoxValue[index]}
                                                setValue={setGuessBoxValue}
                                            />
                                        </div>
                                        <div className="zod-signs">
                                            {item.randomChar}
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                        <footer>
                            <cite>{complete ? `- ${data?.author}` : ""}</cite>
                        </footer>
                    </div>
                )}
            </div>
        </>
    );
}

export default App;
