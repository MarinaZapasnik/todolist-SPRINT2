import { v1 } from "uuid"
import { TasksStateProps } from "../App"
import { beforeEach, expect, test } from "vitest"
import { addTasksToNewTodolistAC, deleteTaskAC, deleteTasksFromTodolistAC, tasksReducer } from "./tasks-reducer"



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
    const endState = tasksReducer(
      startState,
      deleteTaskAC({ todolistId: todolistId2, taskId: '2' })
    )
   
    expect(endState).toEqual({
      todolistId1: [
        { id: '1', title: 'CSS', isDone: false },
        { id: '2', title: 'JS', isDone: true },
        { id: '3', title: 'React', isDone: false },
      ],
      todolistId2: [
        { id: '1', title: 'bread', isDone: false },
        { id: '3', title: 'tea', isDone: false },
      ],
    })
  })