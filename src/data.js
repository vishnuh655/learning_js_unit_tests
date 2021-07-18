const _ = require("lodash");

/** Todos List*/
const todoList = [
  {
    id: 1,
    title: "Coding in Javascript",
    description: "Working with functions in JavaScript",
    completed: false,
  },
  {
    id: 2,
    title: "Cooking Supper",
    description: "Preparing rice and chicken",
    completed: false,
  },
  {
    id: 3,
    title: "Taking a walk",
    description: "Easy time at the park",
    completed: false,
  },
  {
    id: 4,
    title: "Watching Netflix",
    description: "Enjoying the new premiered series",
    completed: false,
  },
];

module.exports = {
  /**
   * returns all todo item objects
   * @returns array Todo
   */
  findAll: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return todoList;
  },

  /**
   * find todo object by id
   * @param {*} id
   * @returns Object todo
   */
  findById: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const todo = _.find(todoList, function (item) {
      return item.id == id;
    });
    return todo;
  },

  /**
   * create todo object and returns the created object
   * @param {*} todo
   * @returns Object todo
   */
  create: async (todo) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    let newTodo = {
      id: Math.floor(4 + Math.random() * 10),
      ...todo,
    };
    return newTodo;
  },

  /**
   * update todo object by id
   * @param {*} todo
   * @param {*} id
   * @returns Object todo
   */
  update: async (todo, id) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const existingTodo = _.find(todoList, function (item) {
      return item.id == id;
    });
    if (existingTodo) {
      return {
        id: id,
        ...todo,
      };
    } else {
      throw Error("Item with id not found");
    }
  },

  /**
   * delete todo object
   * @param {*} id
   * @returns Object status
   */
  delete: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const todo = _.find(todoList, function (item) {
      return item.id == id;
    });
    if (todo) {
      return {
        message: "Todo item deleted",
      };
    } else {
      throw Error("Item with id not found");
    }
  },

  todoList: todoList,
};
