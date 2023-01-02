import React from "react";
import './Quadrat.css';
import * as PropTypes from "prop-types";

Quadrat.propTypes = {
    onClick: PropTypes.func,
    value: PropTypes.any
};

function Quadrat(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default Quadrat;
