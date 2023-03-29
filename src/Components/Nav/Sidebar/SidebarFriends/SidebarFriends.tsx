import s from "./SidebarFriends.module.css"
import Friend from "./Friend/Friend"
import { FriendType } from "../../../../redux/sidebar-reducer"
import { FC } from "react"


let SidebarFriends: FC<any> = (props) => {
    const friendsData = props.friends.map((f: FriendType) => {
        if (!!f) {
        <Friend id={f.id} name={f.name} />
    }
    })

    return <div className={s.friends}>{friendsData}</div>
}

export default SidebarFriends
