import { ChangeEvent, KeyboardEvent, useState } from "react"
import './App.css'
//import { Button } from "./Button"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type Props = {
    addItem: (title: string) => void
    
}

export const AddItemForm = ({addItem}: Props) => {

    const [itemTitle, setItemTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        const trimmedTitle = itemTitle.trim()
        if (trimmedTitle !== '') {
            addItem(trimmedTitle)
            setItemTitle('')
            } else {
            setError('Title is required')
            }
        }
    
        const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
            setItemTitle(event.currentTarget.value)
            setError(null)
        }

        const addItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
                addItemHandler()
                }
            }

        const ButtonStyle = {
            maxWidth: '38px',
            maxHeight: '38px',
            minWidth: '38px',
            minHeight: '38px',
            background: 'purple'
        }    

    return (
        <div>
            <TextField 
                error={!!error}
                id="outlined-basic" 
                label={ error ? error : 'enter the caption'} 
                className={ error ? 'error' : ''}
                variant="outlined" 
                size="small"
                value={itemTitle}
                onChange={changeItemTitleHandler}
                onKeyDown={addItemOnEnterHandler}
                />
            {/* <input className={error ? 'error' : ''}
                    value={itemTitle}
                    onChange={changeItemTitleHandler}
                    onKeyDown={addItemOnEnterHandler}/> */}
            {/* <Button title={'+'} onClick={addItemHandler}/> */}
            <Button onClick={addItemHandler} variant="contained" style={ButtonStyle}>+</Button>
            {/* {error && <div className={'error-message'}>{error}</div>} */}
        
        </div>
    )
}