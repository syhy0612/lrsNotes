document.addEventListener('DOMContentLoaded', function () {
    setupEventListeners(); // 初始化设置事件监听
});

function setupEventListeners() {
    document.querySelectorAll('.toggle-icon').forEach(icon => {
        icon.addEventListener('click', toggleIcon);
    });

    const exportButton = document.getElementById('exportButton');
    if (exportButton) {
        exportButton.addEventListener('click', exportButtonFunction);
    }
}




function toggleIcon() {
    let currentSrc = this.src;
    if (currentSrc.includes('hand-on.svg')) {
        this.src = 'svg/hand-off.svg';
    } else if (currentSrc.includes('hand-off.svg')) {
        this.src = 'svg/hand-on.svg';
    }
}

function resetNotes() {
    if (confirm('确定重置吗？')) {
        document.querySelectorAll('textarea').forEach(element => {
            element.value = '';
        });
        document.querySelectorAll('.toggle-icon').forEach(icon => {
            icon.src = 'svg/hand-on.svg';
        });
        document.querySelectorAll('.hexagon').forEach(hex => {
            hex.className = 'hexagon'; // 只保留 "hexagon" 这个类
            hex.textContent = ''; // 清空文本内容
        });
    }
}


function exportButtonFunction() {
    const exportModal = document.getElementById('exportModal');
    if (exportModal) {
        exportModal.style.display = 'block';
        document.getElementById('exportText').value = prepareExportData();
    }
}

function showExplainModal() {
    const explainModal = document.getElementById('explainModal');
    if (explainModal) {
        explainModal.style.display = 'block';
    }
}

function selectRoles() {
    // 这里可以添加您的具体实现逻辑，用于处理版型选择
}

function closeModal() {
    const modals = ['exportModal', 'explainModal'];
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
    });
}

function prepareExportData() {
    const datetime = topTextTime(new Date());
    const remarks = document.querySelector('#remarks').value;
    let data = `${datetime}\n***************************************\n${remarks}\n***************************************\n发言信息：\n`;
    for (let number = 1; number <= 12; number++) {
        const textarea = document.querySelector(`#input${number.toString().padStart(2, '0')}`);
        const contentWithTabs = textarea.value.replace(/\n/g, '\n\t');
        data += `[${number.toString().padStart(2, '0')}] \t${contentWithTabs}\n`;
        if (number === 6) data += '***************************************\n';
    }
    return data;
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

function copyToClipboard() {
    const textArea = document.getElementById('exportText');
    navigator.clipboard.writeText(textArea.value).then(() => {
        const snackbar = document.getElementById("snackbar");
        snackbar.className = "show";
        snackbar.textContent = "内容已复制";
        setTimeout(() => { snackbar.className = snackbar.className.replace("show", ""); }, 2000);
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