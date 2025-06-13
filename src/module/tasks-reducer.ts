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
            
            
    
        default:
            return state
    }
}

type ActionsType =
    | deleteTaskACType
    | createeTaskACType

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