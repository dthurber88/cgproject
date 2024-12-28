// /C:/Users/Daniel/Documents/GitHub/cgproject/src/components/guess-box.model.tsx

export interface GuessBoxProps {
    active?: boolean;
    setActive?: (active: boolean) => void;
    value?: string;
    setValue?: (value: string) => void;
    revealed?: boolean;
    setRevealed?: (revealed: boolean) => void;
    style?: React.CSSProperties;
}
