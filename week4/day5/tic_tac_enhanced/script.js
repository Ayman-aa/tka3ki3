document.addEventListener('DOMContentLoaded', () => {
    const cells = Array.from(document.querySelectorAll('.cell'));
    const message = document.getElementById('message');
    const restartButton = document.getElementById('restart-btn');
    const selectXButton = document.getElementById('select-x');
    const selectOButton = document.getElementById('select-o');
    const easyModeButton = document.getElementById('easy-mode');
    const hardModeButton = document.getElementById('hard-mode');
    const playerScoreElement = document.getElementById('player-score');
    const computerScoreElement = document.getElementById('computer-score');
    const tiesElement = document.getElementById('ties');
    const gameContainer = document.querySelector('.game-container');
    const body = document.querySelector('body');
    
    let board = Array(9).fill('');
    let isPlayerTurn = true;
    let isGameActive = false;
    let playerSymbol = 'X';
    let computerSymbol = 'O';
    let isHardMode = false;
    let scores = {
        player: 0,
        computer: 0,
        ties: 0
    };
    
    function createAudioElements() {
        const audioSources = {
            click: 'https://assets.mixkit.co/sfx/preview/mixkit-electronic-retro-block-hit-2185.mp3',
            win: 'https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3',
            lose: 'https://assets.mixkit.co/sfx/preview/mixkit-arcade-retro-game-over-213.mp3',
            tie: 'https://assets.mixkit.co/sfx/preview/mixkit-unlock-game-notification-253.mp3',
            start: 'https://assets.mixkit.co/sfx/preview/mixkit-unlock-game-notification-253.mp3'
        };
        
        const audioContainer = document.createElement('div');
        audioContainer.style.display = 'none';
        audioContainer.id = 'audio-container';
        
        Object.entries(audioSources).forEach(([key, src]) => {
            const audio = document.createElement('audio');
            audio.id = `sound-${key}`;
            audio.preload = 'auto';
            
            const source = document.createElement('source');
            source.src = src;
            source.type = 'audio/mp3';
            
            audio.appendChild(source);
            audioContainer.appendChild(audio);
        });
        
        document.body.appendChild(audioContainer);
    }
    
    createAudioElements();
    
    const sounds = {
        click: document.getElementById('sound-click'),
        win: document.getElementById('sound-win'),
        lose: document.getElementById('sound-lose'),
        tie: document.getElementById('sound-tie'),
        start: document.getElementById('sound-start')
    };
    
    const playSound = (sound) => {
        try {
            if (sounds[sound]) {
                sounds[sound].currentTime = 0;
                sounds[sound].play().catch(e => console.log("Sound play prevented by browser"));
            }
        } catch (e) {
            console.log("Sound error:", e);
        }
    };
    
    const computerThinkingQuotes = [
        "Hmm, let me think... 🤔",
        "Planning my next move... 📊",
        "Computing optimal strategy... 🧮",
        "Calculating probabilities... 💻",
        "Activating strategic neurons... 🧠",
        "Let's see what you've done... 👀",
        "Analyzing the board... 🔍",
        "My turn now... ⚡️",
        "What would a grandmaster do... 🧙‍♂️"
    ];
    
    const winMessages = [
        "You won! Are you cheating? 🤨",
        "Wow! You're really good at this! 🏆",
        "Victory is yours! ⭐️",
        "You beat the computer! 🎉",
        "Impressive skills! 👏"
    ];
    
    const loseMessages = [
        "Computer wins! Better luck next time! 🤖",
        "The AI overlord is victorious! 🔮",
        "Not your day, huh? Try again! 🎮",
        "Computer: 1, Human: 0 📱",
        "The machine is learning... 💾"
    ];
    
    const tieMessages = [
        "It's a tie! Great minds think alike! 🤝",
        "Draw game! Everyone's a winner! 🎭",
        "Perfectly balanced, as all things should be! ⚖️",
        "Neither winner nor loser today! 🔄",
        "It's a stalemate! 🧩"
    ];
    
    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ];
    
    const createConfetti = () => {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = -20 + 'px';
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.opacity = Math.random();
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            document.body.appendChild(confetti);
            
            const animation = confetti.animate(
                [
                    { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
                    { transform: `translate(${-50 + Math.random() * 100}px, ${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
                ],
                {
                    duration: Math.random() * 3000 + 2000,
                    easing: 'cubic-bezier(0,1,0.5,1)'
                }
            );
            
            animation.onfinish = () => {
                confetti.remove();
            };
        }
    };
    
    const initGame = () => {
        board = Array(9).fill('');
        isGameActive = true;
        isPlayerTurn = true;
        message.textContent = `Your turn (${playerSymbol})`;
        message.style.color = '#333';
        
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x-mark', 'o-mark', 'win-cell');
            cell.addEventListener('click', cellClicked);
            
            cell.addEventListener('mouseenter', (e) => {
                if (e.target.textContent === '' && isGameActive && isPlayerTurn) {
                    e.target.textContent = playerSymbol;
                    e.target.style.opacity = '0.3';
                }
            });
            
            cell.addEventListener('mouseleave', (e) => {
                if (e.target.style.opacity === '0.3') {
                    e.target.textContent = '';
                    e.target.style.opacity = '1';
                }
            });
        });
        
        restartButton.style.display = 'none';
        body.style.backgroundColor = '#f8f9fa';
        playSound('start');
        
        gameContainer.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            gameContainer.style.animation = '';
        }, 500);
        
        updateScoreDisplay();
    };
    
    const updateScoreDisplay = () => {
        playerScoreElement.textContent = scores.player;
        computerScoreElement.textContent = scores.computer;
        tiesElement.textContent = scores.ties;
        
        const playerBox = document.getElementById('player-box');
        const computerBox = document.getElementById('computer-box');
        const tiesBox = document.getElementById('ties-box');
        
        [playerBox, computerBox, tiesBox].forEach(box => {
            box.style.animation = '';
        });
        
        if (scores.player > 0) playerBox.style.animation = 'pulse 0.5s ease';
        if (scores.computer > 0) computerBox.style.animation = 'pulse 0.5s ease';
        if (scores.ties > 0) tiesBox.style.animation = 'pulse 0.5s ease';
    };
    
    selectXButton.addEventListener('click', () => {
        playerSymbol = 'X';
        computerSymbol = 'O';
        selectXButton.classList.add('active');
        selectOButton.classList.remove('active');
        playSound('click');
        initGame();
    });
    
    selectOButton.addEventListener('click', () => {
        playerSymbol = 'O';
        computerSymbol = 'X';
        selectOButton.classList.add('active');
        selectXButton.classList.remove('active');
        playSound('click');
        initGame();
    });
    
    easyModeButton.addEventListener('click', () => {
        isHardMode = false;
        easyModeButton.classList.add('active');
        hardModeButton.classList.remove('active');
        playSound('click');
        initGame();
    });
    
    hardModeButton.addEventListener('click', () => {
        isHardMode = true;
        hardModeButton.classList.add('active');
        easyModeButton.classList.remove('active');
        playSound('click');
        message.textContent = "Good luck against the AI! 😈";
        setTimeout(() => {
            if (isGameActive) {
                message.textContent = `Your turn (${playerSymbol})`;
            }
        }, 1500);
        initGame();
    });
    
    restartButton.addEventListener('click', () => {
        playSound('click');
        initGame();
    });
    
    const cellClicked = (e) => {
        const cellIndex = Number(e.target.id.replace('cell-', ''));
        
        if (board[cellIndex] !== '' || !isGameActive || !isPlayerTurn) return;
        
        e.target.style.opacity = '1';
        
        makeMove(cellIndex, playerSymbol);
        playSound('click');
        
        cells[cellIndex].style.transform = 'scale(1.1)';
        setTimeout(() => {
            if (cells[cellIndex]) cells[cellIndex].style.transform = '';
        }, 200);
        
        if (isGameActive) {
            isPlayerTurn = false;
            const randomQuote = computerThinkingQuotes[Math.floor(Math.random() * computerThinkingQuotes.length)];
            message.textContent = randomQuote;
            
            setTimeout(() => {
                computerMove();
                isPlayerTurn = true;
                if (isGameActive) {
                    message.textContent = `Your turn (${playerSymbol})`;
                }
            }, 1200);
        }
    };
    
    const makeMove = (cellIndex, symbol) => {
        board[cellIndex] = symbol;
        cells[cellIndex].textContent = symbol;
        
        if (symbol === 'X') {
            cells[cellIndex].classList.add('x-mark');
        } else {
            cells[cellIndex].classList.add('o-mark');
        }
        
        if (checkWin(symbol)) {
            const winningCombo = getWinningCombo(symbol);
            highlightWinningCells(winningCombo);
            
            if (symbol === playerSymbol) {
                const randomWinMessage = winMessages[Math.floor(Math.random() * winMessages.length)];
                endGame(randomWinMessage);
                scores.player++;
                body.style.backgroundColor = '#c8ffc1';
                playSound('win');
                createConfetti();
                message.classList.add('animate-win');
            } else {
                const randomLoseMessage = loseMessages[Math.floor(Math.random() * loseMessages.length)];
                endGame(randomLoseMessage);
                scores.computer++;
                body.style.backgroundColor = '#ffcccb';
                playSound('lose');
                message.classList.add('animate-loss');
            }
        } else if (board.every(cell => cell !== '')) {
            const randomTieMessage = tieMessages[Math.floor(Math.random() * tieMessages.length)];
            endGame(randomTieMessage);
            scores.ties++;
            body.style.backgroundColor = '#f0f0f0';
            playSound('tie');
        }
        
        updateScoreDisplay();
    };
    
    const getWinningCombo = (symbol) => {
        return winCombos.find(combo => 
            combo.every(index => board[index] === symbol)
        );
    };
    
    const highlightWinningCells = (combo) => {
        combo.forEach(index => {
            cells[index].classList.add('win-cell');
        });
    };
    
    const computerMove = () => {
        if (!isGameActive) return;
        
        let cellIndex;
        
        if (isHardMode) {
            cellIndex = findBestMove();
        } else {
            const availableCells = board.reduce((acc, cell, index) => {
                if (cell === '') acc.push(index);
                return acc;
            }, []);
            
            cellIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        }
        
        if (cellIndex !== undefined) {
            cells[cellIndex].style.backgroundColor = '#ffffcc';
            
            setTimeout(() => {
                cells[cellIndex].style.backgroundColor = '';
                makeMove(cellIndex, computerSymbol);
                playSound('click');
            }, 300);
        }
    };
    
    const checkWin = (symbol) => {
        return winCombos.some(combination => {
            return combination.every(index => board[index] === symbol);
        });
    };
    
    const endGame = (result) => {
        isGameActive = false;
        message.textContent = result;
        restartButton.style.display = 'inline-block';
        cells.forEach(cell => cell.removeEventListener('click', cellClicked));
        
        restartButton.style.animation = 'pulse 1s infinite';
        
        setTimeout(() => {
            message.classList.remove('animate-win', 'animate-loss');
        }, 1000);
    };
    
    const findBestMove = () => {
        const winMove = findWinningMove(computerSymbol);
        if (winMove !== null) return winMove;
        
        const blockMove = findWinningMove(playerSymbol);
        if (blockMove !== null) return blockMove;
        
        if (board[4] === '') return 4;
        
        const forkMove = findForkMove(computerSymbol);
        if (forkMove !== null) return forkMove;
        
        const blockForkMove = findForkMove(playerSymbol);
        if (blockForkMove !== null) return blockForkMove;
        
        const corners = [0, 2, 6, 8];
        const availableCorners = corners.filter(corner => board[corner] === '');
        if (availableCorners.length > 0) {
            return availableCorners[Math.floor(Math.random() * availableCorners.length)];
        }
        
        const sides = [1, 3, 5, 7];
        const availableSides = sides.filter(side => board[side] === '');
        if (availableSides.length > 0) {
            return availableSides[Math.floor(Math.random() * availableSides.length)];
        }
        
        return null;
    };
    
    const findForkMove = (symbol) => {
        const emptyCells = board.reduce((acc, cell, index) => {
            if (cell === '') acc.push(index);
            return acc;
        }, []);
        
        for (let i = 0; i < emptyCells.length; i++) {
            const index = emptyCells[i];
            board[index] = symbol;
            
            let winningThreats = 0;
            winCombos.forEach(combo => {
                const symbolCount = combo.reduce((count, pos) => 
                    board[pos] === symbol ? count + 1 : count, 0);
                const emptyCount = combo.reduce((count, pos) => 
                    board[pos] === '' ? count + 1 : count, 0);
                
                if (symbolCount === 2 && emptyCount === 1) {
                    winningThreats++;
                }
            });
            
            board[index] = '';
            
            if (winningThreats >= 2) {
                return index;
            }
        }
        
        return null;
    };
    
    const findWinningMove = (symbol) => {
        for (let i = 0; i < winCombos.length; i++) {
            const [a, b, c] = winCombos[i];
            if (board[a] === symbol && board[b] === symbol && board[c] === '') return c;
            if (board[a] === symbol && board[c] === symbol && board[b] === '') return b;
            if (board[b] === symbol && board[c] === symbol && board[a] === '') return a;
        }
        return null;
    };
    
    let keySequence = [];
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    window.addEventListener('keydown', (e) => {
        keySequence.push(e.key);
        keySequence = keySequence.slice(-10);
        
        if (keySequence.join(',') === konamiCode.join(',')) {
            message.textContent = "🌈 CHEAT MODE ACTIVATED! 🌈";
            createConfetti();
            scores.player += 10;
            updateScoreDisplay();
            playSound('win');
            setTimeout(() => {
                if (isGameActive) message.textContent = `Your turn (${playerSymbol})`;
            }, 2000);
        }
    });
    
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.transform = 'translate(-50%, -50%) scale(0)';
            ripple.style.pointerEvents = 'none';
            
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            button.appendChild(ripple);
            
            ripple.animate(
                [
                    { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
                    { transform: 'translate(-50%, -50%) scale(4)', opacity: 0 }
                ],
                {
                    duration: 600,
                    easing: 'ease-out'
                }
            ).onfinish = () => {
                ripple.remove();
            };
        });
    });
    
    selectXButton.classList.add('active');
    easyModeButton.classList.add('active');
    initGame();
    
    setTimeout(() => {
        message.textContent = "Ready to play? Make your move! 😊";
        setTimeout(() => {
            if (isGameActive) message.textContent = `Your turn (${playerSymbol})`;
        }, 1500);
    }, 500);
});