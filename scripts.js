function checkDevice() {
    if (window.innerWidth < 1024) { // 假定宽度小于1024像素为非电脑设备
        alert("为了最佳体验，建议使用电脑访问本页面。");
    }
}

window.onload = function () {
    checkDevice();
};

window.onbeforeunload = function () {
    return "确定要刷新页面吗？这将当前信息丢失。";
};


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
    // 获取当前日期和时间
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const datetime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    // 初始化数据字符串，首先添加日期时间
    let data = `${datetime}\n`;

    // 获取备注信息
    const remarks = document.querySelector('#remarks').value;
    data += '****************************************\n' + remarks + '\n****************************************\n';  // 添加两个换行符以与备注信息分开

    // 添加发言信息标记
    data += '发言信息：\n';

    // 遍历按照1到12的正常顺序的textarea
    for (let number = 1; number <= 12; number++) {
        const textarea = document.querySelector(`#input${number.toString().padStart(2, '0')}`);
        const contentWithTabs = textarea.value.replace(/\n/g, '\n\t');
        data += `[${number.toString().padStart(2, '0')}] ` + '\t' + contentWithTabs + '\n';
        // 在编号6之后添加一个额外的换行符
        if (number === 6) {
            data += '****************************************\n'; // 这将添加一个空行作为分隔
        }
    }

    // 创建Blob对象，设置类型为 text/plain
    const blob = new Blob([data], { type: 'text/plain' });

    // 创建一个下载链接
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = '狼人杀笔记_' + datetime.replace(/:/g, '-').replace(/\s+/g, '_') + '.txt'; // 为文件命名
    document.body.appendChild(link); // 将链接添加到页面上
    link.click(); // 模拟点击以触发下载
    document.body.removeChild(link); // 下载后移除链接
    URL.revokeObjectURL(url); // 清除内存中的引用
}




function updateLocalTime() {
    setInterval(() => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('zh-CN', { hour12: false });
        document.getElementById('localTime').textContent = timeStr;
    }, 1000);
}

updateLocalTime();
