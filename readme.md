## Listview webcomponent

![list](https://github.com/madeinouweland/listview-webcomponent/blob/master/list.gif)

### Usage

```
<list-view id="employeesListView"></list-view>

<script type="module">
  const itemsSource = new ItemsSource();
  employeesListView.itemsSource = itemsSource;
  itemsSource.update([
    new Employee("vera", Math.floor(Math.random() * 9999)),
    new Employee("chuck", Math.floor(Math.random() * 9999))
  ]);
</script>
```

This repository shows a webcomponent that renders a listview with UL and LI elements. The code has 4 parts:

### employee.js

A class that holds employee data and has:
- an equals function that can be used to calculate the difference between two lists of employees.
- a compare function to insert items at the correct index

### index.html

The view that instantiates all classes and binds them together.

### itemssource.js

A class that holds a list of unsorted items. It can update the existing list with a new list and will generate the necessary insert and update events through rx observables.

### listview.js

A webcomponent (class that extends HTMLElement) with two properties:
- itemsSource (takes the itemsSource and subscribes to insert and delete observables)
- listItemFactory (function to create LI elements)

The webcomponent attaches to the shadow DOM and creates a UL and some styling for the listview.
Finally the component is registered: `customElements.define('list-view', ListView);`
