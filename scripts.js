// 初始化函数，用于页面加载完成后立即执行的功能
function initialize() {
    checkDevice();  // 检查设备类型并提示
    adjustLayoutForMobile();  // 调整移动布局
    updateLocalTime();  // 更新时间显示
    setupEventListeners();  // 设置所有事件监听器
}

// 检查设备类型并显示提示
function checkDevice() {
    if (window.innerWidth < 1024) {
        alert("为了最佳体验，建议使用电脑访问本页面。");
    }
}

// 调整页面布局以适应移动端
function adjustLayoutForMobile() {
    // 此函数内的具体逻辑依赖于页面元素和CSS
    // 示例：隐藏左侧面板，调整右侧面板宽度等
}

// 设置时间显示
function updateLocalTime() {
    const localTimeDisplay = document.getElementById('localTime');
    localTimeDisplay.textContent = formatTime(new Date());  // 初始化时间

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
    window.onresize = adjustLayoutForMobile;
    window.onbeforeunload = () => "确定要刷新页面吗？这将使当前信息丢失。";
}

// 处理计时器按钮点击
let seconds = 0, interval = null;
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
    interval = setInterval(function () {
        seconds++;
        let totalMinutes = Math.floor(seconds / 60); // 计算总分钟数
        let remainingSeconds = seconds % 60; // 剩余秒数
        let formattedMinutes = totalMinutes.toString().padStart(2, '0');
        let formattedSeconds = remainingSeconds.toString().padStart(2, '0');
        let display = formattedMinutes + ':' + formattedSeconds; // 显示格式为 "分:秒"
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

// 切换图标
document.querySelectorAll('.toggle-icon').forEach(item => {
    let touched = false; // 用于标记是否触发了触摸事件

    // 定义切换图标的函数
    function toggleIcon() {
        this.src = this.src.includes('hand-up.png') ? 'img/hand-down.png' : 'img/hand-up.png';
    }

    // 触摸结束事件
    item.addEventListener('touchend', function (event) {
        if (!touched) { // 如果这是第一次触发touchend
            toggleIcon.call(this); // 切换图标
            touched = true; // 标记为已处理
            setTimeout(() => touched = false, 100); // 重置标记，延时可根据需要调整
        }
        event.preventDefault(); // 阻止后续的 click 事件
    });

    // 鼠标点击事件
    item.addEventListener('click', function () {
        if (!touched) { // 如果没有触发触摸事件，则处理 click 事件
            toggleIcon.call(this);
        }
    });
});



// 导出笔记
function exportNotes() {
    const now = new Date();
    const datetime = formatTimeForFilename(now);
    const remarks = document.querySelector('#remarks').value;
    const data = prepareExportData(datetime, remarks);

    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = '狼人杀笔记_' + datetime + '.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// 准备导出数据
function prepareExportData(datetime, remarks) {
    let data = `${datetime}\n****************************************\n${remarks}\n****************************************\n发言信息：\n`;
    for (let number = 1; number <= 12; number++) {
        const textarea = document.querySelector(`#input${number.toString().padStart(2, '0')}`);
        const contentWithTabs = textarea.value.replace(/\n/g, '\n\t');
        data += `[${number}] \t${contentWithTabs}\n`;
        if (number === 6) data += '****************************************\n';
    }
    return data;
}

// 格式化时间为文件名
function formatTimeForFilename(date) {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
}

// 页面加载完毕后执行初始化
window.onload = initialize;
