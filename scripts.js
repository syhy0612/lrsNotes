document.getElementById('add-catalog-item').addEventListener('click', function () {
    let catalog = document.getElementById('catalog');
    let newItem = document.createElement('input');
    newItem.type = 'text';
    newItem.placeholder = '输入新的目录项';
    catalog.appendChild(newItem);
});

document.getElementById('reset').addEventListener('click', function () {
    if (confirm('确定要重置所有内容吗？')) {
        let inputs = document.querySelectorAll('input');
        inputs.forEach(input => input.value = '');
    }
});

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
    document.querySelectorAll('#notesList input').forEach(input => {
        input.value = '';
    });
}

function exportNotes() {
    let data = Array.from(document.querySelectorAll('#notesList input'), input => input.value).join('\n');
    console.log(data); // This would be replaced with actual export functionality
}

function updateBeijingTime() {
    setInterval(() => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('zh-CN', { hour12: false });
        document.getElementById('bjTime').textContent = timeStr;
    }, 1000);
}

updateBeijingTime();

