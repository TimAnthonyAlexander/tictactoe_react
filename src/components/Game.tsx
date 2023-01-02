import './Game.css';
import Spielbrett from "./Spielbrett";
import * as React from "react";
import { ReactElement, useCallback } from "react";


const Game = (): ReactElement => {
    const [history, setHistory] = React.useState([Array(9).fill(null)]); // Damit wir die Spielzüge speichern können
    const currentTurnIsX = (history.length % 2) !== 0;

    const calculateWinner = useCallback(
        (squares: Array<string | null>): string | null => {
            const lines = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ];
            for (let i = 0; i < lines.length; i++) {
                const [a, b, c] = lines[i];
                // Nur wenn drei aus einer Verbindung gleich sind, dann Sieg
                if (squares[a] !== null && squares[a] === squares[b] && squares[a] === squares[c]) {
                    return squares[a];
                }
            }

            // Check if all fields are filled = draw
            if (squares.every(square => square !== null)) {
                return 'unentschieden';
            }

            // Ansonsten im Spiel oder Unentschieden
            return null;
        },
        []
    );

    const clickAction = useCallback(
        (squareIndex: number): void => {

            const currentHistory = history.slice(0, history.length + 1);
            const currentSquares = currentHistory[currentHistory.length - 1];
            if (calculateWinner(currentSquares) !== null || currentSquares[squareIndex] !== null) {
                return;
            }
            const squares = currentSquares.slice();
            squares[squareIndex] = currentTurnIsX ? 'X' : 'O';
            setHistory(currentHistory.concat([squares]));
        }, [history, setHistory, calculateWinner, currentTurnIsX]);

    const jumpTo = useCallback(
        (step: number) => setHistory(history.slice(0, step + 1)),
        [history, setHistory]
    );

    const currentQuadrate = history[history.length - 1];
    const sieger = calculateWinner(currentQuadrate);

    const status = sieger !== null
        ? 'Sieger: ' + sieger
        : 'Spieler ' + (currentTurnIsX ? 'X' : 'O') + ' ist am Zug';

    return (
        <div className="game">
            <h1 className={"centeredText"}>TicTacToe</h1>
            <div className="game-board">
                <Spielbrett
                    squares={currentQuadrate}
                    onClick={(i) => clickAction(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ul className={"simplelist"}>
                    {history.map((step, move) => (
                        <li key={move}>
                            <button onClick={() => jumpTo(move)} className={"gotobutton"}>{move ? 'Zug Nr. ' + move : 'Neues Spiel'}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}


export default Game;
