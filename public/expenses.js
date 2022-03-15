"use strict";
class ArrayList {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item);
    }
    get(index) {
        const item = this.items.filter((x, i) => {
            return i === index;
        });
        if (item.length === 0) {
            return null;
        }
        else {
            return item[0];
        }
    }
    createFrom(value) {
        this.items = [...value];
    }
    getAll() {
        return this.items;
    }
}
class Expenses {
    constructor(currency) {
        this.count = 0;
        this.expenses = new ArrayList();
        this.FinalCurrency = currency;
    }
    add(item) {
        item.id = this.count;
        this.count++;
        this.expenses.add(item);
        return true;
    }
    get(index) {
        return this.expenses.get(index);
    }
    getItems() {
        return this.expenses.getAll();
    }
    getTotal() {
        const total = this.getItems().reduce((acc, item) => {
            return acc += this.convertCurrency(item, this.FinalCurrency);
        }, 0);
        return `${this.FinalCurrency} $${total.toFixed(2).toString()}`;
    }
    remove(id) {
        const items = this.getItems().filter(item => {
            return item.id != id;
        });
        this.expenses.createFrom(items);
        return true;
    }
    convertCurrency(item, currency) {
        switch (item.cost.currency) {
            case 'usd':
                switch (currency) {
                    case 'ves':
                        return item.cost.number * 5;
                        break;
                    default:
                        return item.cost.number;
                        break;
                }
                break;
            case 'ves':
                switch (currency) {
                    case 'usd':
                        return item.cost.number / 5;
                        break;
                    default:
                        return item.cost.number;
                        break;
                }
                break;
            default:
                return 0;
                break;
        }
    }
}
