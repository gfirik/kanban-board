import KanbanAPI from "../api/KanbanAPI.js";

export default class Item {
  constructor(id, title, content) {
    this.elements = {};
    this.elements.root = Item.createRoot();
    this.elements.input = this.elements.root.querySelector(".item-input");
    this.elements.titleInput = this.elements.root.querySelector(".item-title");
    this.elements.root.dataset.id = id;
    this.elements.input.textContent = content;
    this.content = content;
    this.elements.titleInput.textContent = title;
    this.title = title;

    const onBlurTitle = () => {
      const newTitle = this.elements.titleInput.textContent.trim();
      if (newTitle == this.title) {
        return;
      }
      this.title = newTitle;
      KanbanAPI.updateItem(id, {
        title: this.title,
      });
    };
    const onBlurContent = () => {
      const newContent = this.elements.input.textContent.trim();
      if (newContent == this.content) {
        return;
      }
      this.content = newContent;
      KanbanAPI.updateItem(id, {
        content: this.content,
      });
    };
    this.elements.input.addEventListener("blur", onBlurContent);
    this.elements.titleInput.addEventListener("blur", onBlurTitle);
    this.elements.root.addEventListener("dblclick", () => {
      const check = confirm("Delete Item?");
      if (check) {
        KanbanAPI.deleteItem(id);
        this.elements.input.removeEventListener("blur", onBlurContent);
        this.elements.titleInput.removeEventListener("blur", onBlurTitle);
        this.elements.root.parentElement.removeChild(this.elements.root);
      }
    });
  }
  static createRoot() {
    const range = document.createRange();
    range.selectNode(document.body);
    return range.createContextualFragment(`
        <div class="item" draggable="true">
            <h5 contenteditable class="item-title"></h5>
            <div contenteditable class="item-input">Do something useful!</div>
            <div class="dropzone"></div>
        </div>
    `).children[0];
  }
}
