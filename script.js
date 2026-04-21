let fields = [
    null,
    "circle",
    "cross",
    "circle",
    null,
    null,
    null,
    null,
    null,
]

function init() {
    render();
}

function generateSymbol(value) {
    if (value === 'circle') {
        return `
        <svg width="60" height="60">
            <circle cx="30" cy="30" r="25" stroke="#14b1e0" stroke-width="8" fill="none" />
        </svg>`;
    }

    if (value === 'cross') {
        return `
        <svg width="60" height="60">
            <line x1="10" y1="10" x2="50" y2="50" stroke="#ffc800" stroke-width="8" />
            <line x1="50" y1="10" x2="10" y2="50" stroke="#ffc800" stroke-width="8" />
        </svg>`;
    }

    return '';
}

function render() {
    let contentDiv = document.getElementById('content');
    let html = '<table>';

    for (let i = 0; i < 3; i++) {
        html += '<tr>';

        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let value = fields[index];

            html += `<td>${generateSymbol(value)}</td>`;
        }

        html += '</tr>';
    }

    html += '</table>';
    contentDiv.innerHTML = html;
}