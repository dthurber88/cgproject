import { GuessBoxProps } from "./guess-box.model";
import { StyledGuessBox } from "./guess-box.style";
import { useState } from "react";

const GuessBox = (props: GuessBoxProps) => {
    const [value, setValue] = useState("");

    return (
        <StyledGuessBox>
            <div className="guess-box">
                <input
                    type="text"
                    className="guess-input"
                    onChange={(e) => setValue(e.target.value)}
                    value={value.toUpperCase()}
                    maxLength={1}
                />
            </div>
        </StyledGuessBox>
    );
};

export default GuessBox;
