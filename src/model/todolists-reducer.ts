import { v1 } from "uuid"
import { TodoListProps } from "../App"

const todolistId_1 = v1()
const todolistId_2 = v1()




const initialState: TodoListProps[] = [
    { id: todolistId_1, title: 'What to learn', filter: 'all'},
    { id: todolistId_2, title: 'What to buy', filter: 'all'},
]

//reducer это обычная функция, которая принимает state и action 
//поэтому пише с маленькой буквы
// расширение ts так как это чистый js без верстки
//обязательно пишем тип у функции, "прикрываем спину"
// МОЗГ АРМИИ - REDUCER, поэтому все функции управления стейтом переедут в reducer 

export const todolistReducer = (state = initialState, action:any): TodoListProps[] => {
    //сюда будем закидывать все функции для стейта
    // можно if ами ,но конструкция swith тут более лаконична
    // action это объект с обязательным ключом type
    //

    switch(action.type) {
        case 'XXX' : {
            return state
        }

        // редьюсер работает с нашим стейтом, внутри у него есть кейсы
        // а в кейсах функции управления стейтом
        //сколько функций, столько кейсов
        default: return state //всегда должен быть default в TS 
    }
}