function createGame() {
    const _gameboard = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];

    const getGameboardState = () => _gameboard;

    const checkWinState = () => {
        const dia_map = [];

        dia_map.push(_gameboard.map((row, i) => row[i]));
        dia_map.push(_gameboard.map((row, i) => row[row.length - 1 - i]));

        for (let i=0; i<_gameboard[0].length; i++) {
            const notValidRow = _gameboard[i].some(value => value === 0 || value !== _gameboard[i][0]);

            const col_map = _gameboard.map(row => row[i])
            const notValidCol = col_map.some(value => value === 0 || value !== col_map[0]);
            
            if (!notValidRow) {
                return {type: "row", index: i};
            } else if (!notValidCol) {
                return {type: "col", index: i};
            };
        };

        for (let i=0; i<2; i++) {
            const notValidDia = dia_map[i].some(value => value === 0 || value !== dia_map[i][0]);

            if (!notValidDia) {
                return {type: "dia", index: i};
            };
        };
    };

    const addMarker = (player, x, y) => {
        if (_gameboard[y][x] === 0) {
            _gameboard[y][x] = player;
        } else {
            console.log("That's not an empty square")
        };

        getGameboardState();
        const win_state = checkWinState();

        if (typeof win_state === "object") {
            console.log("win state found")
        };
    };

    return {getGameboardState, checkWinState, addMarker}
};

const ttt_game = createGame();