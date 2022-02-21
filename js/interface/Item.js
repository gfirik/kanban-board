import KanbanAPI from "../api/KanbanAPI.js";
import DropZone from "./DropZone.js";

export default class Item {
  constructor(id, title, content) {
    const bottomDropZone = DropZone.createDropZone();
    this.elements = {};
    this.elements.root = Item.createRoot();
    this.elements.input = this.elements.root.querySelector(".item-input");
    this.elements.titleInput = this.elements.root.querySelector(".item-title");
    this.elements.deleteButton =
      this.elements.root.querySelector(".delete-item");
    this.elements.root.dataset.id = id;
    this.elements.input.textContent = content;
    this.content = content;
    this.elements.titleInput.textContent = title;
    this.title = title;
    this.elements.root.appendChild(bottomDropZone);
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
    this.elements.deleteButton.addEventListener("click", () => {
      KanbanAPI.deleteItem(id);
      this.elements.input.removeEventListener("blur", onBlurContent);
      this.elements.titleInput.removeEventListener("blur", onBlurTitle);
      this.elements.root.parentElement.removeChild(this.elements.root);
    });
    this.elements.root.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", id);
    });
    this.elements.input.addEventListener("drop", (event) => {
      event.preventDefault();
    });
    this.elements.titleInput.addEventListener("drop", (event) => {
      event.preventDefault();
    });
  }
  static createRoot() {
    const range = document.createRange();
    range.selectNode(document.body);
    return range.createContextualFragment(`
        <div class="item" draggable="true">
          <div class="item-header">
            <h5 contenteditable class="item-title"></h5>
            <button class="delete-item" type="button"><i class="fa fa-trash"></i></button>
          </div>  
          <div 
            contenteditable 
            class="item-input" 
            placeholder="Task here..."
            oninput="if(this.innerHTML.trim()==='<br>')this.innerHTML=''
          ></div>
          <div class="dropzone"></div>
        </div>
    `).children[0];
  }
}
