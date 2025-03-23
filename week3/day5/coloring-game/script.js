let color = null;
let mousedown = false;

const body = document.getElementsByTagName("body")[0];
const colorBlocks = document.querySelectorAll("#sidebar > div:not(.toolbar)");
const clearButton = document.getElementById("clear-btn");
const saveButton = document.getElementById("save-btn");
const shareButton = document.getElementById("share-btn");
const mainGrid = document.getElementById("main");

function createGrid(rows = 40, cols = 60) {
    mainGrid.innerHTML = '';
    
    for (let i = 0; i < rows * cols; i++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        mainGrid.appendChild(cell);
    }
}
createGrid();

const gridCells = document.querySelectorAll("#main > div");

clearButton.addEventListener("click", function() {
    if (confirm("Are you sure you want to clear the canvas?")) {
        for (let cell of gridCells) {
            cell.style.backgroundColor = "white";
        }
        mainGrid.animate([
            { opacity: 0.7 },
            { opacity: 1 }
        ], {
            duration: 300,
            easing: 'ease-out'
        });
    }
});

body.addEventListener("mousedown", function() {
    mousedown = true;
});

body.addEventListener("mouseup", function() {
    mousedown = false;
});


for (let colorBlock of colorBlocks) {
    colorBlock.classList.add('color-cell');
    colorBlock.addEventListener("click", function(event) {
        color = event.target.style.backgroundColor;
        
        for (let block of colorBlocks) {
            block.classList.remove('selected');
        }
        event.target.classList.add('selected');
    });
}

for (let cell of gridCells) {
    cell.addEventListener("mousedown", function(event) {
        if (color !== null) {
            event.target.style.backgroundColor = color;
        }
    });
    
    cell.addEventListener("mouseover", function(event) {
        if (mousedown && color !== null) {
            event.target.style.backgroundColor = color;
        }
    });
}

body.addEventListener("dragstart", function(e) {
    e.preventDefault();
});

saveButton.addEventListener("click", function() {
    html2canvas(mainGrid).then(canvas => {
        const link = document.createElement('a');
        link.download = 'pixel-art.png';
        link.href = canvas.toDataURL();
        link.click();
    });
});

shareButton.addEventListener("click", function() {
    alert("This feature would share your artwork to social media or generate a link. Currently just a placeholder.");
});

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'z') {
        alert("Undo functionality would go here");
    }
    if (e.key === 'Escape') {
        color = null;
        for (let block of colorBlocks) {
            block.classList.remove('selected');
        }
    }
});

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
    }, 10);
}