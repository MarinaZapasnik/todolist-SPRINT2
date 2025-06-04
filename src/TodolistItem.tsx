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
import Box from '@mui/material/Box';
import { taskListItemElementSx } from './Todolist.styles';

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
    borderColor:'purple',
    mt:'20px'
}

  return (
      <div>
        <EditableSpan 
          oldTitle={title} 
          onClick={updateTodolistTitleHandler}/>
        <AddItemForm addItem={addTaskHandler}/>
        
        {tasks.length === 0 ? (
            <p>Тасок нет</p>
        ) : (
            <List >
              {tasks.map(task => {
                const deleteTaskHandler = () => {
                  deleteTask(task.id, todolistId)
                }

                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                  const newStatusValue = e.currentTarget.checked
                  changeTaskStatus(task.id, newStatusValue, todolistId)
                }

                return (
                  
                      <ListItem 
                        key={task.id} 
                        //передаем task.isDone, которй просим в стилях
                        sx={taskListItemElementSx(task.isDone)}>
                          <Box sx={{display: 'flex'}}>

                            <Checkbox  
                              defaultChecked 
                              color="secondary" 
                              checked={task.isDone}
                              onChange={changeTaskStatusHandler}/>
                          
                          <EditableSpan 
                            oldTitle={task.title} 
                            onClick={(updateTitle) => updateTaskTitleHandler(task.id, updateTitle)}/>
                      
                          </Box>
                      
                      <IconButton aria-label="delete" size="medium" style={{color: 'purple'}} onClick={deleteTaskHandler}>
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                      </ListItem>
                    
                )
              })}
              </List>
            
        )}
        <div>
        <Stack spacing={1} direction="row">
          <Button 
            sx={filter === 'all' ? {background:'purple', borderColor:'purple'} : {}}
            onClick={() => changeFilter('all', todolistId)}
            variant="contained" color="primary">
            All
          </Button>
          <Button 
            sx={filter === 'active' ? {background:'purple', borderColor:'purple'} : {}}
            onClick={() => changeFilter('active', todolistId)}
            variant="contained" color="primary">
            Active
          </Button>
          <Button 
            sx={filter === 'completed' ? {background:'purple', borderColor:'purple'} : {}}
            onClick={() => changeFilter('completed', todolistId)}
            variant="contained" color="primary">
            Completed
          </Button>
        </Stack>


                  <div>
                    
                      <Button 
                        onClick={deleteTodolistHandler} 
                        sx={ButtonStyle} variant="outlined" 
                        startIcon={<DeleteIcon />}
                        >
                          Delete Todolist
                      </Button>
                  </div>
        </div>
      </div>
  )
}
