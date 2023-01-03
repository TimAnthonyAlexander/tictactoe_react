import './Quadrat.css';
import * as React from "react";
import { ReactElement } from "react";
import { observer } from "mobx-react";

interface Props {
    onClick: () => void;
    value: string | null;
}

const Quadrat = ({onClick, value}: Props): ReactElement => {
    const QuadratView = observer(( { value } : {value: string | null}) => {
        return <button className="square" onClick={onClick}>
            {value}
        </button>;
    });

    return <QuadratView value={value}/>;
}

export default Quadrat;
