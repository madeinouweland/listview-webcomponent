class ListView extends HTMLElement {
  connectedCallback() {
    this.shadow = this.attachShadow({mode: 'open'});
    this.items = []; // ordered items
    this.createStyle();
    this.createControl();
  }

  set itemsSource(value) {
    value.delete.subscribe(x => this.delete(x));
    value.insert.subscribe(x => this.insert(x));
  }

  set listItemFactory(value) {
    this.setAttribute('listItemFactory', value);
    this._listItemFactory = value;
  }

  insert(item) {
    let index = binarySearch(this.items, item);
    this.items.splice(index, 0, item);

    const li = document.createElement('li');
    li.innerHTML = item.name;
    this.ul.insertBefore(this._listItemFactory(item), this.ul.childNodes[index]);
  }

  delete(item) {
    let index = binarySearch(this.items, item);
    this.items = this.items.filter(x => !x.equals(item));
    this.ul.removeChild(this.ul.childNodes[index]);
  }

  createControl() {
    this.ul = document.createElement('ul');
    this.shadow.appendChild(this.ul);
  }

  createStyle() {
    const style = document.createElement('style');
    style.textContent =
      "ul { border: 1px solid #999; }" +
      "li { list-style: none; font-size: 20px; }";
    this.shadow.appendChild(style);
  }
}

customElements.define('list-view', ListView);

// binary search function based on https://stackoverflow.com/questions/12369824/javascript-binary-search-insertion-preformance
function binarySearch(list, item) {
  let l = 0;
  let h = list.length - 1;
  let m;
  let comparison;

  while (l <= h) {
    m = (l + h) >>> 1;
    comparison = list[m].compare(item);
    if (comparison < 0) {
      l = m + 1;
    } else if (comparison > 0) {
      h = m - 1;
    } else {
      return m;
    }
  }
  return l;
}
