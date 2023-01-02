const calculateWinner = (squares: Array<string | null>): string | null => {
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
    };

export default calculateWinner;
