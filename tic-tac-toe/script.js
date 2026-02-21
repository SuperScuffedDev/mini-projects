function createGame() {
    const _gameboard = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];

    const getGameboardState = () => _gameboard;

    const checkWinState = () => {
        let win_state_found = false;
        const _gameboard_col = [];
        const _gameboard_dia = [];

        _gameboard_dia.push(_gameboard.map((row, i) => row[i]));
        _gameboard_dia.push(_gameboard.map((row, i) => row[row.length - 1 - i]));

        for (let i=0; i<_gameboard[0].length; i++) {
            _gameboard_col.push(_gameboard.map(row => row[i]));
        };

        return {_gameboard_col, _gameboard_dia};
    };

    const addMarker = (player, x, y) => {
        console.log("addMarker")
        if (_gameboard[y][x] === 0) {
            _gameboard[y][x] = player;
        } else {
            console.log("That's not an empty square")
        };
    };

    return {getGameboardState, checkWinState, addMarker}
};

const ttt_game = createGame();