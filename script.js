function addRow() {
    // Получаем значения из полей
    const rate1 = parseFloat(document.getElementById('rate1').value);
    const rate2 = parseFloat(document.getElementById('rate2').value);
    const amount = parseFloat(document.getElementById('amount').value);

    // Рассчитываем значения
    const result1 = (amount / rate1).toFixed(2);
    const result2 = (amount / rate2).toFixed(2);
    const difference = (result2 - result1).toFixed(2);

    // Добавляем строку в таблицу
    const tableBody = document.getElementById('resultTable');
    const newRow = tableBody.insertRow();

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4); // Для кнопки удаления

    // Заполняем ячейки
    cell1.textContent = amount;
    cell2.textContent = result1;
    cell3.textContent = result2;
    cell4.textContent = difference;

    // Добавляем кнопку "Удалить"
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.style.backgroundColor = '#f44336'; // Красный фон
    deleteButton.style.color = '#fff'; // Белый текст
    deleteButton.style.border = 'none';
    deleteButton.style.padding = '5px 10px';
    deleteButton.style.cursor = 'pointer';

    // Обработчик клика для удаления строки
    deleteButton.onclick = function () {
        tableBody.removeChild(newRow); // Удаляем строку
        updateTotals(); // Пересчитываем итоги
    };

    cell5.appendChild(deleteButton);

    // Очищаем поле для ввода суммы
    document.getElementById('amount').value = '';

    // Обновляем итоги
    updateTotals();
}

function updateTotals() {
    const tableBody = document.getElementById('resultTable');
    const rows = tableBody.rows;

    let totalAmount = 0;
    let totalResult1 = 0;
    let totalResult2 = 0;
    let totalDifference = 0;

    // Итоги по всем строкам
    for (let i = 0; i < rows.length; i++) {
        totalAmount += parseFloat(rows[i].cells[0].textContent);
        totalResult1 += parseFloat(rows[i].cells[1].textContent);
        totalResult2 += parseFloat(rows[i].cells[2].textContent);
        totalDifference += parseFloat(rows[i].cells[3].textContent);
    }

    // Добавляем или обновляем строку с итогами
    let totalsRow = document.getElementById('totalsRow');
    if (!totalsRow) {
        totalsRow = tableBody.insertRow();
        totalsRow.id = 'totalsRow';

        const totalCell1 = totalsRow.insertCell(0);
        const totalCell2 = totalsRow.insertCell(1);
        const totalCell3 = totalsRow.insertCell(2);
        const totalCell4 = totalsRow.insertCell(3);

        totalCell1.id = 'totalAmount';
        totalCell2.id = 'totalResult1';
        totalCell3.id = 'totalResult2';
        totalCell4.id = 'totalDifference';

        totalsRow.style.fontWeight = 'bold';
        totalsRow.style.backgroundColor = '#f2f2f2';
        totalsRow.textContent = "Итоги:";
    }

    // Обновляем значения в строке итогов
    document.getElementById('totalAmount').textContent = totalAmount.toFixed(2);
    document.getElementById('totalResult1').textContent = totalResult1.toFixed(2);
    document.getElementById('totalResult2').textContent = totalResult2.toFixed(2);
    document.getElementById('totalDifference').textContent = totalDifference.toFixed(2);
}