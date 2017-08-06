let puzzleModule = (function() {
    'use strict';
    /*drag functions*/

    function allowDrop(event) {
        event.preventDefault();
    }

    function drag(event) {
        let id = event.target.id;
        event.dataTransfer.setData('text', id);
    }

    function drop(event) {
        event.preventDefault();
        let data = event.dataTransfer.getData('text');
        let targetElement = event.target;
        if (targetElement.dataset.empty === 'true') {
            event.target.appendChild(document.getElementById(data));
            let completeTest = checkComplete();
            let l;
            if (completeTest) {
                let puzzleItems = document.querySelectorAll('[id^="puzzle-piece-"]');
                for (l = 0; l < puzzleItems.length; l++) {
                    puzzleItems[l].classList.add('shake');
                }
                setTimeout(endGameWinner, 3000);
            }
            targetElement.dataset.dataEmpty === 'false';
        } else {
            alert('That spot already has a piece.');
        }
    }

    /*end drag functions*/

    /*action functions*/

    let timeRemaining;

    let scrambleButton = document.getElementById('scramble');

    function scramble() {
        let puzzleBoard = document.getElementById('puzzle-board');
        let puzzlePiecesArea = document.getElementById('puzzle-pieces');
        let difficulty = document.getElementById('difficulty');
        let difficultyValue = difficulty.options[difficulty.selectedIndex].value;
        let startAction = document.getElementById('start-control');
        let extraAction = document.getElementById('extra-actions');

        if (difficultyValue == 'easy') {
            timeRemaining = 420000;
        } else {
            if (difficultyValue == 'medium') {
                timeRemaining = 300000;
            } else {
                timeRemaining = 180000;
            }
        }

        puzzleBoard.style.background = 'url("./assets/images/unsolved.png")';
        puzzlePiecesArea.innerHTML = '';

        let imgSourceArray = [
            '<img id="puzzle-piece-5" src="assets/images/Group5.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-6" src="assets/images/Group6.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-7" src="assets/images/Group7.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-8" src="assets/images/Group8.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-9" src="assets/images/Group9.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-10" src="assets/images/Group10.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-11" src="assets/images/Group11.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-12" src="assets/images/Group12.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-13" src="assets/images/Group13.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-14" src="assets/images/Group14.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-15" src="assets/images/Group15.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-16" src="assets/images/Group16.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-17" src="assets/images/Group17.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-18" src="assets/images/Group18.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-19" src="assets/images/Group19.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-20" src="assets/images/Group20.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-21" src="assets/images/Group21.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-22" src="assets/images/Group22.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-23" src="assets/images/Group23.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-24" src="assets/images/Group24.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-25" src="assets/images/Group25.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-26" src="assets/images/Group26.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-27" src="assets/images/Group27.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-28" src="assets/images/Group28.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-29" src="assets/images/Group29.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-30" src="assets/images/Group30.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-31" src="assets/images/Group31.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-32" src="assets/images/Group32.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-33" src="assets/images/Group33.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-34" src="assets/images/Group34.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-35" src="assets/images/Group35.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-36" src="assets/images/Group36.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-37" src="assets/images/Group37.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-38" src="assets/images/Group38.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-39" src="assets/images/Group39.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-40" src="assets/images/Group40.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-41" src="assets/images/Group41.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-42" src="assets/images/Group42.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-43" src="assets/images/Group43.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-44" src="assets/images/Group44.png" ondragstart="puzzleModule.drag(event)" draggable="true">',
            '<img id="puzzle-piece-45" src="assets/images/Group45.png" ondragstart="puzzleModule.drag(event)" draggable="true">'
        ];

        let i;
        //randomize array
        imgSourceArray.sort(function() {
            return 0.5 - Math.random();
        });

        for (i = 0; i < imgSourceArray.length; i++) {
            let puzzlePieceHTML = imgSourceArray[i];
            puzzlePiecesArea.innerHTML += puzzlePieceHTML;
        }
        startAction.classList.add('hidden');
        extraAction.classList.remove('hidden');
        countDown(timeRemaining);
        setTimeout(checkComplete, timeRemaining);
    }

    scrambleButton.addEventListener('click', scramble);

    /*puzzle functions*/

    function checkComplete() {
        let complete = true;
        let puzzleBoard = document.getElementById('puzzle-board');
        let j;
        for (j = 5; j <= 45; j++) {
            let dropZone = puzzleBoard.querySelector('#dropzone-' + j);
            let test = dropZone.querySelector('#puzzle-piece-' + j);
            if (!test) {
                complete = false;
            }
        }
        return complete;
    }

    function finishPuzzle() {
        let puzzleBoard = document.getElementById('puzzle-board');
        let piecesShelf = document.getElementById('puzzle-pieces');
        let boardItems = puzzleBoard.querySelectorAll('[id^="puzzle-piece-"]');
        let items = piecesShelf.querySelectorAll('[id^="puzzle-piece-"]');
        let k, l, m;
        for (m = 0; m < boardItems.length; m++) {
            let id = boardItems[m].id.substr(13);
            let nodeItem = boardItems[m].parentNode.removeChild(boardItems[m]);
            let correctBoardPosition = puzzleBoard.querySelector('#dropzone-' + id);
            correctBoardPosition.appendChild(nodeItem);
        }
        for (k = 0; k < items.length; k++) {
            let idNum = items[k].id.substr(13);

            let node = piecesShelf.removeChild(items[k]);
            let correctPosition = puzzleBoard.querySelector('#dropzone-' + idNum);
            correctPosition.appendChild(node);
        }
        let completeTest = checkComplete();
        if (completeTest) {
            for (l = 0; l < items.length; l++) {
                items[l].classList.add('shake');
            }
            setTimeout(endGameWinner, 3000);
        } else {
            endGameLoser();
        }
    }

    let finishButton = document.getElementById('finish-puzzle');
    finishButton.addEventListener('click', finishPuzzle);

    //show completed puzzle

    function showComplete() {
        let puzzleBoard = document.getElementById('puzzle-board');
        puzzleBoard.style.background = 'url("./assets/images/solved.png")';
    }

    function hideComplete() {
        let puzzleBoard = document.getElementById('puzzle-board');
        puzzleBoard.style.background = 'url("./assets/images/unsolved.png")';
    }

    let showCompleteButton = document.getElementById('show-hint');
    showCompleteButton.addEventListener('mousedown', showComplete);
    showCompleteButton.addEventListener('mouseup', hideComplete);

    function countDown(timeRemaining) {
        let timer = document.getElementById('countdown-timer');
        timer.style.display = 'flex';
        if (timeRemaining === 420000) {
            timer.innerHTML = '07:00';
        } else {
            if (timeRemaining === 300000) {
                timer.innerHTML = '05:00';
            } else {
                document.getElementById('show-hint').classList.add('hidden');
                timer.innerHTML = '03:00';
            }
        }

        startTimer();
    }

    function startTimer() {
        let timer = document.getElementById('countdown-timer');
        let presentTime = timer.innerHTML;
        let l;
        let timeArray = presentTime.split(':');
        let m = parseInt(timeArray[0]);
        let s = checkSecond(parseInt(timeArray[1] - 1));
        if (parseInt(s) === 59) {
            m = m - 1;
        }
        //if time runs out, check winner/loser
        if (m === 0 && s === '00') {
            timer.style.display = 'none';
            if (checkComplete()) {
                endGameWinner();
            } else {
                endGameLoser();
            }
        }

        document.getElementById('countdown-timer').innerHTML = m + ':' + s;
        setTimeout(function() {
            startTimer();
        }, 1000);
    }

    function checkSecond(sec) {
        if (sec < 10 && sec >= 0) {
            sec = '0' + sec;
        } // add zero in front of numbers < 10
        if (sec < 0) {
            sec = '59';
        }
        return sec;
    }

    function endGameWinner() {
        let audio = new Audio('./assets/sounds/win.wav');
        audio.play();
        setTimeout(function() {
            if (!alert("Congratulations!!!! You're a winner!")) {
                window.location.reload();
            }
        }, 1000);
    }

    function endGameLoser() {
        let audio = new Audio('./assets/sounds/lose.wav');
        audio.play();
        setTimeout(function() {
            if (!alert('Sorry...You gotta try again!')) {
                window.location.reload();
            }
        }, 1000);
    }

    return {
        allowDrop: allowDrop,
        drag: drag,
        drop: drop
    };
})();
