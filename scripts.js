document.getElementById('add-catalog-item').addEventListener('click', function () {
    let catalog = document.getElementById('catalog');
    let newItem = document.createElement('input');
    newItem.type = 'text';
    newItem.placeholder = '输入新的目录项';
    catalog.appendChild(newItem);
});

document.getElementById('reset-all').addEventListener('click', function () {
    if (confirm('确定要重置所有内容吗？')) {
        let inputs = document.querySelectorAll('input');
        inputs.forEach(input => input.value = '');
    }
});
