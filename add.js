
/*  Проект. Дана переменная card - корзина. Добавьте кнопку b-10 и функцию t10, которые сохраняют card в LS.*/

const card = {
    'apple': 3,
    'grape': 2
}

function t10() {
    localStorage.setItem('card', JSON.stringify(card));
}

document.querySelector('.b-10').onclick = () => {
    document.querySelector('.message').remove();
    t10();
    t11();
    document.querySelector('.b-10').remove();
};


/*  Создайте фукнцию t11 которая читает корзину из LS и выводит на страницу в виде таблицы. Формат -  название товара - количество. Функция должна вызываться всегда после перезаписи LS ( в данном случае - просто добавьте ее вызов в нужные функции). */

function t11() {
    let basket = JSON.parse(localStorage.getItem("card"));

    let table = document.createElement('TABLE');
    let tbdy = document.createElement('TBODY');
    document.querySelector('.out-10').appendChild(table);

    let sum = 0;

    for (let key in basket) {
        tbdy.insertRow();

        for (let j = 0; j < 3; j++) {
            let td = tbdy.appendChild(document.createElement('TD'));
            if (j == 0) td.innerHTML = `<spen>${key}</spen>`;
            if (j == 1) t12(key).forEach(button => td.appendChild(button));
            if (j == 2) td.innerHTML = `<spen>${basket[key]}</spen>`;
        }

        sum += basket[key];
    }

    table.appendChild(tbdy);

    t13(sum);
}


/*  Добавьте в таблицу кнопки плюс и минус возле каждого товара. При нажатии кнопки - изменяйте количество товаров в card, обновляйте LS, выводите на страницу. */

function t12(key) {
    let add = document.createElement('BUTTON');
    add.classList.add("button-primary");
    add.innerText = "+";
    add.onclick = () => {
        card[key]++;
        localStorage.clear();
        t10();
        document.querySelector("table").remove();
        t11();
    }

    let del = document.createElement('BUTTON');
    del.classList.add("button-primary");
    del.innerText = "-";
    del.onclick = () => {
        if (card[key] > 0) {
            card[key]--;
            localStorage.clear();
            t10();
            document.querySelector("table").remove();
            t11();
        }
    }

    return [add, del];
}



/*  Добавьте в таблицу footer который считает общее количество товара. */

function t13(sum) {
    let footer = document.querySelector("tbody").appendChild(document.createElement('TR'));

    for (let i = 0; i < 2; i++) {
        let td = footer.appendChild(document.createElement('TD'));
        if (i == 0) {
            td.setAttribute('colspan', '2');
            td.innerHTML = `<spen>SUM</spen>`;
        }
        if (i == 1) td.innerHTML = `<spen>${sum}</spen>`;
    }
}


/*  Добавьте функцию t14, которая при загрузке страницы проверяет наличие card в LS и если есть -выводит его на страницу. Если нет - пишет корзина пуста. */

function t14() {
    if (localStorage.length != 0) {
        t10();
        t11();
        document.querySelector('.b-10').remove();
    } else {
        document.querySelector('.out-10').innerHTML = `<spen class="message">Kорзина пуста</spen>`;
    }
}

t14();