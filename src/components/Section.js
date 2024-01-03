import Card from "../components/Card";

class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((cardData) => {
      this._renderer(cardData);
    });
  }

  addItem(element) {
    this._containerSelector.prepend(element);
  }
}

export default Section;
