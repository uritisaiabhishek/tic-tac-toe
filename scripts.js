document.addEventListener("DOMContentLoaded", function() {
    let container = document.querySelector(".container");
    let winning_combinations = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 5, 9],
        [3, 5, 7],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9]
    ];

    if (container) {
        let boxes = document.querySelectorAll(".box");
        let temp = 1;

        boxes.forEach((box) => {
            box.addEventListener("click", function() {
                if (temp <= 9) {
                    let isUsed = this.classList.contains("disable");
                    if (!isUsed) {
                        this.classList.add("disable");
                        if (isEven(temp)) {
                            box.innerHTML = 'X';
                            box.dataset.player = 2;
                            if (checkWin(2)) {
                                disableAllBoxes();
                                return;
                            }
                        } else {
                            box.innerHTML = 'O';
                            box.dataset.player = 1;
                            if (checkWin(1)) {
                                disableAllBoxes();
                                return;
                            }
                        }
                        temp++;
                    }
                }
                if (temp > 9) {
                    console.log("It's a Draw");
                    disableAllBoxes();
                }
            });
        });
    }

    function isEven(number) {
        return number % 2 === 0;
    }

    function checkWin(player) {
        let playerBoxes = Array.from(document.querySelectorAll(`[data-player='${player}']`));
        let playerPositions = playerBoxes.map(box => parseInt(box.dataset.count));

        for (let combination of winning_combinations) {
            if (combination.every(position => playerPositions.includes(position))) {
                console.log(`Player ${player} wins!`);
                return true; // Return true if there's a win
            }
        }

        return false; // Return false if there's no win
    }

    function disableAllBoxes() {
        let boxes = document.querySelectorAll(".box");
        boxes.forEach((box) => {
            box.classList.add("disable");
        });
    }
});
