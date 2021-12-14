const startBtn = document.querySelector('button');
const timer = document.querySelector('.timer');
const gameTable = document.querySelector('.game-tambel');
let compareArr = [];
let pairAmount = 4;
let foundedPair = 0;
let interval;
let gameTimeout = 20;

startBtn.onclick = () => {
    clearTable();
    createTable(pairAmount);
}

function clearTable() {
    gameTable.innerHTML = '';
    gameTable.classList.remove('end_game');
    foundedPair = 0;
    clearTimeout(timer);
}

function createTable(pairAmount) {
    let suffleKeys = shuffle(createPairKey(pairAmount));
    appendCells(pairAmount, suffleKeys);

    timer.innerHTML = gameTimeout;

    interval = setInterval(() => {
        gameTimeout--;

        if (gameTimeout < 10) gameTimeout = '0' + gameTimeout.toString();
        timer.innerHTML = gameTimeout;

        if (gameTimeout == 0) {
            endGame(false);
            clearInterval(interval);
        }
    }, 1000);
}

function appendCells(pairAmount, keys) {
    for (let i = 0; i < pairAmount * 2; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.key = keys[i];
        cell.id = i;
        cell.onclick = (e) => addToCompare(e);
        gameTable.appendChild(cell);
    }
}

function createPairKey(pairAmount) {
    let pairArray = [];

    for (let i = 0; i < pairAmount; i++) {
        pairArray.push(i);
        pairArray.push(i);
    }

    return pairArray;
}

function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

function addToCompare(e) {
    let cell = e.target;
    let cellAttr = {
        id: cell.id,
        key: cell.dataset.key,
        elem: cell
    }

    cell.classList.add('show');
    compareArr.push(cellAttr);
    if (compareArr.length == 2) {
        gameTable.classList.add('disabled');
        copmairCells()
    };
}

function copmairCells() {
    let cellId1 = compareArr[0].id;
    let cellId2 = compareArr[1].id;
    let cellKey1 = compareArr[0].key;
    let cellKey2 = compareArr[1].key;

    if (cellId1 !== cellId2 && cellKey1 === cellKey2) {
        foundedPair++

        if (foundedPair == pairAmount) endGame(true);

        setTimeout(() => {
            compareArr[0].elem.classList.add('fonded');
            compareArr[1].elem.classList.add('fonded');
            gameTable.classList.remove('disabled');
            setTimeout(() => cleareCompArr(), 200);
        }, 500);

    } else if (cellId1 === cellId2) {
        cleareCompArr();
    } else {
        setTimeout(() => cleareCompArr(), 500);
    }

    function cleareCompArr() {
        gameTable.classList.remove('disabled');
        compareArr[0].elem.classList.remove('show');
        compareArr[1].elem.classList.remove('show');
        compareArr = [];
    }
}

function endGame(win) {
    if (win) {
        console.log('you win');
    } else {
        console.log('you lose');
    }

    gameTable.classList.add('end_game');
    foundedPair = 0;
}