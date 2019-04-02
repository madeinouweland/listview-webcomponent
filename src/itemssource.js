import rxjs from 'https://dev.jspm.io/rxjs@6';

export class ItemsSource {
  constructor() {
    this.items = [];
    this.insert = new rxjs.Subject();
    this.delete = new rxjs.Subject();
  }

  // update itemsSource with new list. The difference will be calculated.
  // insert and delete rx events are emitted
  update(items) {
    let diff = diffItems(this.items, items);
    this.items = items;
    diff[1].forEach(x => this.delete.next(x));
    diff[0].forEach(x => this.insert.next(x));
  }

  add(item) {
    this.update(this.items.concat([item]));
  }
}

function diffItems(oldItems, newItems) {
  let inserts = newItems.filter(x => !oldItems.some(y => x === y));
  let deletes = oldItems.filter(x => !newItems.some(y => x === y));
  return [inserts, deletes];
}
