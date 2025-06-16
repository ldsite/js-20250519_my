export default class SortableTable {
  element;
  subElements = {};
  constructor(headersConfig, {
    data = [],
    sorted = {}
  } = {}) {
    this.headersConfig = headersConfig;
    this.data = data;
    this.sorted = sorted;
    this.element = this.createElement(this.createTemplate());
    this.subElements = {
      header: this.element.querySelector('.sortable-table__header'),
      body: this.element.querySelector('.sortable-table__body')
    };

    this.initEventListeners();

    if (this.sorted.id && this.sorted.order) {
      this.sort(this.sorted.id, this.sorted.order);
    }
  }
  createElement(template) {
    const element = document.createElement('div');
    element.innerHTML = template.trim();
    return element.firstElementChild;
  }
  createClassIcon = (item) => item ? 'sortable-table__sort-arrow' : '';
  createElementIcon = (item) => item ? `<span data-element="arrow" class="sortable-table__sort-arrow">
                                        <span class="sort-arrow"></span>
                                      </span>` : "";

  createTemplateHeader() {
    return this.headersConfig.map(item => {
      const order = this.sorted.id === item.id ? this.sorted.order : '';
      return `<div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}" data-order="${order}"><span>${item.title} </span>${this.createElementIcon(item.sortable)}</div>`;
    }).join('');
  }
  createTemplateBody(data = this.data) {
    return data.map(item => {
      const row = this.headersConfig.map(column => {
        let cell;
        if (column.id === 'images') {
          cell = `<img class="sortable-table-image" alt="Image" src="${item.images[0].url}"/>`;
        } else {
          cell = `${item[column.id]}`;
        }
        return `<div class="sortable-table__cell">${cell}</div>`;
      }).join('');
      return `<a href="/products/${item.id}" class="sortable-table__row">${row}</a>`;
    }).join('');
  }
  initEventListeners() {
    this.subElements.header.addEventListener('pointerdown', event => {
      const cell = event.target.closest('.sortable-table__cell');

      if (!cell) return;
      const field = cell.dataset.id;

      const column = this.headersConfig.find(col => col.id === field);
      if (!column || !column.sortable) return;

      const currentOrder = cell.dataset.order;
      const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
      this.sort(field, newOrder);
    });
  }
  createTemplate() {
    return (`<div data-element="productsContainer" class="products-list__container">
            <div class="sortable-table">
              <div data-element="header" class="sortable-table__header sortable-table__row">${this.createTemplateHeader()} </div>
              <div data-element="body" class="sortable-table__body">${this.createTemplateBody()}</div>
            </div></div>
            `);
  }
  sort(field, order) {
    const column = this.headersConfig.find(item => item.id === field);
    if (!column || !column.sortable) return;
    const sortTo = order === 'asc' ? 1 : -1;
    const sortType = column.sortType;
    const sortedData = [...this.data].sort((a, b) => {
      let aVal = a[field],
        bVal = b[field];

      if (sortType === 'string') {
        return sortTo * aVal.localeCompare(bVal, ['ru', 'en'], { caseFirst: 'upper' });
      }

      if (sortType === 'number') {
        return sortTo * (aVal - bVal);
      }

      return 0;
    });
    this.subElements.body.innerHTML = this.createTemplateBody(sortedData);
    this.subElements.header.querySelectorAll('.sortable-table__cell').forEach(th => {
      th.dataset.order = th.dataset.id === field ? order : '';
    });
  }
  remove() {
    if (this.element) {
      this.element.remove();
    }
  }
  destroy() {
    this.remove();
    this.element = null;
    this.subElements = {};
  }
}

