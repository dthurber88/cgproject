import styled from "styled-components";

export const StyledGuessBox = styled.div`
    position: absolute;

    .guess-box {
        height: 50px;
        width: 50px;
        background-color: rgb(0, 0, 0);
    }

    .guess-input {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        height: 50px;
        width: 50px;
        overflow: wrap;
    }
`;
