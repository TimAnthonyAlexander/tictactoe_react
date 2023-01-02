import Quadrat from "./Quadrat";
import * as React from "react";
import './Board.css';
import { ReactElement } from "react";

interface Props {
    squares: Array<string | null>;
    onClick: (i: number) => void;
}

const Board = ({squares, onClick}: Props): ReactElement => {
    return (
        <div>
            <div className="board-row">
                <Quadrat value={squares[0]} onClick={() => onClick(0)}/>
                <Quadrat value={squares[1]} onClick={() => onClick(1)}/>
                <Quadrat value={squares[2]} onClick={() => onClick(2)}/>
            </div>
            <div className="board-row">
                <Quadrat value={squares[3]} onClick={() => onClick(3)}/>
                <Quadrat value={squares[4]} onClick={() => onClick(4)}/>
                <Quadrat value={squares[5]} onClick={() => onClick(5)}/>
            </div>
            <div className="board-row">
                <Quadrat value={squares[6]} onClick={() => onClick(6)}/>
                <Quadrat value={squares[7]} onClick={() => onClick(7)}/>
                <Quadrat value={squares[8]} onClick={() => onClick(8)}/>
            </div>
        </div>
    );
}

export default Board;
