import React, { FC } from "react"
import s from "./Sidebar.module.css"
import SidebarFriendsContainer from "./SidebarFriends/SidebarFriendsContainer"

const Sidebar: FC = () => {
    return (
        <aside className={s.nav_sidebar}>
            <div className={s.sidebar_title}>
                <p>Friends</p>
            </div>
            <div className={s.sidebar_block}>
                <SidebarFriendsContainer />
            </div>
        </aside>
    )
}

export default Sidebar
