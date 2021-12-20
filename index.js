const startGame = document.querySelector('.start_game');
const gameTable = document.querySelector('.game-table');
const timer = document.querySelector('.timer');
const images = ['dolphin', 'fox', 'horse', 'jaguar', 'rhinoceros']

class Game {
    constructor( {pairAmount, timeout} ) {
        this.pairAmount = pairAmount;
        this.timeout = timeout;
        this.isFreezed = false;
        this.foundedPair = 0;
        this.compareArr = new Array();
        this.interval;
        this.images = this.shuffleArray(images);
    }

    createTable() {
        this.clearTable();

        let keys = this.shuffleArray(this.createPairKey())
        this.gameTimer();

        for (let i = 0; i < this.pairAmount * 2; i++) {
            gameTable.appendChild(this.createCells(i, keys));
        }
    }

    createCells(index, keys) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.key = keys[index];
        cell.style.backgroundImage = `url(images/${images[keys[index]]}.png)`
        cell.id = index;
        cell.onclick = (e) => this.addToCompare(e);
        return cell;
    }

    createPairKey() {
        let pairArray = [];

        for (let i = 0; i < this.pairAmount; i++) {
            pairArray.push(i);
            pairArray.push(i);
        }

        return pairArray;
    }

    shuffleArray(array) {
        let currentIndex = array.length,
            randomIndex;

        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    addToCompare(e) {
        if (this.isFreezed) return;

        let cell = e.target;
        let cellAttr = {
            id: cell.id,
            key: cell.dataset.key,
            elem: cell
        }
    
        cell.classList.add('show');
        this.compareArr.push(cellAttr);

        if (this.compareArr.length == 2) {
            this.isFreezed = true;
            this.compareCells();
        };
    }

    compareCells() {
        let cell_1 = this.compareArr[0];
        let cell_2 = this.compareArr[1];

        if (cell_1.id !== cell_2.id && cell_1.key === cell_2.key) {
            this.foundedPair++
            if (this.foundedPair == this.pairAmount) this.endGame(true);
            setTimeout(() => this.successfulComp(), 500);
        } else if (cell_1.id === cell_2.id) {
            this.clearCompArr();
        } else {
            setTimeout(() => this.clearCompArr(), 500);
        }
    }

    successfulComp() {
        this.compareArr[0].elem.classList.add('fonded');
        this.compareArr[1].elem.classList.add('fonded');
        setTimeout(() => this.clearCompArr(), 200);
    }

    clearCompArr() {
        this.isFreezed = false;
        this.compareArr[0].elem.classList.remove('show');
        this.compareArr[1].elem.classList.remove('show');
        this.compareArr = [];
    }

    gameTimer() {
        timer.innerHTML = this.timeout;
        let time = this.timeout;

        this.interval = setInterval(() => {
            time--;

            if (time < 10) time = `0${time}`;

            timer.innerHTML = time;
            if (time == 0) this.endGame();
        }, 1000);
    }

    endGame(isWin) {
        isWin ? alert('you win') : alert('you lose');
        gameTable.classList.add('end_game');
        this.foundedPair = 0;
        clearInterval(this.interval);
    }

    clearTable() {
        gameTable.innerHTML = '';
        gameTable.classList.remove('end_game');
        this.foundedPair = 0;
        this.timeout = this.timeout
        clearInterval(this.interval);
    }
}


let game = new Game( {pairAmount: 4, timeout: 20} );
startGame.onclick = () => game.createTable();