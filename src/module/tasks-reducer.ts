import { v1 } from "uuid";
import { TasksStateProps } from "../App";

export const tasksReducer = (state: TasksStateProps, action: ActionsType) => {
    switch (action.type) {
        case 'DELETE_TASK': {
            return ({...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)})
        }
        case 'CREATE_TASK': {
            const newTask = {id: v1(), title: action.payload.title, isDone: false}
            const newTasks = [newTask, ...state[action.payload.todolistId]]
            return ({...state, [action.payload.todolistId]: newTasks})
        }
        case 'CHANGE_TASK_STATUS' : {
            const newState = state[action.payload.todolistId].map(
                el => el.id === action.payload.taskId ? 
                { ...el, isDone:action.payload.isDone} : 
                el)

            return ({ ...state, [action.payload.todolistId]:newState})
        }
        case 'DELETE_TASKS_FROM_TODOLIST': {
            const newState = { ...state}
            delete newState[action.payload.todolistId]
            return newState
        }    
        case 'UPDATE_TASK_TITLE' : {
            return({ ...state, [action.payload.todolistId]:state[action.payload.todolistId].map(
                el => el.id === action.payload.taskId ? 
                { ...el, title: action.payload.updatedTitle} : 
                el
            )})
        } 
        case "ADD_TASKS_TO_NEW_TODOLIST": {
            return ({ ...state, [action.payload.todolistId]: []})
        } 
    
        default:
            return state
    }
}

type ActionsType =
    | deleteTaskACType
    | createeTaskACType
    | changeTaskStatusACType
    | deleteTasksFromTodolistACType
    | updateTaskTitleACType
    | addTasksToNewTodolistACType

type deleteTaskACType = {
    type: 'DELETE_TASK',
        payload: {
            todolistId: string,
            taskId: string
        }
}

type createeTaskACType = {
    type: 'CREATE_TASK',
        payload: {
            todolistId: string,
            title: string
        }
}

type changeTaskStatusACType = {
        type: 'CHANGE_TASK_STATUS',
        payload: {
            todolistId: string
            taskId: string
            isDone: boolean
        }
} 

type deleteTasksFromTodolistACType = {
        type: 'DELETE_TASKS_FROM_TODOLIST',
        payload: {
            todolistId: string
        }
} 

type updateTaskTitleACType = {
        type: 'UPDATE_TASK_TITLE',
        payload: {
            todolistId: string
            taskId: string
            updatedTitle:string
        }
} 

type addTasksToNewTodolistACType = {
    type: 'ADD_TASKS_TO_NEW_TODOLIST',
    payload: {
        todolistId: string
    }
} 

export const deleteTaskAC = (todolistId: string, taskId:string) => {
    return {
        type: 'DELETE_TASK',
        payload: {
            todolistId,
            taskId
        }
    } as const
}

export const createTaskAC = (todolistId: string, title:string) => {
    return {
        type: 'CREATE_TASK',
        payload: {
            todolistId,
            title
        }
    } as const
}

export const changeTaskStatusAC = (todolistId: string, taskId:string, isDone: boolean) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        payload: {
            todolistId,
            taskId,
            isDone
        }
    } as const
}

export const deleteTasksFromTodolistAC = (todolistId: string) => {
    return {
        type: 'DELETE_TASKS_FROM_TODOLIST',
        payload: {
            todolistId
        }
    } as const
}

export const updateTaskTitleAC = (todolistId: string, taskId:string, updatedTitle:string) => {
    return {
        type: 'UPDATE_TASK_TITLE',
        payload: {
            todolistId,
            taskId,
            updatedTitle
        }
    } as const
}

export const addTasksToNewTodolistAC = (todolistId: string) => {
    return {
        type: 'ADD_TASKS_TO_NEW_TODOLIST',
        payload: {
            todolistId
        }
    } as const
}
