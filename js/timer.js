let countdownActive = false;
let endTime = null;
let intervalId = null;
let totalTimeMs = 20 * 60 * 1000; // 时间
let remainingTimeMs = totalTimeMs; // 添加用于保存剩余时间的变量

function formatTime(ms) {
    const totalSeconds = Math.round(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return ms <= 0 ? "时间到" : `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateTimerDisplay() {
    const currentTime = new Date().getTime();
    const timeLeft = endTime - currentTime;
    remainingTimeMs = timeLeft; // 更新剩余时间
    document.getElementById('timer').innerText = timeLeft >= 0 ? formatTime(timeLeft) : "时间到";
    if (timeLeft <= 0 && countdownActive) {
        clearInterval(intervalId);
        countdownActive = false;
        document.getElementById('startStop').innerHTML = "&#xea88;";
        document.getElementById('timeReset').disabled = false;
        document.getElementById('startStop').disabled = true;
    }
}

function startOrPauseTimer() {
    if (!countdownActive) {
        countdownActive = true;
        document.getElementById('startStop').innerHTML = "&#xea81;";
        document.getElementById('timeReset').disabled = true;
        endTime = new Date().getTime() + remainingTimeMs; // 使用剩余时间继续计时
        intervalId = setInterval(updateTimerDisplay, 100);
    } else {
        clearInterval(intervalId);
        countdownActive = false;
        document.getElementById('startStop').innerHTML = "&#xea82;";
        document.getElementById('timeReset').disabled = false;
    }
}

function resetTimer() {
    clearInterval(intervalId);
    countdownActive = false;
    endTime = null;
    remainingTimeMs = totalTimeMs; // 重置时将剩余时间设置为初始时间
    document.getElementById('timer').innerText = formatTime(totalTimeMs);
    document.getElementById('startStop').innerHTML = "&#xea88;";
    document.getElementById('startStop').disabled = false;
    document.getElementById('timeReset').disabled = true;
}

document.getElementById('startStop').addEventListener('click', startOrPauseTimer);
document.getElementById('timeReset').addEventListener('click', resetTimer);
// 初始化显示默认时间
document.getElementById('timer').innerText = formatTime(totalTimeMs);
