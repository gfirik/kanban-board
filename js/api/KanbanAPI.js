export default class KanbanAPI {
  static getItems(columnId) {
    const column = read().find((column) => column.id == columnId);
    if (!column) {
      return [];
    }
    return column.items;
  }
  static addItem(columnId, title, content) {
    const data = read();
    const column = data.find((column) => column.id == columnId);
    const item = {
      id: generateId(),
      title,
      content,
    };

    if (!column) {
      throw new Error("Column not found");
    }
    column.items.push(item);
    save(data);

    return item;
  }
  static updateItem(itemId, newProps) {
    const data = read();
    const [item, currentColumn] = (() => {})();
  }
}
function generateId() {
  return Math.floor(Math.random() * 100000);
}
function read() {
  const json = localStorage.getItem("kanbanData");
  if (!json) {
    return [
      {
        id: 1,
        title: "",
        items: [],
      },
      {
        id: 2,
        title: "",
        items: [],
      },
      {
        id: 3,
        title: "",
        items: [],
      },
    ];
  }
  return JSON.parse(json);
}
function save(data) {
  localStorage.setItem("kanbanData", JSON.stringify(data));
}
