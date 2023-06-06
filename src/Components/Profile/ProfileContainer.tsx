import React, { FC } from "react"
import Profile from "./Profile"
import {
    getUser,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile,
    ProfileType,
} from "../../redux/profile-reducer"
import { connect } from "react-redux"
//import { compose } from "redux";
import { Navigate, useParams } from "react-router-dom"
import { AppStateType } from "../../redux/redux-store"

type MapStateToPropsType = {
    profile: ProfileType
    isAuth: boolean
    userId: number
    status: string
}

type MapDispatchToPropsType = {
    getUser: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (form: ProfileType) => void
}

type OwnPropsType = {
    paramUserId: string | undefined
}

type ProfilePropsType = MapStateToPropsType &
    MapDispatchToPropsType &
    OwnPropsType

class ProfileAPIComponent extends React.Component<ProfilePropsType> {
    componentDidMount() {
        let userId: number = !!this.props.paramUserId
            ? +this.props.paramUserId
            : this.props.userId
        this.props.getUser(userId)
        this.props.getStatus(userId)
    }

    render() {
        if (!this.props.paramUserId && !this.props.isAuth)
            return <Navigate to="/login" replace />
        return (
            <Profile
                isOwner={!this.props.paramUserId && this.props.isAuth}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
                savePhoto={this.props.savePhoto}
                saveProfile={this.props.saveProfile}
            />
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth,
        userId: state.auth.userId,
        status: state.profilePage.status,
    }
}

export const ProfileContainer = connect<
    MapStateToPropsType,
    MapDispatchToPropsType,
    OwnPropsType,
    AppStateType
>(mapStateToProps, {
    getUser,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile,
})(ProfileAPIComponent)

type QuizParams = {
    userId: string | undefined
}

export const ProfileContainerWithParams: FC = () => {
    const { userId } = useParams<QuizParams>()
    return <ProfileContainer paramUserId={userId} />
}
