import s from "./Preloader.module.css"
import preloader from "./../../../assets/image/preloader.gif"
import { FC } from "react"

let Preloader: FC = () => {
    return (
        <div className={s.body}>
            <img className={s.img} src={preloader} alt="preloader" />
        </div>
    )
}

export default Preloader
