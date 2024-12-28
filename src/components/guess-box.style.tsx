import styled from "styled-components";

export const StyledGuessBox = styled.div`
    .guess-box {
        height: 25px;
        width: 25px;
        cursor: pointer;
    }

    .guess-input {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        height: 25px;
        width: 25px;
        overflow: wrap;
        border: none;
        cursor: pointer;
    }

    .guess-input:hover {
        background-color: #f0f0f0;
    }

    .guess-input:focus {
        outline: none;
        border: none;
    }
`;
