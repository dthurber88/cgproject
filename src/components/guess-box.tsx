import { useState } from "react";
import { StyledGuessBox } from "./guess-box.style";

const GuessBox = () => {
    const [value, setValue] = useState("");

    return (
        <StyledGuessBox>
            <div className="guess-box">
                <input
                    type="text"
                    className="guess-input"
                    placeholder="Guess"
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
            </div>
        </StyledGuessBox>
    );
};

export default GuessBox;
