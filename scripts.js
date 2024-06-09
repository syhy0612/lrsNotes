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
        document.querySelectorAll('textarea').forEach(element => {
            if (element.id === 'remarks') {
                // 如果是备注信息的 textarea，设置为特定的值
                element.value = '警上：\n警下：';
            } else {
                // 其他所有的 textarea 设置为空
                element.value = '';
            }
        });
        // 重置所有举手图标为举手状态
        document.querySelectorAll('.toggle-icon').forEach(icon => {
            icon.src = 'img/hand-up.png'; // 设置所有图标为举手状态
        });
    }
}

document.querySelectorAll('.toggle-icon').forEach(item => {
    item.addEventListener('click', function () {
        // Check current source and switch to the other
        if (this.src.includes('hand-up.png')) {
            this.src = 'img/hand-down.png';
        } else {
            this.src = 'img/hand-up.png';
        }
    });
});





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
