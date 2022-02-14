import KanbanAPI from "../api/KanbanAPI.js";
import Item from "./Item.js";
import DropZone from "./DropZone.js";
export default class Column {
  constructor(id, title) {
    const topDropZone = DropZone.createDropZone();
    this.elements = {};
    this.elements.root = Column.createColumn();
    this.elements.title = this.elements.root.querySelector(".column-title");
    this.elements.items = this.elements.root.querySelector(".items");
    this.elements.addItem = this.elements.root.querySelector(".add-item");
    this.elements.root.dataset.id = id;
    this.elements.title.textContent = title;

    this.elements.items.appendChild(topDropZone);
    this.elements.addItem.addEventListener("click", () => {
      const newItem = KanbanAPI.addItem(id, "제목", "내용");
      this.renderItem(newItem);
    });
    KanbanAPI.getItems(id).forEach((item) => {
      this.renderItem(item);
    });
  }
  static createColumn() {
    const range = document.createRange();
    range.selectNode(document.body);
    return range.createContextualFragment(`
        <section class="column">
            <h2 class="column-title"></h2>
            <div class="items"></div>
            <button class="add-item" type="button">새 카드 만들기</button>
        </section>
    `).children[0];
  }
  renderItem(data) {
    const item = new Item(data.id, data.title, data.content);
    this.elements.items.appendChild(item.elements.root);
  }
}
