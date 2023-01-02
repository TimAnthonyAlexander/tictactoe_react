import './App.css';
import Game from "./Game";
import * as React from "react";
import { ReactElement } from "react";


const App = (): ReactElement => {
    document.title = "Tic Tac Toe";

    return (
        <Game/>
    );
}

export default App;
