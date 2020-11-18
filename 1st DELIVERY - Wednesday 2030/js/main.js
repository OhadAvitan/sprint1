'use strict';

var gMineField;

const MINE_IMG = '<img src="images/mine4.png" alt="o">'
const FLAG_IMG = '<img src="images/flag2.png" alt="1">'

var gDifficult;
const gLevel = [
    { SIZE: 4, MINES: 2 },
    { SIZE: 8, MINES: 12 },
    { SIZE: 12, MINES: 30 }
]

var colors = ['rgb(255, 235, 123)', 'rgb(255, 212, 71)', 'rgb(255, 169, 71)', 'rgb(255, 99, 71)', 'rgb(243, 74, 44)', 'rgb(116, 33, 18)', ' rgb(66, 26, 19)', ' rgb(34, 22, 20)']

// each cell {
//  minesAroundCount: 4,
//  isShown: true,
//  isMine: false,
//  isMarked: true
// }

// function print(event) {
//     // event.cancelBubble = false;
//     console.log('Event:', event);
// }

function initGame() {
    buildMineField();
    implementMinesAroundCount(gMineField);
}


//create matrix mineFiled and render it
function buildMineField() {
    gMineField = createMineField(gLevel[0].SIZE, gLevel[0].SIZE);
    console.log(gMineField);
    renderMineField(gMineField);
    gMineField[0][2].isMine = true;
    gMineField[1][1].isMine = true;
    gMineField[2][2].minesAroundCount = 2;
    // gMineField[0][0].minesAroundCount = 1;
    // gMineField[3][3].minesAroundCount = 3;

}

function createMineField(ROWS, COLS) { //create mat with object
    var mat = []
    for (var i = 0; i < ROWS; i++) {
        var row = []
        for (var j = 0; j < COLS; j++) {
            row.push({
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            })
        }
        mat.push(row)
    }
    return mat
}


// data-i="${i}" data-j="${j}"

function renderMineField(gMineField) {
    var strHtml = '';
    for (var i = 0; i < gMineField.length; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < gMineField[0].length; j++) {
            strHtml += `<td onclick="cellClicked(this,${i},${j})" ></td>`
        }
        strHtml += '</tr>'
    }


    // implementMinesAroundCount(gMineField)

    var elMineField = document.querySelector('.mineField')
    elMineField.innerHTML = strHtml
}


// oncontextmenu="rightClick(event , this)"


function seriousRenderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            strHtml += `<td 
            onclick="cellClicked(this)"></td>`
        }
        strHtml += '</tr>'
    }


    // implementMinesAroundCount(board)

    var elMineField = document.querySelector('.mineField')
    elMineField.innerHTML = strHtml
}

// function cellClicked(currCell) {
//     console.log('GG');
//     revealCell(currCell);
// }


function cellClicked(clickedCell, i, j) {
    // console.log(clickedCell, i, j);
    console.log(gMineField[i][j].minesAroundCount);
    // console.log(clickedCell.className);
    if (gMineField[i][j].isMarked) return;
    if (gMineField[i][j].isMine) {
        // revealAllMines();
        clickedCell.innerHTML = MINE_IMG;
        var el = document.querySelector('.gameOver');
        el.style.display = 'block';
        console.log('GameOver');
        return;
    }
    if (gMineField[i][j].minesAroundCount === 0) { //empty cell
        clickedCell.style.backgroundColor = 'rgb(87, 87, 95)';
        console.log('empty');
        return;
    }
    if (gMineField[i][j].minesAroundCount > 0) {
        clickedCell.style.backgroundColor = colors[gMineField[i][j].minesAroundCount - 1];
        clickedCell.innerText = gMineField[i][j].minesAroundCount;
        console.log('empty');
        return;
    }


}


function revealNeighbors(i, j) {
    var count = 0
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        if (i < 0 || i > gMineField.length - 1) continue
        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (j < 0 || j > gMineField[0].length - 1) continue
            if (i === pos.i && j === pos.j) continue
            var currMinesAround = gMineField[i][j].minesAroundCount;

        }
    }
    return count

}



// function rightClick(event, cell) {
//     console.log(cell);
// }

// function getBoardSize() {
//     var elInputs = document.querySelectorAll('input');
//     for (var i = 0; i < elInputs.length; i++) {
//         if (elInputs[i].checked) {
//             var currLength = elInputs[i].value;
//         }
//     }
// gDifficult = currLength;
// }

function implementMinesAroundCount(mineField) {
    for (var i = 0; i < mineField.length; i++) {
        for (var j = 0; j < mineField[0].length; j++) {
            var currMinesAround = minesAroundCountFunction(mineField, { i: i, j: j }) //mines -> not array
                // console.log('i:' + i + ' j: ' + j + ' minesAround: ' + currMinesAround);
            mineField[i][j].minesAroundCount = currMinesAround;
        }

    }
}