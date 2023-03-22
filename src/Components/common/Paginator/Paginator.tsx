import { useState, FC } from "react"
import s from "./Paginator.module.css"

    type PropsType = {
        totalItemsCount: number
        portionSize: number
        countItemsPerPage: number
        currentPage: number
        onPageChange: (portionNumber: number) => void
    }

let Paginator: FC<PropsType> = ({ portionSize = 20, ...props }) => {
    let pagesCount: number = Math.ceil(props.totalItemsCount / props.countItemsPerPage)
    let pages: Array<number> = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount: number = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState<number>(1)
    let LeftPortionPageNumber: number = (portionNumber - 1) * portionSize + 1
    let RightPortionPageNumber: number = portionNumber * portionSize

    return (
        <div className={s.paginator}>
            {portionNumber > 1 && (
                <button onClick={() => setPortionNumber(portionNumber - 1)}>
                    PREV
                </button>
            )}

            {pages
                .filter(
                    (p) =>
                        p >= LeftPortionPageNumber &&
                        p <= RightPortionPageNumber
                )
                .map((pageNumber) => {
                    return (
                        <span
                            key={pageNumber}
                            className={
                                props.currentPage === pageNumber
                                    ? s.activeLink
                                    : " "
                            }
                            onClick={() => props.onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </span>
                    )
                })}
            {portionNumber < portionCount && (
                <button onClick={() => setPortionNumber(portionNumber + 1)}>
                    NEXT
                </button>
            )}
        </div>
    )
}

export default Paginator
