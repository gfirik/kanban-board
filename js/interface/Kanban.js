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
        title: "백로그",
      },
      {
        id: 2,
        title: "진행중",
      },
      {
        id: 3,
        title: "완료 ",
      },
    ];
  }
}
