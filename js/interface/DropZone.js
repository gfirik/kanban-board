import KanbanAPI from "../api/KanbanAPI.js";

export default class DropZone {
  static createDropZone() {
    const range = document.createRange();
    range.selectNode(document.body);
    const dropZone = range.createContextualFragment(`
        <div class="dropzone"></div>
    `).children[0];

    dropZone.addEventListener("dragover", (event) => {
      event.preventDefault();
      dropZone.classList.add("dropzone-active");
    });
    dropZone.addEventListener("dragleave", (event) => {
      event.preventDefault();
      dropZone.classList.remove("dropzone-active");
    });
    dropZone.addEventListener("drop", (event) => {
      event.preventDefault();
      dropZone.classList.remove("dropzone-active");
      const columnElement = dropZone.closest(".column");
      const columnId = Number(columnElement.dataset.id);
      const dropZoneInColumn = Array.from(
        columnElement.querySelectorAll(".dropzone")
      );
      const index = dropZoneInColumn.indexOf(dropZone);
      const itemId = Number(event.dataTransfer.getData("text/plain"));
      const droppedItem = document.querySelector(`[data-id="${itemId}"]`);
      const addAfter = dropZone.parentElement.classList.contains("item")
        ? dropZone.parentElement
        : dropZone;
      if (droppedItem.contains(dropZone)) {
        return;
      }
      addAfter.after(droppedItem);
      KanbanAPI.updateItem(itemId, {
        columnId,
        position: index,
      });
    });

    return dropZone;
  }
}
