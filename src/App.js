import './App.css';
import React from "react";
import * as PropTypes from "prop-types";

Spielbrett.propTypes = {
    onClick: PropTypes.func,
    squares: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
};

function App() {
    document.title = "Tic Tac Toe";

    const [xIstDran, setCurrentTurnIsX] = React.useState(true); // Damit wir wissen, ob der nächste Spieler X oder O ist
    const [history, setHistory] = React.useState([Array(9).fill(null)]); // Damit wir die Spielzüge speichern können
    const [stepNumber, setStepNumber] = React.useState(0); // Damit wir wissen, welcher Spielzug gerade angezeigt werden soll


    function clickAction(i) {
        const currentHistory = history.slice(0, stepNumber + 1);
        const currentSquares = currentHistory[currentHistory.length - 1];
        const squares = currentSquares.slice();
        if (calculateSieger(squares) || squares[i]) {
            return;
        }
        squares[i] = xIstDran ? 'X' : 'O';
        setHistory(currentHistory.concat([squares]));
        setStepNumber(currentHistory.length);
        setCurrentTurnIsX(!xIstDran);
    }

    function jumpTo(step) {
        setStepNumber(step);
        setCurrentTurnIsX((step % 2) === 0);

        setHistory(history.slice(0, step + 1));
    }

    const currentHistory = history.slice(0, stepNumber + 1);
    const currentQuadrate = currentHistory[currentHistory.length - 1];
    const sieger = calculateSieger(currentQuadrate);

    const moves = history.map((step, move) => {
        const description = move ? 'Zug Nr. ' + move : 'Neues Spiel';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)} className={"gotobutton"}>{description}</button>
            </li>
        );
    });

    let status;



    if (sieger) {
        status = 'Sieger: ' + sieger;
    } else {
        status = 'Spieler ' + (xIstDran ? 'X' : 'O') + ' ist am Zug';
    }

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
            <ul className={"simplelist"}>{moves}</ul>
        </div>
    </div>
);


}

Quadrat.propTypes = {
    onClick: PropTypes.func,
    value: PropTypes.any
};


function Spielbrett(props) {
    function renderQuadrat(i) {
        return <Quadrat
            value={props.squares[i]}
            onClick={() => props.onClick(i)}
        />;
    }

    return (
        <div>
            <div className="board-row">
                {renderQuadrat(0)}
                {renderQuadrat(1)}
                {renderQuadrat(2)}
            </div>
            <div className="board-row">
                {renderQuadrat(3)}
                {renderQuadrat(4)}
                {renderQuadrat(5)}
            </div>
            <div className="board-row">
                {renderQuadrat(6)}
                {renderQuadrat(7)}
                {renderQuadrat(8)}
            </div>
        </div>
    );
}

function calculateSieger(squares) {
    // Alle möglichen Verbindungen aufgezählt
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
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    // Check if all fields are filled = draw
    if (squares.every((square) => square !== null)) {
        return 'unentschieden';
    }

    // Ansonsten im Spiel oder Unentschieden
    return null;
}

function Quadrat(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default App;
