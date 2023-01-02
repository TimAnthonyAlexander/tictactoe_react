import React from "react";
import './Quadrat.css';
import * as PropTypes from "prop-types";

function Quadrat(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
Quadrat.propTypes = {
    onClick: PropTypes.func,
    value: PropTypes.any
};

export default Quadrat;
