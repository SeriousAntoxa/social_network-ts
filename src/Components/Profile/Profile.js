import s from "./Profile.module.css"
import MyPostsContainer from "./MyPosts/MyPostsContainer"
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import Preloader from "./../common/Preloader/Preloader"

const Profile = (props) => {
    if (JSON.stringify(props.profile) === '{}') {
        return <Preloader />
    }

    return (
        <div className={s.profile}>
            <div className={s.profile_ProfileInfo}>
                <ProfileInfo
                    isOwner={props.isOwner}
                    profile={props.profile}
                    status={props.status}
                    updateStatus={props.updateStatus}
                    savePhoto={props.savePhoto}
                    saveProfile={props.saveProfile}
                />
            </div>
            <div className={s.profile_MyPosts}>
                <MyPostsContainer />
            </div>
        </div>
    )
}

export default Profile
