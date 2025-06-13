import {v1} from 'uuid'
import { beforeEach, expect, test } from 'vitest'
import {addTodolistAC, changeTodolisFiltertAC, changeTodolisTitletAC, removeTodolistAC, todolistsReducer} from './todolists-reducer'
import { TodoListProps } from '../App'



let todolistId1: string
let todolistId2: string
let startState: TodoListProps[] = []
    
//-------------------BEFORE EACH---то есть перед каждым тестом стейт будет таковым
beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]
})


//-------------------ТЕСТЫ --------------------
    
test('correct todolist should be deleted', () => {

    
    // 1. Стартовый state //теперь в бефор иче

    // 2. Действие
    
                
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))
    
    // 3. Проверка, что действие измененило state соответствующим образом
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, не любой
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be created', () => {

    const title = 'New todolist'
    const endState = todolistsReducer(startState, addTodolistAC(title))
    
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(title)
})

test('correct todolist should change its title', () => {

    const title = 'New title'
    const endState = todolistsReducer(startState, changeTodolisTitletAC(todolistId2, title))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(title)
    })

    test('correct todolist should change its filter', () => {

        const filter = 'completed'
        const endState = todolistsReducer(startState, changeTodolisFiltertAC(todolistId2, filter))
        
        expect(endState[0].filter).toBe('all')
        expect(endState[1].filter).toBe(filter)
    })