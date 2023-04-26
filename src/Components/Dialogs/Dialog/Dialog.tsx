import { NavLink } from "react-router-dom"
import s from "./Dialog.module.css"
import { FC } from "react"

type PropsType = {
    id: number
    name: string
}

const Dialog: FC<PropsType> = (props) => {
    const path = "/dialogs/" + props.id
    const activeLink = (navData: any) => (navData.isActive ? s.active : "")

    return (
        <NavLink to={path} className={activeLink}>
            {props.name}
        </NavLink>
    )
}

export default Dialog
