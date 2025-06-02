import { ChangeEvent, KeyboardEvent, useState } from "react"
import { Button } from "./Button"

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

    return (
        <div>
            <input className={error ? 'error' : ''}
                    value={itemTitle}
                    onChange={changeItemTitleHandler}
                    onKeyDown={addItemOnEnterHandler}/>
            <Button title={'+'} onClick={addItemHandler}/>
            {error && <div className={'error-message'}>{error}</div>}
        
        </div>
    )
}