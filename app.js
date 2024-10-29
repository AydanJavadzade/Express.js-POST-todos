import express from "express"
import cors from 'cors';
import bodyParser from "body-parser";
import { addNewTodo, getAllTodos, getTodoById, getTodoByQuery } from "./services.js"

const app=express()
app.use(cors())
app.use(bodyParser.json())

app.get("/",getAllTodos)
app.get("/todos/:id",getTodoById)
app.get("/todos",getTodoByQuery);
app.post("/",addNewTodo)

app.listen(3004,()=>console.log("http://localhost:3004"))