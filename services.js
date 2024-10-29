import { v4 } from "uuid";
import { todos } from "./helpers.js";
import { writeFileSync } from "fs";

export const getAllTodos = (req, res) => {
    res.status(200).send(todos);
};

export const getTodoById = (req, res) => {
    const findedTodo = todos.find((todo) => todo.id == req.params.id);
    if (findedTodo) {
        res.status(200).send(findedTodo);
    } else {
        res.status(404).send({ message: "Bele todo yoxdu" });
    }
};

export const getTodoByQuery = (req, res) => {
    if (req.query.title) {
        const todo = todos.find((t) => t.title.toUpperCase() === req.query.title.toUpperCase())
        if (todo) {
            res.status(200).send(todo)
        } else {
            res.status(404).send("not found")
        };
    } else {
        res.status(200).send(todos)
    }


}

export const addNewTodo = (req, res) => {
    if (req.body.title?.trim() && req.body.description?.trim()) {
        const existingTodo = todos.find((todo) => todo.title === req.body.title);

        if (existingTodo) {
            existingTodo.description = req.body.description;
            writeFileSync("./todos.json", JSON.stringify(todos));
            res.status(200).send({ message: "Yeni todo nun aciqlamasi deyisdi" });
        } else {
            req.body.id = v4();
            todos.unshift(req.body);
            writeFileSync("./todos.json", JSON.stringify(todos));
            res.status(201).send({ message: "Yeni todo elave olundu" });
        }
    } else {
        res.status(400).send({ message: "Todo melumatlari duzgun deyil" });
    }
};

