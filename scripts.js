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
    const datetime = now.getFullYear() + '-' +
        (now.getMonth() + 1).toString().padStart(2, '0') + '-' +
        now.getDate().toString().padStart(2, '0') + ' ' +
        now.getHours().toString().padStart(2, '0') + ':' +
        now.getMinutes().toString().padStart(2, '0') + ':' +
        now.getSeconds().toString().padStart(2, '0');

    // 初始化数据字符串，首先添加日期时间
    let data = datetime + '\n';

    // 获取备注信息
    const remarks = document.querySelector('#remarks').value;
    data += '备注信息：\n' + remarks + '\n\n';  // 添加两个换行符以与备注信息分开

    // 添加发言信息标记
    data += '发言信息：\n';

    // 遍历所有 textarea，每个条目前添加编号，去掉冒号，并处理换行与Tab对齐
    document.querySelectorAll('.role-entry textarea').forEach((textarea, index) => {
        // 处理每个textarea的内容，为换行后的每行添加Tab对齐
        const contentWithTabs = textarea.value.replace(/\n/g, '\n\t');
        data += '[' + (index + 1).toString().padStart(2, '0') + '] ' + '\t' + contentWithTabs + '\n';
    });

    // 创建Blob对象，设置类型为 text/plain
    const blob = new Blob([data], { type: 'text/plain' });

    // 创建一个下载链接
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ExportedNotes_' + datetime.replace(/:/g, '-').replace(/\s+/g, '_') + '.txt'; // 为文件命名
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
