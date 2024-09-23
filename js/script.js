let table;
let currentPlayer = 'rosso';

// Creazione della tabella di gioco
function makeTable() {
    table = [[], [], [], [], [], [], []];

    for (let col of table) {
        for (let i = 0; i < 8; i++) {
            col.push('.'); 
        }
    }
}

// Funzione per inserire il disco nella colonna
function insert(pos) {
    let row = findEmptyRow(pos);
    if (row === -1) {
        alert("Colonna piena!");
        return;
    }

    table[pos][row] = currentPlayer;

    // Aggiorna il DOM per visualizzare il colore del giocatore
    const cell = document.querySelector(`#game-table tr:nth-child(${8 - row}) td:nth-child(${pos + 1}) i`);
    cell.classList.remove('bi-circle-fill');
    cell.classList.add('bi-circle-fill', currentPlayer === 'rosso' ? 'text-danger' : 'text-warning');

    // Controlla la vittoria 
    if (checkWin(pos, row)) {
        alert(`Il giocatore ${currentPlayer} ha vinto!`);
        return;
    }


    currentPlayer = currentPlayer === 'rosso' ? 'giallo' : 'rosso';
    document.getElementById('status').textContent = `È il turno del giocatore ${currentPlayer}`;
}


function findEmptyRow(pos) {
    for (let row = 0; row < 8; row++) {
        if (table[pos][row] === '.') {
            return row;
        }
    }
    return -1; // Colonna piena
}

// Controllo della vittoria 
function checkWin(pos, row) {
    
    // Controllo verticale
    let count = 0;
    for (let r = 0; r < 6; r++) {
        if (table[pos][r] === currentPlayer) count++;
        else count = 0;
        if (count === 4) return true;
    }

    // Controllo orizzontale
    count = 0;
    for (let c = 0; c < 7; c++) {
        if (table[c][row] === currentPlayer) count++;
        else count = 0;
        if (count === 4) return true;
    }

    return checkDiagonal(pos, row);
}

// Funzione controllo diagonale
function checkDiagonal(pos, row) {
    let count = 0;
    let startCol = pos, startRow = row;

    // Diagonale sinistra-destra
    while (startCol > 0 && startRow > 0) {
        startCol--;
        startRow--;
    }

    while (startCol < 7 && startRow < 6) {
        if (table[startCol][startRow] === currentPlayer) count++;
        else count = 0;
        if (count === 4) return true;
        startCol++;
        startRow++;
    }

    // Diagonale destra-sinistra
    count = 0;
    startCol = pos;
    startRow = row;
    while (startCol < 6 && startRow > 0) {
        startCol++;
        startRow--;
    }

    while (startCol >= 0 && startRow < 6) {
        if (table[startCol][startRow] === currentPlayer) count++;
        else count = 0;
        if (count === 4) return true;
        startCol--;
        startRow++;
    }

    return false;
}

makeTable();
