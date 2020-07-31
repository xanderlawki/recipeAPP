 import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = []
    }


    addItem ( amount, unit, name) {
        const items = {
            id: uniqid(),
            amount,
            unit,
            name,
        }

        this.items.push(items);
        return items;
    }

    deleteItem(id) {

        const index = this.items.findIndex(el => el.id === id);
        this.items.splice(index, 1);
    }

    updateCount(id, newAmount) {
        this.items.find(el => el.id === id).amount = newAmount;
    }
}