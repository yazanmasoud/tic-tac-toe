/* Clean, modular tic-tac-toe script
   - Event delegation for clicks
   - Player tracking
   - Win detection and highlight
   - Reset button
*/

const fields = Array(9).fill(null);
let currentPlayer = 'cross'; // 'cross' = X, 'circle' = O
let gameOver = false;

const WIN_COMBINATIONS = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

function init(){
    const resetBtn = document.getElementById('resetBtn');
    if(resetBtn) resetBtn.addEventListener('click', resetGame);
    setupDelegation();
    render();
    updateStatus();
}

function setupDelegation(){
    const content = document.getElementById('content');
    if(!content) return;
    content.addEventListener('click', (e) => {
        const td = e.target.closest('td');
        if(!td || !content.contains(td)) return;
        const index = Number(td.dataset.index);
        handleCellClick(index);
    });
}

function handleCellClick(index){
    if(gameOver) return;
    if(fields[index]) return;
    fields[index] = currentPlayer;
    render();
    const winner = checkWin();
    if(winner){
        gameOver = true;
        highlightWin(winner.combo);
        const status = document.getElementById('status');
        if(status) status.textContent = `Gewinner: ${winner.player === 'cross' ? 'X' : 'O'}`;
        return;
    }
    currentPlayer = currentPlayer === 'cross' ? 'circle' : 'cross';
    updateStatus();
}

function updateStatus(){
    const symbolEl = document.getElementById('playerSymbol');
    if(!symbolEl) return;
    symbolEl.textContent = currentPlayer === 'cross' ? 'X' : 'O';
    symbolEl.style.color = currentPlayer === 'cross' ? '#ffc800' : '#14b1e0';
}

function generateSymbol(value){
    if(value === 'circle'){
        return `
        <svg width="60" height="60" viewBox="0 0 60 60" role="img" aria-label="O">
            <circle cx="30" cy="30" r="25" stroke="#14b1e0" stroke-width="8" fill="none" />
        </svg>`;
    }
    if(value === 'cross'){
        return `
        <svg width="60" height="60" viewBox="0 0 60 60" role="img" aria-label="X">
            <line x1="10" y1="10" x2="50" y2="50" stroke="#ffc800" stroke-width="8" />
            <line x1="50" y1="10" x2="10" y2="50" stroke="#ffc800" stroke-width="8" />
        </svg>`;
    }
    return '';
}

function render(){
    const contentDiv = document.getElementById('content');
    if(!contentDiv) return;
    let html = '<table><tbody>';
    for(let i=0;i<3;i++){
        html += '<tr>';
        for(let j=0;j<3;j++){
            const index = i*3 + j;
            const value = fields[index];
            html += `<td data-index="${index}">${generateSymbol(value)}</td>`;
        }
        html += '</tr>';
    }
    html += '</tbody></table>';
    contentDiv.innerHTML = html;
}

function checkWin(){
    for(const combo of WIN_COMBINATIONS){
        const [a,b,c] = combo;
        if(fields[a] && fields[a] === fields[b] && fields[a] === fields[c]){
            return { player: fields[a], combo };
        }
    }
    return null;
}

function highlightWin(combo){
    combo.forEach(i => {
        const td = document.querySelector(`td[data-index="${i}"]`);
        if(td) td.classList.add('win');
    });
}

function resetGame(){
    for(let i=0;i<fields.length;i++) fields[i] = null;
    currentPlayer = 'cross';
    gameOver = false;
    render();
    updateStatus();
}

document.addEventListener('DOMContentLoaded', init);