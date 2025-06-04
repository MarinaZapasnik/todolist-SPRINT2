import './App.css'
import {useState} from 'react'
import {v1} from 'uuid'
import {TodolistItem} from './TodolistItem'
import { AddItemForm } from './AddItemForm'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import ButtonAppBar from './ButtonAppBar';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline  from '@mui/material/CssBaseline'

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type TodoListProps = {
  id: string
  title: string
  filter: FilterValues
}

export type TasksStateProps = {
  [todolistId: string]: Task[]
}

export type FilterValues = 'all' | 'active' | 'completed'

type ThemeMode = 'dark' | 'light'

export const App = () => {
  
  //создаем переменные с id для тудулистов,, которые также используем для тасок
  const todolistId_1 = v1()
  const todolistId_2 = v1()

  //туду листы и таски разложили по разным структурам для простоты, избегаем большой вложенности

  // общие оболочки тудулистов
  //отдельный юз стейт для фильтра нам уже не нужен, так как есть в этом юз стейте
  const [todolists, setTodolists] = useState<TodoListProps[]>( [
    { id: todolistId_1, title: 'What to learn', filter: 'all'},
    { id: todolistId_2, title: 'What to buy', filter: 'all'},
  ])


  // таски для каждого из тудулистов привязанные по id 
  //таким образом избегаеи большой вложенности
  const [tasks, setTasks] = useState<TasksStateProps>({
    [todolistId_1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todolistId_2]: [
      { id: v1(), title: 'Beer', isDone: true },
      { id: v1(), title: 'Cheeps', isDone: true },
      { id: v1(), title: 'Cola', isDone: false },
    ],
  })


  //в функциях теперь везде в качестве параметра нужно добавить todolistId: string
  //чтобы понимать для какого туду листа применять

  const deleteTask = (taskId: string, todolistId: string) => {
    
    setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
  }

  const createTask = (title: string, todolistId: string) => {
    const newTask = {id: v1(), title, isDone: false}
    const newTasks = [newTask, ...tasks[todolistId]]
    setTasks({...tasks, [todolistId]: newTasks})
  }

  const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    const newState = tasks[todolistId].map(task => task.id === taskId ? { ...task, isDone } : task)
    setTasks({ ...tasks, [todolistId]: newState})
  }

  const changeFilter = (filter: FilterValues, todolistId: string) => {
    const newState = todolists.map(todo => todo.id === todolistId ? { ...todo, filter} : todo)
    setTodolists(newState)
  }

  const deleteTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(todo => todo.id !== todolistId))
  }

  const updateTaskTitle = (todolistId: string, taskId: string, updatedTitle: string) => {
    setTasks({ ...tasks, [todolistId]:tasks[todolistId].map(task => task.id === taskId ? { ...task, title:updatedTitle}: task)})
  }

  const updateTodolistTitle = (todolistId: string, updatedTitle: string) => {
    setTodolists(todolists.map(todo => todo.id === todolistId ? { ...todo, title:updatedTitle} : todo))
  }

  const todolistComponents = todolists.map(todo => {
  
    let filteredTasks = tasks[todo.id]
    if (todo.filter === 'active') {
      filteredTasks = filteredTasks.filter(t => !t.isDone)
    }
    if (todo.filter === 'completed') {
      filteredTasks = filteredTasks.filter(t => t.isDone)
    }

    return (
      <Grid>
        <Item sx={{p: '30px'}}>
          <Paper elevation={8} sx={{p: '10px'}}>
          
            <TodolistItem 
              key={todo.id}
              todolistId={todo.id}
              title={todo.title}
              filter={todo.filter}
              tasks={filteredTasks}
              deleteTask={deleteTask}
              changeFilter={changeFilter}
              createTask={createTask}
              changeTaskStatus={changeTaskStatus}
              deleteTodolist={deleteTodolist}
              updateTaskTitle={updateTaskTitle}
              updateTodolistTitle={updateTodolistTitle}
            />    

          </Paper>
        </Item>
      </Grid>
          
    )
  })

  const addTdodlist = (title:string) => {
    const newTododList: TodoListProps = {id: v1(), title, filter: 'all'}
    setTodolists([ ...todolists, newTododList])
    setTasks({ ...tasks,[newTododList.id]:[]})
  }

  
  const [themeMode, setThemeMode] = useState<ThemeMode>('light')
  const theme = createTheme({
    palette: {
      mode: themeMode === 'light' ? 'light' : 'dark',
      primary: {
        main: '#a40837',
      },
    },
  })

  const changeModeHandler = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light')
  }

  return (

      <div className="app">
        <ThemeProvider theme={theme}>
          <CssBaseline/>
            <Container fixed>

            <ButtonAppBar onChange={changeModeHandler}/>

            <Grid container>
              <AddItemForm addItem={addTdodlist}/> 
            </Grid>

            <Grid container>
              {todolistComponents}
            </Grid>
            
          </Container>
            
        </ThemeProvider>
      </div>
  )
}
