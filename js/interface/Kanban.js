import Column from "./Column.js";

export default class Kanban {
  constructor(root) {
    this.root = root;
    Kanban.columns().forEach((column) => {
      const columnInterface = new Column(column.id, column.title);
      this.root.appendChild(columnInterface.elements.root);
    });
  }
  static columns() {
    return [
      {
        id: 1,
        title: "Not started",
      },
      {
        id: 2,
        title: "In progress",
      },
      {
        id: 3,
        title: "Completed",
      },
    ];
  }
}
