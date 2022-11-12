
let colors = ["yellow", "gray", "white", "brown", "blue", "black"]
var board = []
var choosen = 0;
let mouseX = 0
let mouseY = 0
setupCanvas(window.innerHeight,window.innerHeight-100,"myCanvas")
function randint(min, max) {
    return Math.random() * (max - min) + min;
}

function createBoard() {
    for (let x = 0; x < parseInt(window.innerWidth/25); x++) {
        for (let y = 0; y < parseInt((window.innerHeight-100)/25); y++) {
            board.push([x * 25, y * 25, false, 6]);
        }
    }
}
onmousemove = (event) => {  
    mouseX = event.clientX
    mouseY = event.clientY
}
onclick = (event) =>  {
    if (425 == parseInt(mouseX / 25) * 25 && 0 == parseInt(mouseY / 25) * 25) {
        board = []
        createBoard()
    }
    board.forEach(function (e) {
        if (e[0] == parseInt(mouseX / 25) * 25 && e[1] == parseInt(mouseY / 25) * 25) {
            if (e[3] != choosen) {
                e[2] = true;
                e[3] = choosen;
            }
            else {
                e[2] = false;
            }
        }
    });
}
document.addEventListener('keydown', function (event) {
    switch (event.keyCode) {
        case keys.one:
            choosen = 0;
            break;
        case keys.two:
            choosen = 1;
            break;
        case keys.three:
            choosen = 2;
            break;
        case keys.four:
            choosen = 3;
            break;
        case keys.five:
            choosen = 4;
            break;
    }
});
function findInBoard(x, y, state) {
    let has = false
    let id = 0
    let r = 0
    board.forEach(function (e) {
        if (e[0] == x && e[1] == y && e[2] == state) {
            has = true
            id = r
        }
        r++;
    });
    return [has, id]
}
createBoard();
function draw() {
    let gave = false;
    fill(425, 0, 25, 25,"black");
    board.forEach(function (e) {
        if (e[2]) {
            fill(e[0], e[1], 25, 25,colors[e[3]]);
        } else {
            fill(e[0], e[1], 25, 25,"black");
        }
        if (e[3] == 1) {
            let right = findInBoard(e[0] + 25, e[1], true)
            let left = findInBoard(e[0] - 25, e[1], true)
            let up = findInBoard(e[0], e[1] - 25, true)
            if (left[0] || right[0] || up[0]) {
                if (board[left[1]][3] == 4 || board[right[1]][3] == 4 || board[up[1]][3] == 4) {
                    e[3] = 3
                }
            }
        }
        let k = findInBoard(e[0], e[1] + 25, false)
        if (k[0] && e[2] && colors[e[3]] != "brown") {
            e[2] = false
            board[k[1]][2] = true;
            board[k[1]][3] = e[3];
            e[3] = 6
        }
        else if (k[0] == false && e[2] && colors[e[3]] != "brown") {
            if (colors[e[3]] != "blue") {
                let left = findInBoard(e[0] - 25, e[1] + 25, false)
                if (left[0]) {
                    e[2] = false;
                    board[left[1]][2] = true;
                    board[left[1]][3] = e[3]
                }
                else {
                    let right = findInBoard(e[0] + 25, e[1] + 25, false)
                    if (right[0]) {
                        e[2] = false;

                        board[right[1]][2] = true;
                        board[right[1]][3] = e[3]
                        e[3] = 6
                    }
                }
            }
            else {
                let left = findInBoard(e[0] - 25, e[1], false)
                let right = findInBoard(e[0] + 25, e[1], false)
                if (left[0]) {
                    board[left[1]][2] = true;
                    board[left[1]][3] = e[3]
                }
                if (right[0]) {
                    board[right[1]][2] = true;
                    board[right[1]][3] = e[3]
                }
            }
        }
    });

}
setInterval(draw,60)