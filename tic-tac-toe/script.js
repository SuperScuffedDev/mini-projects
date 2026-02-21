const marker_cells = document.querySelectorAll("#gameboard > div");
const new_game = document.querySelector("#new-game");
const log = document.querySelector("#log");

const scoreHandler = (() => {
    let _x_score = 0;
    let _y_score = 0;

    const addXScore = () => _x_score++;
    const addYScore = () => _y_score++;

    return (addXScore, addYScore)
})();

function createGame() {
    const gameController = (() => {
        let _move_counter = 0;
        let _this_player = 1;

        const getThisPlayer = () => _this_player;

        const getMoveCounter = () => _move_counter;

        const incrementMoveCounter = () => _move_counter++;

        const resetMoveCounter = () => {_move_counter = 0};

        const changeThisPlayer = () => {
            if (_this_player === 1) {
                _this_player = 2;
                log.textContent = "O's Turn";
            } else if (_this_player === 2) {
                _this_player = 1;
                log.textContent = "X's Turn";
            };
        };

        const setMarker = (x, y) => {
            let this_cell = undefined;
            marker_cells.forEach(cell => {
                if (cell.getAttribute("data-x") === x && cell.getAttribute("data-y") === y) {
                    this_cell = cell;
                };
            });
            if (_this_player === 1) {
                const svgNS = "http://www.w3.org/2000/svg";
                const new_marker = document.createElementNS(svgNS, "svg");
                new_marker.setAttribute("class", "marker x");
                new_marker.setAttribute("viewBox", "0 0 100 100");

                const new_shape = document.createElementNS(svgNS, "polygon");
                new_shape.setAttribute("points", "25 15 15 25 40 50 15 75 25 85 50 60 75 85 85 75 60 50 85 25 75 15 50 40");
                new_shape.setAttribute("stroke", "red");
                new_shape.setAttribute("stroke-width", "5")
                
                new_marker.appendChild(new_shape);
                this_cell.appendChild(new_marker);
            } else if (_this_player === 2) {
                const svgNS = "http://www.w3.org/2000/svg"
                const new_marker = document.createElementNS(svgNS, "svg");
                new_marker.setAttribute("class", "marker o");
                new_marker.setAttribute("viewBox", "0 0 100 100");

                const new_shape = document.createElementNS(svgNS, "circle");
                new_shape.setAttribute("cx", "50");
                new_shape.setAttribute("cy", "50");
                new_shape.setAttribute("r", "35");
                new_shape.setAttribute("fill", "black");
                new_shape.setAttribute("stroke", "#00ff22");
                new_shape.setAttribute("stroke-width", "5");

                new_marker.appendChild(new_shape);
                this_cell.appendChild(new_marker);
            };
        };

        return {getThisPlayer, getMoveCounter, incrementMoveCounter, resetMoveCounter, changeThisPlayer, setMarker};
    })();

    let _lock_input = false;

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

    const addMarker = (x, y) => {
        if (_gameboard[y][x] === 0) {
            _gameboard[y][x] = gameController.getThisPlayer();
            gameController.setMarker(x, y);

            gameController.incrementMoveCounter();
            if (gameController.getMoveCounter() === 9) {
                gameOver({type: "tie"});
                return
            };
        } else {
            return "That's not an empty square"
        };

        const win_state = checkWinState();
        
        if (typeof win_state === "object") {
            console.log("win state found");
            gameOver(win_state);
            return
        };

        gameController.changeThisPlayer();
    };

    const gameOver = (win_state) => {
        _lock_input = true;
        if (win_state.type === "tie") {
            log.textContent = "It's a Tie!";
        } else if (win_state.type === "row") {
            log.textContent = `${gameController.getThisPlayer() === 1 ? "X" : "O"} Wins`
        } else if (win_state.type === "col") {
            log.textContent = `${gameController.getThisPlayer() === 1 ? "X" : "O"} Wins`
        } else if (win_state.type === "dia") {
            log.textContent = `${gameController.getThisPlayer() === 1 ? "X" : "O"} Wins`
        };
    };

    const clickHandler = (event) => {
        if (_lock_input) {return "input locked"}
        if (event.target.getAttribute("class") !== "cell") {return}
        const x = event.target.getAttribute("data-x")
        const y = event.target.getAttribute("data-y")
        addMarker(x, y)
    };

    marker_cells.forEach(cell => {
        cell.addEventListener("click", clickHandler)
    });

    return {getGameboardState, checkWinState, addMarker, gameOver}
};

let ttt_game = createGame();

new_game.addEventListener("click", (event) => {
    marker_cells.forEach(cell => cell.innerHTML = "")
    log.textContent = "X's Turn";
    ttt_game = createGame();
});