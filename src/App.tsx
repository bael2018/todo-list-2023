import { InsertRow } from "./components/InsertRow";
import { TodoList } from "./components/TodoList";
import { TodoContext } from "./context/context";
import {  FC, useEffect, useState } from "react";
import { ITodo } from "./types/types";
import { Space } from "antd";

const App: FC = () => {
  const [selectedData, setSelectedData] = useState<ITodo[]>([])
  const [data, setData] = useState<ITodo[]>([])
  const [mode, setMode] = useState<boolean>(false)

  const saveTodo = (todo: ITodo) => {
    setData([...data, todo])
    localStorage.setItem('todos', JSON.stringify([...data, todo]))
  }
  
  const removeTodos = (todos: ITodo[]) => {
    setData((prev) => prev.filter(itemA => !todos.some(itemB => +itemA.key === +itemB)))
    localStorage.setItem('todos', JSON.stringify(data.filter(itemA => !todos.some(itemB => +itemA.key === +itemB))))
  }

  const saveSelectedTodos = (items: ITodo[]) => {
    setSelectedData(items)
  }

  const changeMode = () => {
    setMode((prev) => !prev)
  }

  useEffect(() => {
    if(!window.localStorage.getItem('todos')){
      localStorage.setItem('todos', '[]')
    }else{
      setData(JSON.parse(localStorage.getItem('todos') as string))
    }
  }, [])

  return (
    <TodoContext.Provider value={{ data, removeTodos, saveTodo, saveSelectedTodos, changeMode, mode, selectedData }}>
      <Space align='start' className={`root ${mode ? 'dark-mode' : ''}`}>
        <InsertRow />  
        <TodoList />
      </Space>
    </TodoContext.Provider>
  );
}

export { App };
