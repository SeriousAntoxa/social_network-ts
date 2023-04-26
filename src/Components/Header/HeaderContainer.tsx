import React from "react"
import Header from "./Header"
import { connect } from "react-redux"
import { logout } from "../../redux/auth-reducer"
import { AppStateType } from "../../redux/redux-store"

type MapStateToPropsType = {
    isFetching: boolean
    login: string | null
    isAuth: boolean
}

type MapDispatchToPropsType = {
    logout: () => void
}

export type HeaderPropsType = MapStateToPropsType & MapDispatchToPropsType

class HeaderAPIContainer extends React.Component<HeaderPropsType> {
    render() {
        return <Header isFetching={this.props.isFetching} login={this.props.login} isAuth={this.props.isAuth} logout={this.props.logout}/>
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isFetching: state.common.isFetching,
    login: state.auth.login,
    isAuth: state.auth.isAuth,
})

const HeaderContainer = connect<MapStateToPropsType, MapDispatchToPropsType , any, AppStateType>(mapStateToProps, {
    logout
})(HeaderAPIContainer)

export default HeaderContainer
