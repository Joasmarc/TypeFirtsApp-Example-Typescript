"use strict";
// TS
// CASTING debido a que la pripieda value no lo possen todas las etiquetas
const bAdd = document.getElementById("bAdd");
const inputTitle = document.getElementById("title");
const inputCost = document.getElementById("cost");
const inputCurrency = document.getElementById("currency");
const expenses = new Expenses('usd');
// en caso de que sea nulo y ! para segurar de que no sera nulo
//bAdd?.
bAdd.addEventListener("click", e => {
    if (inputTitle.value != '' && inputCost.value != '' && !isNaN(parseFloat(inputCost.value))) {
        const title = inputTitle.value;
        const cost = parseFloat(inputCost.value);
        const currency = inputCurrency.value;
        expenses.add({ title, cost: { number: cost, currency } });
        render();
    }
    else {
        alert('Completa los datos correctamente');
    }
    function render() {
        let html = '';
        expenses.getItems().forEach(item => {
            const { id, title, cost } = item;
            const { number, currency } = cost;
            html += `
                <div class="item">
                    <div><span class="currency">${currency}</span>${number}</div>
                    <div>${title}</div>
                    <div><button class="bEliminar" data-id="${id}">Eliminar</button></div>
                </div>
            `;
        });
        $('#items').innerHTML = html;
        $('#display').textContent = expenses.getTotal();
        $$('.bEliminar').forEach(bEliminar => {
            bEliminar.addEventListener('click', e => {
                const id = e.target.getAttribute('data-id');
                expenses.remove(parseInt(id));
                render();
            });
        });
    }
    function $(selector) {
        return document.querySelector(selector);
    }
    function $$(selector) {
        return document.querySelectorAll(selector);
    }
});
