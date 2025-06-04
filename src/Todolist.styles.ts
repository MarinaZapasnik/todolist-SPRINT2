import { SxProps } from "@mui/material"

// так как стили опираются на состояние task.isDone
// то нам пришлось константу со стилями превратить в функцию,
//которая принимает isDone пропсами

export const taskListItemElementSx = (isDone:boolean): SxProps => ({
    p: '0', 
    justifyContent: 'space-between', 
    opacity: isDone ? 0.5 : 1
    })