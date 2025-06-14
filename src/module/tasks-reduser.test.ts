import { v1 } from "uuid"
import { TasksStateProps } from "../App"
import { beforeEach, expect, test } from "vitest"
import { addTasksToNewTodolistAC, changeTaskStatusAC, createTaskAC, deleteTaskAC, deleteTasksFromTodolistAC, tasksReducer, updateTaskTitleAC } from "./tasks-reducer"



let todolistId1: string
let todolistId2: string
let startState: TasksStateProps

beforeEach(() => {
    
    todolistId1 = v1()
    todolistId2 = v1()

    startState = {
        [todolistId1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
        ],
        [todolistId2]: [
            { id: v1(), title: 'Beer', isDone: true },
            { id: v1(), title: 'Cheeps', isDone: true },
            { id: v1(), title: 'Cola', isDone: false },
        ],
    }
})



test('array should be created for new todolist', () => {
    const id = v1()
    const endState = tasksReducer(startState, addTasksToNewTodolistAC(id))
    
    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== todolistId1 && k !== todolistId2)
    if (!newKey) {
        throw Error('New key should be added')
    }
    
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const endState = tasksReducer(startState, deleteTasksFromTodolistAC(todolistId2))
    
    const keys = Object.keys(endState)
    
    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
    // or
    expect(endState['todolistId2']).toBeUndefined()
})

test('correct task should be deleted', () => {

    const deletedTaskId = startState[todolistId2][1].id

    const endState = tasksReducer(
      startState,
      deleteTaskAC(todolistId2, deletedTaskId )
    )
  
    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId2].length).toBe(2)
    expect(endState[todolistId2].find(el => el.id === deletedTaskId)).toBeUndefined()
    
  })

  test('correct task should be created at correct array', () => {
  const endState = tasksReducer(
    startState,
    createTaskAC(todolistId2, 'juice')
  )

  expect(endState[todolistId1].length).toBe(3)
  expect(endState[todolistId2].length).toBe(4)
  expect(endState[todolistId2][0].id).toBeDefined()
  expect(endState[todolistId2].find(el => el.title === 'juice')).toBeDefined()
  const taskBeer = endState[todolistId2].find(el => el.title === 'Beer')
  expect(taskBeer?.isDone).toBe(true)
  const taskJuice = endState[todolistId2].find(el => el.title === 'juice')
  expect(taskJuice?.title).toBe('juice')
  expect(taskJuice?.isDone).toBe(false)
  expect(endState[todolistId2].some(el => el.title === 'Beer')).toBe(true)
})

test('correct task should change its status', () => {
  const currentTaskId = startState[todolistId2][2].id
  const currentTaskisDone = startState[todolistId2][2].isDone

  expect(currentTaskisDone).toBe(false)
  const endState = tasksReducer(
    startState,
    changeTaskStatusAC(todolistId2, currentTaskId, true)
  )
  const changeStatusCurrentTaskIsDone = endState[todolistId2][2].isDone 
  const changeStatusCurrentTaskId = endState[todolistId2][2].id 

  expect(changeStatusCurrentTaskIsDone).toBe(true)
  expect(currentTaskId === changeStatusCurrentTaskId).toBe(true)
})

test('correct task should change its title', () => {
  const currentTaskId1 = startState[todolistId1][1].id
  const currentTaskId2 = startState[todolistId1][2].id
  const currentTaskId3 = startState[todolistId2][0].id

  const endState1 = tasksReducer(startState, updateTaskTitleAC(todolistId1, currentTaskId1, 'The World'))
  const endState2 = tasksReducer(endState1, updateTaskTitleAC(todolistId1, currentTaskId2, ' Is'))
  const endState3 = tasksReducer(endState2, updateTaskTitleAC(todolistId2, currentTaskId3, ' Mine'))

  const updatedTaskTitle1 = endState3[todolistId1][1].title
  const updatedTaskTitle2 = endState3[todolistId1][2].title
  const updatedTaskTitle3 = endState3[todolistId2][0].title
  
  expect(updatedTaskTitle1 + updatedTaskTitle2 + updatedTaskTitle3).toBe('The World Is Mine')
})