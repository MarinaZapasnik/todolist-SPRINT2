
import { FilterValues, TodoListProps } from "../App"

// const todolistId_1 = v1()
// const todolistId_2 = v1()

// const initialState: TodoListProps[] = [
//     { id: todolistId_1, title: 'What to learn', filter: 'all'},
//     { id: todolistId_2, title: 'What to buy', filter: 'all'},
// ]

//reducer это обычная функция, которая принимает state и action 
//поэтому пише с маленькой буквы
// расширение ts так как это чистый js без верстки
//обязательно пишем тип у функции, "прикрываем спину"
// МОЗГ АРМИИ - REDUCER, поэтому все функции управления стейтом переедут в reducer 


export const todolistsReducer = (state: TodoListProps[], action:ActionsType): TodoListProps[] => {
    //сюда будем закидывать все функции для стейта
    // можно if ами ,но конструкция swith тут более лаконична
    // action это объект с обязательным ключом type

    switch(action.type) {
        case 'REMOVE-TODOLIST' : {

            // setTodolists(todolists.filter(todo => todo.id !== todolistId))
            // delete tasks[todolistId]
            // setTasks({...tasks})

            return state.filter(el => el.id !== action.payload.id) // логика дoaction.payload.idобавления тудулиста
        }

        case 'ADD-TODOLIST' : {
            
            const newTodolist: TodoListProps = {id: action.payload.id, title: action.payload.title, filter: 'all'}
            return [ ...state, newTodolist]
        }

        case 'CHANGE-TODOLIST-TITLE': {

            return state.map(el => el.id === action.payload.id ? { ...el, title:action.payload.title} : el)
        }

        case 'CHANGE-TODOLIST-FILTER': {

            return state.map(el => el.id === action.payload.id ? { ...el, filter:action.payload.filter} : el)
        }
        
        // редьюсер работает с нашим стейтом, внутри у него есть кейсы
        // а в кейсах функции управления стейтом
        //сколько функций, столько кейсов

        default: 
            return state //throw new Error("I DON'T UNDERSTAND THIS TYPE") //всегда должен присутствовать default в TS 
    }
}





// редьюсер должен быть полностью независисмым и инкапсулированным
// внутри не происходит никаких сайт эффектов(это запросы на сервер работа с стораджем)
// здесь просто логика
// не должно быть никаких запросов влияющих на работу редьюсера
// каждый редьюсер должен быть прикрыт тестами
// документация по тестам jestjs.io/ru/docs/except


// ***пример того как выглядит объект action ***
// const action = {
//     type: 'todos/todoAdded',
//     payload: {
//         id: '1eb42cac-f809-4c16-b6b0-f3c6169d83b0'
//     },
// }




// ВОПРОС где нам брать этот action, если он у нас прописан только в тестах???
//поэтому нам его нужно из тестов перенести сюда
//чтобы вся эта бадяга была фунекциональной и без тестов
//нужно завернуть объект action в функцию
//на action - ах никто не пишет сейчас, потому что они не гибкие
//пишут при помощи ActionCreator 
// это функция которая формирует/возращает наш объект типа action 
// Action Creator - это как инструкция, что делать



export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
        payload: {
            id: string
            title: string
        }
}


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        id: string
    }
}


export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        id: string
        title: string
    }
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        id: string
        filter: FilterValues
    }
}


type ActionsType = 
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const removeTodolistAC = (id: string) => {
    return { 
        type: 'REMOVE-TODOLIST' ,
        payload: {
            id: id,
        
        },
    } as const //!!!*** as const - это как лекарство, потому что TS думает что type - это string
                    // а у нас он теперь литеральный!!!!!*****
}

export const addTodolistAC = (id: string, title: string) => {
    return  {
        type: 'ADD-TODOLIST',
        payload: {
            id: id,
            title: title,
        },
    } as const 
}

export const changeTodolisTitletAC = (id: string, title: string) => {
    return  {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id: id,
            title: title,
        },
    } as const 
}

export const changeTodolisFiltertAC = (id: string, filter:FilterValues) => {
    return  {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id: id,
            filter: filter,
        },
    } as const

}

