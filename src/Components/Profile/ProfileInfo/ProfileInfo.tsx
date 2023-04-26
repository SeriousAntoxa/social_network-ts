import s from "./ProfileInfo.module.css"
import Description from "./Description/Description"
import { FC } from "react"
import { ProfileType } from "../../../redux/profile-reducer"

type PropsType = {
    isOwner: boolean
    profile: ProfileType
    status: string
    updateStatus: (status: string) => any
    savePhoto: (file: any) => any
    saveProfile: (form: ProfileType) => any
}

const ProfileInfo: FC<PropsType> = (props) => {
    return (
        <div className={s.profileInfo}>
            <div className={s.profileInfo_Description}>
                <Description
                    isOwner={props.isOwner}
                    profile={props.profile}
                    status={props.status}
                    updateStatus={props.updateStatus}
                    savePhoto={props.savePhoto}
                    saveProfile={props.saveProfile}
                />
            </div>
        </div>
    )
}

export default ProfileInfo
