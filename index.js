const applyBtn = document.querySelector('.apply');
const inputs = document.querySelectorAll('input');

const gameTable = document.querySelector('.game-tambel');
let compareArr = [];
let pairAmount = 0;
let foundedPair = 0;
let timer;
let gameTimeout;

applyBtn.onclick = () => {
    pairAmount = inputs[0].value;
    gameTimeout = inputs[1].value;

    if (pairAmount < 2 && gameTimeout < 5) {
        alert('min valu of pairs is 2 and timer is 5');
        return;
    }

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

    timer = setTimeout(() => {
        endGame(false);
    }, gameTimeout * 1000);
}

function appendCells(pairAmount, keys) {
    for (let i = 0; i < pairAmount * 2; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.key = keys[i];
        cell.id = i;

        cell.innerHTML = keys[i]

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
    if (compareArr.length == 2) copmairCells();
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
            setTimeout(() => cleareCompArr(), 200);
        }, 700);

    } else if (cellId1 === cellId2) {
        cleareCompArr();
    } else {
        setTimeout(() => cleareCompArr(), 700);
    }

    function cleareCompArr() {
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
    clearTimeout(timer);
}