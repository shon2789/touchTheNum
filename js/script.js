//Touch the num
var timerVar;
var totalSeconds = 0;
var gBoard;
var gCount;


function initGame() {
    gBoard = createArr(16)
    // difficulty();
    renderGame();
    gCount = 1;
    if (timerVar) {
        clearTimeout(timerVar);
        totalSeconds = 0;
    } else {
        timerVar = null;
    }


}


function renderGame() {
    var strHTML = '';
    var copyBoard = gBoard.slice();
    for (var i = 0; i < Math.sqrt(gBoard.length); i++) {
        strHTML += '<tr>';
        for (var j = 0; j < Math.sqrt(gBoard.length); j++) {
            var randNum = drawNum(copyBoard);
            strHTML += `<td onclick="clickNum(this, ${i})">${randNum}</td>`
        }
        strHTML += '</tr>';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}


function clickNum(elNum) {
    if (elNum.innerText === gCount + '') {
        if (elNum.textContent === '1') {
            timerVar = setInterval(countTimer, 1000);
            countTimer();
        }
        new Audio('/sound/pop.mp3').play();
        elNum.style.backgroundColor = '#fcd5ce'
        elNum.classList.toggle('.pressed');
        console.dir(elNum);
        gCount++
    }
    if (gCount === gBoard.length + 1) {
        clearInterval(timerVar);
        totalSeconds = 0;
    }
}


function difficulty(difficulty) {
    switch (difficulty) {
        case 'easy':
            gBoard = createArr(25);
            break;
        case 'medium':
            gBoard = createArr(36);
            break;
        case 'hard':
            gBoard = createArr(64);
            break;
    }
    renderGame();
    clearInterval(timerVar);
    totalSeconds = 0;
    gCount = 1;
}



function createArr(size) {
    var numsArray = [];
    for (var i = 0; i < size; i++) {
        numsArray.push(i + 1);
    }
    return numsArray;
}





function drawNum(arr) {
    var idx = getRandomInt(0, arr.length)
    var num = arr[idx];
    arr.splice(idx, 1);
    return num;
}



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is inclusive and the minimum is inclusive 
}



function countTimer() {
    ++totalSeconds;
    var hour = Math.floor(totalSeconds / 3600);
    var minute = Math.floor((totalSeconds - hour * 3600) / 60);
    var seconds = totalSeconds - (hour * 3600 + minute * 60);
    if (hour < 10)
        hour = "0" + hour;
    if (minute < 10)
        minute = "0" + minute;
    if (seconds < 10)
        seconds = "0" + seconds;
    document.querySelector('.timer').innerHTML = 'Timer: ' + hour + ":" + minute + ":" + seconds;
}