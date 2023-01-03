import './Game.css';
import * as React from "react";
import { ReactElement, useCallback } from "react";
import calculateWinner from "../helpers/calculateWinner";
import Board from "./Board";
import GameStore from "./GameStore";
import { observer } from "mobx-react";


const Game = (): ReactElement => {
    //const [history, setHistory] = React.useState<Array<Array<string | null>>>([Array(9).fill(null)]); // Damit wir die Spielzüge speichern können
    // Instead of using React.useState, use mobx for history
    let gamestore = new GameStore();

    const clickAction = useCallback(
        (squareIndex: number, currentTurnIsX: boolean): void => {
            const currentSquares = gamestore.history[gamestore.history.length - 1];
            if (calculateWinner(currentSquares) !== null || currentSquares[squareIndex] !== null) {
                return;
            }
            const currentHistory = gamestore.history.slice();
            const squares = currentSquares.slice();
            squares[squareIndex] = currentTurnIsX ? 'X' : 'O';
            gamestore.setHistory(currentHistory.concat([squares]));
        }, [gamestore, gamestore.setHistory]);

    const jumpTo = useCallback(
        (step: number) => gamestore.setHistory(gamestore.history.slice(0, step + 1)),
        [gamestore, gamestore.setHistory]
    );

    const MyView = observer(( { gamestate } : {gamestate: GameStore}) => {
        const currentTurnIsX = gamestate.history.length % 2 !== 0;
        const currentQuadrate = gamestore.history[gamestore.history.length - 1];
        const sieger = calculateWinner(currentQuadrate);

        const status = sieger !== null
            ? 'Sieger: ' + sieger
            : 'Spieler ' + (currentTurnIsX ? 'X' : 'O') + ' ist am Zug';
        return (
            <div className="game">
                <h1 className={"centeredText"}>TicTacToe</h1>
                <div className="game-board">
                    <Board
                        onClick={(i) => clickAction(i, currentTurnIsX)}
                        gamestate={gamestore}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ul className={"simplelist"}>
                        {gamestore.history.map((step, move) => (
                            <li key={move}>
                                <button onClick={() => jumpTo(move)} className={"gotobutton"}>{move ? 'Zug Nr. ' + move : 'Neues Spiel'}</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    });

    return (
        <div>
            <MyView gamestate={gamestore}/>
        </div>
    );
}


export default Game;
