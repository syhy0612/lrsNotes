let countdownActive = false;
let endTime = null;
let intervalId = null;
let totalTimeMs = 20 * 60 * 1000; // 时间为3秒
let tips = "有效局";
let remainingTimeMs = totalTimeMs; // 保存剩余时间的变量

function formatTime(ms) {
    const totalSeconds = Math.round(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return ms <= 0 ? tips : `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateTimerDisplay() {
    const currentTime = new Date().getTime();
    const timeLeft = endTime - currentTime;
    remainingTimeMs = timeLeft; // 更新剩余时间
    document.getElementById('timer').innerText = timeLeft >= 0 ? formatTime(timeLeft) : tips;
    if (timeLeft <= 0 && countdownActive) {
        clearInterval(intervalId);
        countdownActive = false;
        document.getElementById('startStop').innerHTML = "&#xea88;";
        document.getElementById('startStop').disabled = true;
    }
    updateButtonState();
}

function startOrPauseTimer() {
    if (!countdownActive && !document.getElementById('startStop').disabled) {
        countdownActive = true;
        document.getElementById('startStop').innerHTML = countdownActive ? "&#xea81;" : "&#xea82;";
        endTime = new Date().getTime() + remainingTimeMs; // 使用剩余时间继续计时
        intervalId = setInterval(updateTimerDisplay, 100);
    } else if (countdownActive) {
        clearInterval(intervalId);
        countdownActive = false;
        document.getElementById('startStop').innerHTML = "&#xea82;";
    }
    updateButtonState();
}

function resetTimer() {
    if (!countdownActive && remainingTimeMs !== totalTimeMs) {  // 只有当计时器停止且时间未复位时才允许复位
        clearInterval(intervalId);
        countdownActive = false;
        endTime = null;
        remainingTimeMs = totalTimeMs; // 重置时间
        document.getElementById('timer').innerText = formatTime(totalTimeMs);
        document.getElementById('startStop').innerHTML = "&#xea88;";
        document.getElementById('startStop').disabled = false;
        updateButtonState();
    }
}

function updateButtonState() {
    document.getElementById('timeReset').disabled = countdownActive || remainingTimeMs === totalTimeMs;  // 当计时器在运行或时间已经复位时禁用重置按钮
}

document.getElementById('startStop').addEventListener('click', startOrPauseTimer);
document.getElementById('timeReset').addEventListener('click', resetTimer);
// 初始化显示默认时间
document.getElementById('timer').innerText = formatTime(totalTimeMs);
