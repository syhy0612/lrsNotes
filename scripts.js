// 初始化函数，用于页面加载完成后立即执行的功能
function initialize() {
    checkDevice(); // 检查设备类型并提示
    adjustLayoutForMobile(); // 调整移动布局
    updateLocalTime(); // 更新时间显示
    setupEventListeners(); // 设置所有事件监听器
}

// 检查设备类型并显示提示
function checkDevice() {
    if (window.innerWidth < 1024) {
        // 暂时取消
        // alert("为了最佳体验，建议使用电脑访问本页面。");
    }
}

// 调整页面布局以适应移动端
function adjustLayoutForMobile() {
    // 此函数内的具体逻辑依赖于页面元素和CSS
}

// 设置时间显示
function updateLocalTime() {
    const localTimeDisplay = document.getElementById('localTime');
    localTimeDisplay.textContent = formatTime(new Date());

    setInterval(() => {
        localTimeDisplay.textContent = formatTime(new Date());
    }, 1000);
}

// 格式化时间为 hh:mm:ss
function formatTime(date) {
    return date.toLocaleTimeString('zh-CN', { hour12: false });
}

// 设置事件监听器
function setupEventListeners() {
    document.getElementById('timerButton').addEventListener('click', handleTimerClick);
    document.querySelectorAll('.toggle-icon').forEach(icon => {
        icon.addEventListener('click', toggleIcon);
    });
    // 确保绑定了显示模态框的按钮
    document.getElementById('exportButton').addEventListener('click', showExportModal);
    window.onresize = adjustLayoutForMobile;
    window.onbeforeunload = () => "确定要刷新页面吗？这将使当前信息丢失。";
}

// 切换图标的实现
function toggleIcon() {
    this.src = this.src.includes('hand-up.png') ? 'img/hand-down.png' : 'img/hand-up.png';
}

// 处理计时器按钮点击
let seconds = 0;
let interval = null;

function handleTimerClick() {
    const timerButton = document.getElementById('timerButton');
    if (timerButton.textContent.startsWith('开始')) {
        timerButton.textContent = '正在计时: 00:00';
        startTimer();
    } else if (confirm('是否停止计时?')) {
        timerButton.textContent = '开始计时: 00:00';
        stopTimer();
    }
}

// 开始计时
function startTimer() {
    interval = setInterval(() => {
        seconds++;
        let totalMinutes = Math.floor(seconds / 60);
        let remainingSeconds = seconds % 60;
        let display = `${totalMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        document.getElementById('timerButton').textContent = '正在计时: ' + display;
    }, 1000);
}

// 停止计时
function stopTimer() {
    clearInterval(interval);
    seconds = 0;
}

// 重置笔记
function resetNotes() {
    if (confirm('确定重置吗？')) {
        document.querySelectorAll('textarea').forEach(element => {
            element.value = element.id === 'remarks' ? '警上：\n警下：' : '';
        });
        document.querySelectorAll('.toggle-icon').forEach(icon => {
            icon.src = 'img/hand-up.png';
        });
    }
}

// 显示导出模态框
function showExportModal() {
    document.getElementById('exportText').value = prepareExportData();
    document.getElementById('exportModal').style.display = 'block';
}

// 准备导出数据
function prepareExportData() {
    const datetime = topTextTime(new Date());
    const remarks = document.querySelector('#remarks').value;
    let data = `${datetime}\n****************************************\n${remarks}\n****************************************\n发言信息：\n`;
    for (let number = 1; number <= 12; number++) {
        const textarea = document.querySelector(`#input${number.toString().padStart(2, '0')}`);
        const contentWithTabs = textarea.value.replace(/\n/g, '\n\t');
        // 使用 toString().padStart(2, '0') 确保数字以两位格式显示
        data += `[${number.toString().padStart(2, '0')}] \t${contentWithTabs}\n`;
        if (number === 6) data += '****************************************\n';
    }
    return data;
}


function formatTimeForFilename(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day}#${hours}.${minutes}.${seconds}`;
}

function topTextTime(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
}


// 隐藏模态框并取消导出
function closeModal() {
    document.getElementById('exportModal').style.display = 'none';
}

// 执行实际的导出操作
function performExport() {
    const now = new Date();
    const datetime = formatTimeForFilename(now);
    const data = document.getElementById('exportText').value;
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = '狼人杀笔记_' + datetime + '.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    closeModal(); // 关闭模态框
}

// 复制文本框内容到剪贴板
function copyToClipboard() {
    const textArea = document.getElementById('exportText');
    navigator.clipboard.writeText(textArea.value).then(() => {
        let snackbar = document.getElementById("snackbar");
        snackbar.className = "show";
        snackbar.textContent = "内容已复制"; // 更新文本内容
        setTimeout(() => { snackbar.className = snackbar.className.replace("show", ""); }, 3000);
    }).catch(err => {
        console.error('无法复制内容: ', err);
    });
}



document.getElementById('exportText').addEventListener('keydown', function (e) {
    if (e.key == 'Tab') {
        e.preventDefault();  // 阻止默认行为
        var start = this.selectionStart;
        var end = this.selectionEnd;

        // 设置文本域的值：在光标位置插入制表符
        this.value = this.value.substring(0, start) +
            "\t" + this.value.substring(end);

        // 移动光标到制表符后面
        this.selectionStart =
            this.selectionEnd = start + 1;
    }
});


// 页面加载完毕后执行初始化
window.onload = initialize;
