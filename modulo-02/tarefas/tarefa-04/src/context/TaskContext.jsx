import { createContext, useContext, useState } from 'react'
const TaskContext = createContext()
export function TaskProvider({ children }) { const [tasks,setTasks]=useState([]); const addTask=(title)=>{const text=title.trim();if(text)setTasks((items)=>[...items,{id:crypto.randomUUID(),title:text,completed:false}])}; const toggleTask=(id)=>setTasks((items)=>items.map((task)=>task.id===id?{...task,completed:!task.completed}:task)); const removeTask=(id)=>setTasks((items)=>items.filter((task)=>task.id!==id)); return <TaskContext.Provider value={{tasks,addTask,toggleTask,removeTask}}>{children}</TaskContext.Provider> }
export const useTasks=()=>useContext(TaskContext)
