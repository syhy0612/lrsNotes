document.getElementById('timerButton').addEventListener('click', function () {
    if (this.textContent.startsWith('开始')) {
        this.textContent = '正在计时: 00:00';
        startTimer();
    } else {
        if (confirm('是否停止计时?')) {
            this.textContent = '开始计时: 00:00';
            stopTimer();
        }
    }
});

let seconds = 0;
let interval = null;

function startTimer() {
    interval = setInterval(function () {
        seconds++;
        let hours = Math.floor(seconds / 3600);
        let minutes = Math.floor((seconds % 3600) / 60);
        let remainingSeconds = seconds % 60;
        let formattedMinutes = hours > 0 ? (hours * 60 + minutes).toString().padStart(2, '0') : minutes.toString().padStart(2, '0');
        let formattedSeconds = remainingSeconds.toString().padStart(2, '0');
        let display = formattedMinutes + ':' + formattedSeconds;
        document.getElementById('timerButton').textContent = '正在计时: ' + display;
    }, 1000);
}

function stopTimer() {
    clearInterval(interval);
    seconds = 0;
}

function resetNotes() {
    if (confirm('确定重置吗？')) {
        document.querySelectorAll('.note-input input, .note-input textarea').forEach(element => {
            if (element.type === 'text')
                element.value = '';
            if (element.nodeName === 'TEXTAREA')
                element.value = '警上：\n警下：';
        })
    }
}



function exportNotes() {
    let data = Array.from(document.querySelectorAll('#notesList input'), input => input.value).join('\n');
    console.log(data); // This would be replaced with actual export functionality
}

function updateLocalTime() {
    setInterval(() => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('zh-CN', { hour12: false });
        document.getElementById('localTime').textContent = timeStr;
    }, 1000);
}

updateLocalTime();
