import {type ChangeEvent} from 'react'
import type {FilterValues, Task} from './App'
//import {Button} from './Button'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

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

  const ButtonStyle = {
    color: 'white',
    background: 'purple',
    borderColor:'purple'
}

  return (
      <div>
        <EditableSpan oldTitle={title} onClick={updateTodolistTitleHandler}/>
        
        <AddItemForm addItem={addTaskHandler}/>
        
        {tasks.length === 0 ? (
            <p>Тасок нет</p>
        ) : (
            //<ul>
            <List>
              {tasks.map(task => {
                const deleteTaskHandler = () => {
                  deleteTask(task.id, todolistId)
                }

                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                  const newStatusValue = e.currentTarget.checked
                  changeTaskStatus(task.id, newStatusValue, todolistId)
                }

                
                return (
                    // <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                      <ListItem key={task.id} className={task.isDone ? 'is-done' : ''}>
                      <Checkbox  
                        defaultChecked 
                        color="secondary" 
                        checked={task.isDone}
                        onChange={changeTaskStatusHandler}/>
                      {/* <input type="checkbox" checked={task.isDone}
                              onChange={changeTaskStatusHandler}/> */}
                      {/* <span>{task.title}</span> */}
                      <EditableSpan oldTitle={task.title} onClick={(updateTitle) => updateTaskTitleHandler(task.id, updateTitle)}/>
                      {/* <Button title={'x'} onClick={deleteTaskHandler}/> */}
                      <IconButton aria-label="delete" size="medium" style={{color: 'purple'}} onClick={deleteTaskHandler}>
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                      </ListItem>
                    // </li> 
                )
              })}
              </List>
            // </ul>
        )}
        <div>
        <Stack spacing={1} direction="row">
          <Button 
            style={filter === 'all' ? {background:'purple', borderColor:'purple'} : {}}
            onClick={() => changeFilter('all', todolistId)}
            variant="contained" color="primary">
            All
          </Button>
          <Button 
            style={filter === 'active' ? {background:'purple', borderColor:'purple'} : {}}
            onClick={() => changeFilter('active', todolistId)}
            variant="contained" color="primary">
            Active
          </Button>
          <Button 
            style={filter === 'completed' ? {background:'purple', borderColor:'purple'} : {}}
            onClick={() => changeFilter('completed', todolistId)}
            variant="contained" color="primary">
            Completed
          </Button>
        </Stack>

{/* 
          <Button className={filter === 'all' ? 'active-filter' : ''}
                  title={'All'}
                  onClick={() => changeFilter('all', todolistId)}/>
          <Button className={filter === 'active' ? 'active-filter' : ''}
                  title={'Active'}
                  onClick={() => changeFilter('active', todolistId)}/>
          <Button className={filter === 'completed' ? 'active-filter' : ''}
                  title={'Completed'}
                  onClick={() => changeFilter('completed', todolistId)}/> */}

                  <div>
                    {/* <Button 
                      title={'Delete TodoList'} 
                      onClick={deleteTodolistHandler}/> */}
                      <Button onClick={deleteTodolistHandler} style={ButtonStyle} variant="outlined" startIcon={<DeleteIcon />}>
                          Delete Todolist
                      </Button>
                  </div>
        </div>
      </div>
  )
}
