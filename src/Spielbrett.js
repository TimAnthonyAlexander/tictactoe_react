import Quadrat from "./Quadrat";
import React from "react";
import * as PropTypes from "prop-types";

function Spielbrett(props) {
    function renderQuadrat(squareIndex) {
        return <Quadrat
            value={props.squares[squareIndex]}
            onClick={() => props.onClick(squareIndex)}
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


Spielbrett.propTypes = {
    onClick: PropTypes.func,
    squares: PropTypes.arrayOf(PropTypes.any)
};

export default Spielbrett;
