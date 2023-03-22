import { FC, useEffect, useState } from "react"
import s from "./PerPage.module.css"

type PropsType = {
    countItemsPerPage: number
    onPerPage: (count: number) => void
}

let PerPage: FC<PropsType> = (props) => {
    let [perPage, setPerPage] = useState<number>(props.countItemsPerPage)

    useEffect(() => {
        setPerPage(props.countItemsPerPage)
    }, [props.countItemsPerPage])

    return (
        <div className={s.perPage}>
            <button className={perPage === 50 ? s.activeBtn : s.btn} onClick={() => props.onPerPage(50)}>50</button>
            <button className={perPage === 75 ? s.activeBtn : s.btn} onClick={() => props.onPerPage(75)}>75</button>
            <button className={perPage === 100 ? s.activeBtn : s.btn} onClick={() => props.onPerPage(100)}>100</button>
        </div>
    )
}

export default PerPage
