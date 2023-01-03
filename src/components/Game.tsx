import './Game.css';
import * as React from "react";
import { ReactElement, useCallback } from "react";
import calculateWinner from "../helpers/calculateWinner";
import Board from "./Board";
import GameStore from "./GameStore";
import { observer } from "mobx-react";

let gamestore = new GameStore();

const Game = (): ReactElement => {
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
        }, []);

    const jumpTo = useCallback(
        (step: number) => gamestore.setHistory(gamestore.history.slice(0, step + 1)),
        []
    );

    const MyView = observer(( { gamestore } : {gamestore: GameStore}) => {
        const currentTurnIsX = gamestore.history.length % 2 !== 0;
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
                        gamestore={gamestore}
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
            <MyView gamestore={gamestore}/>
        </div>
    );
}


export default Game;
