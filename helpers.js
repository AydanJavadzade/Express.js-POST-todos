import {readFileSync} from "fs"

const data=readFileSync("./todos.json")

export const todos=JSON.parse(data.toString())