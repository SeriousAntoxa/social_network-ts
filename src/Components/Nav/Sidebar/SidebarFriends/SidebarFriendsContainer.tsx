import { connect } from "react-redux"
import SidebarFriends from "./SidebarFriends"
import { AppStateType } from "../../../../redux/redux-store"
import { FriendType } from "../../../../redux/sidebar-reducer"

type MapStateToPropsType = {
    friends: Array<FriendType | null>
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        friends: state.sidebar.friends,
    }
}

const SidebarFriendsContainer = connect<
    MapStateToPropsType,
    any,
    any,
    AppStateType
>(mapStateToProps)(SidebarFriends)

export default SidebarFriendsContainer
