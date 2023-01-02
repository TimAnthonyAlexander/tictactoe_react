import './Quadrat.css';
import * as React from "react";
import { ReactElement } from "react";

interface Props {
    onClick: () => void;
    value: string | null;
}

const Quadrat = ({onClick, value}: Props): ReactElement => {
    return (
        <button className="square" onClick={onClick}>
            {value}
        </button>
    );
}

export default Quadrat;
