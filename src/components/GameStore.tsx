import { makeAutoObservable } from "mobx";

// A gamestore that saves history array
class GameStore {
    history = [Array(9).fill(null)];
    constructor() {
        makeAutoObservable(this);
    }

    setHistory(newHistory: Array<Array<string | null>>) {
        this.history = newHistory;
    }
}

export default GameStore;
