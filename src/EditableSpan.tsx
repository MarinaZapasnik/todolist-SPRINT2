import { ChangeEvent, useState } from "react"
import TextField from '@mui/material/TextField';
import './App.css'


type Props = {
    oldTitle: string
    onClick: (updateTitle: string) => void
}

export const EditableSpan = ({oldTitle, onClick}: Props) => {
    const[edit, setEdit] = useState(false)
    const [updateTitle, setUpdateTitle] = useState(oldTitle)
    
    const editHandler = () => {
        setEdit(!edit)
        if (edit) {
            onClick(updateTitle)
        }
        
    }

    const updateTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setUpdateTitle(event.currentTarget.value)

    }


    return (
        edit 
            ?
            <TextField 
                id="standart-basic" 
                label="Outlined" 
                variant="standard" 
                size="small"
                onBlur={editHandler}
                onChange={updateTitleHandler}
                autoFocus
                value={updateTitle}/>
            // <input 
            //     onBlur={editHandler}
            //     onChange={updateTitleHandler}
            //     autoFocus
            //     value={updateTitle}/> 
            :
            <h4 onDoubleClick={editHandler}>{oldTitle}</h4>
        
    )
}