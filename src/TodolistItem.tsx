import {type ChangeEvent} from 'react'
import type {FilterValues, Task} from './App'
import {Button} from './Button'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'

type Props = {
  todolistId: string
  title: string
  tasks: Task[]
  filter: FilterValues
  deleteTask: (taskId: string, todolistId: string) => void
  changeFilter: (filter: FilterValues, todolistId: string) => void
  createTask: (title: string, todolistId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  deleteTodolist: (todolistId: string) => void
  updateTaskTitle: (todolistId: string, taskId: string, updatedTitle: string) => void
  updateTodolistTitle: (todolistId: string, updatedTitle: string) => void
}

export const TodolistItem = (props: Props) => {
  const {
    todolistId,
    title,
    tasks,
    filter,
    deleteTask,
    changeFilter,
    createTask,
    changeTaskStatus,
    deleteTodolist,
    updateTaskTitle,
    updateTodolistTitle
  } = props

  // const [taskTitle, setTaskTitle] = useState('')
  // const [error, setError] = useState<string | null>(null)

  //Todo: перенести условия
  // let filteredTasks = tasks
  // if (el.filter === 'active') {
  //   filteredTasks = tasks.filter(task => !task.isDone)
  // }
  // if (el.filter === 'completed') {
  //   filteredTasks = tasks.filter(task => task.isDone)
  // }

  // const createTaskHandler = () => {
  //   const trimmedTitle = taskTitle.trim()
  //   if (trimmedTitle !== '') {
  //     createTask(trimmedTitle, todolistId)
  //     setTaskTitle('')
  //   } else {
  //     setError('Title is required')
  //   }
  // }

  // const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //   setTaskTitle(event.currentTarget.value)
  //   setError(null)
  // }

  // const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === 'Enter') {
  //     createTaskHandler()
  //   }
  // }
  
  const deleteTodolistHandler = () => {
    deleteTodolist(todolistId)
  }

  const addTaskHandler = (title:string) => {
    createTask(title, todolistId)
  }

  const updateTodolistTitleHandler = (updatedTitle: string) => {
    updateTodolistTitle(todolistId, updatedTitle)
  }

  const updateTaskTitleHandler = (taskId:string, updateTitle: string) => {
    updateTaskTitle(todolistId, taskId, updateTitle)
  }

  return (
      <div>
        <EditableSpan oldTitle={title} onClick={updateTodolistTitleHandler}/>
        {/* <h3>{title}</h3> */}
        <AddItemForm addItem={addTaskHandler}/>
        {/* <div>
          <input className={error ? 'error' : ''}
                  value={taskTitle}
                  onChange={changeTaskTitleHandler}
                  onKeyDown={createTaskOnEnterHandler}/>
          <Button title={'+'} onClick={createTaskHandler}/>
          {error && <div className={'error-message'}>{error}</div>}
        </div> */}
        {tasks.length === 0 ? (
            <p>Тасок нет</p>
        ) : (
            <ul>
              {tasks.map(task => {
                const deleteTaskHandler = () => {
                  deleteTask(task.id, todolistId)
                }

                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                  const newStatusValue = e.currentTarget.checked
                  changeTaskStatus(task.id, newStatusValue, todolistId)
                }

              

                return (
                    <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                      <input type="checkbox" checked={task.isDone}
                              onChange={changeTaskStatusHandler}/>
                      {/* <span>{task.title}</span> */}
                      <EditableSpan oldTitle={task.title} onClick={(updateTitle) => updateTaskTitleHandler(task.id, updateTitle)}/>
                      <Button title={'x'} onClick={deleteTaskHandler}/>
                    </li>
                )
              })}
            </ul>
        )}
        <div>
          <Button className={filter === 'all' ? 'active-filter' : ''}
                  title={'All'}
                  onClick={() => changeFilter('all', todolistId)}/>
          <Button className={filter === 'active' ? 'active-filter' : ''}
                  title={'Active'}
                  onClick={() => changeFilter('active', todolistId)}/>
          <Button className={filter === 'completed' ? 'active-filter' : ''}
                  title={'Completed'}
                  onClick={() => changeFilter('completed', todolistId)}/>
                  <div>
                    <Button 
                      title={'Delete TodoList'} 
                      onClick={deleteTodolistHandler}/>
                  </div>
        </div>
      </div>
  )
}
