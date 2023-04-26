import s from "./Description.module.css"
import { FC, useState } from "react"
import userLogo from "./../../../../assets/image/user.png"
import ProfileStatus from "../ProfileStatus/ProfileStatus"
import { reduxForm, Field, FormAction, FormSubmitHandler, InjectedFormProps, DecoratedComponentClass } from "redux-form"
import { Input, Textarea, createField } from "../../../common/FormControls/FormControls"
import { requiredField } from "../../../../utils/validators/validators"
import { ProfileType } from "../../../../redux/profile-reducer"

type PropsType = {
    isOwner: boolean
    profile: ProfileType
    status: string
    updateStatus: (status: string) => any
    savePhoto: (file: any) => any
    saveProfile: (form: ProfileType) => any
}


const Description: FC<PropsType> = (props) => {
    const [editMode, setEditMode] = useState(false)
    const profile = props.profile
    const onSelectMainPhoto = (e: any) => {
        if (e.target.files[0].length !== 0) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit: FormSubmitHandler<any> = (formData: any): void => {
        let form = {
            userId: profile.userId,
            lookingForAJob: formData.lookingForAJob || profile.lookingForAJob,
            lookingForAJobDescription:
                formData.lookingForAJobDescription ||
                profile.lookingForAJobDescription,
            aboutMe: formData.aboutMe || profile.aboutMe,
            fullName: formData.fullName || profile.fullName,
            contacts: {
                github:
                    formData.contacts.github || profile.contacts.github || null,
                vk: null,
                facebook: null,
                instagram:
                    formData.contacts.instagram ||
                    profile.contacts.instagram ||
                    null,
                twitter: null,
                website:
                    formData.contacts.website ||
                    profile.contacts.website ||
                    null,
                youtube: null,
                mainLink: null,
            }
        }

        props.saveProfile(form).then(() => {
            setEditMode(false)
        })
    }

    return (
        <div className={s.desc}>
            <div className={s.desc_logo}>
                <img
                    className={s.desc_img}
                    src={profile.photos && profile.photos.small || userLogo}
                    alt="userLogo"
                ></img>
                {props.isOwner && (
                    <input
                        className={s.desc_selectFile}
                        type="file"
                        onChange={onSelectMainPhoto}
                    />
                )}
            </div>

            {editMode ? (
                
                <ProfileDataFormRedux
                profile={profile}
                status={props.status}
                updateStatus={props.updateStatus}
                onSubmit={onSubmit}
                disableEditMode={() => {
                    setEditMode(false)
                }}
                initialValues={profile}
                />
            ) : (
                <ProfileData
                    enableEditMode={() => {
                        setEditMode(true)
                    }}
                    updateStatus={props.updateStatus}
                    status={props.status}
                    isOwner={props.isOwner}
                    profile={profile}
                />
            )}
        </div>
    )
}

type EditModeType = {
    enableEditMode: () => void
    disableEditMode: () => void
}

const ProfileData: FC<PropsType & EditModeType & any> = ({    isOwner,
    profile,
    enableEditMode,
    updateStatus,
    status})  => {

    return (
        <div className={s.desc_data}>
            <div className={s.desc_name}>
                <p>{profile.fullName}</p>
            </div>
            <div className={s.desc_status}>
                <ProfileStatus status={status} updateStatus={updateStatus} />
            </div>
            <div className={s.desc_info}>
                <div>
                    <b>Looking for a job: </b>
                    {profile.lookingForAJob ? "Yes" : "No"}
                </div>
                <div>
                    <b>About me: </b> {profile.aboutMe || " - "}
                </div>
                <div>
                    <b>Instagram: </b>{" "}
                    {profile.contacts.instagram ? (
                        <a href={profile.contacts.instagram}>
                            {profile.contacts.instagram}
                        </a>
                    ) : (
                        " - "
                    )}
                </div>
                <div>
                    <b>Github: </b>
                    {profile.contacts.github ? (
                        <a href={profile.contacts.github}>
                            {profile.contacts.github}
                        </a>
                    ) : (
                        " - "
                    )}
                </div>
                <div>
                    <b>Website: </b>
                    {profile.contacts.website ? (
                        <a href={profile.contacts.website}>
                            {profile.contacts.website}
                        </a>
                    ) : (
                        " - "
                    )}
                </div>
                <div>
                    <b>Job: </b>
                    {profile.lookingForAJobDescription || " - "}
                </div>
            </div>
            {isOwner && (
                <div>
                    <button onClick={enableEditMode}>Settings</button>
                </div>
            )}
        </div>
    )
}

const ProfileDataForm: FC<InjectedFormProps<PropsType & any> & PropsType & any> = ({
    handleSubmit,
    status,
    updateStatus,
    disableEditMode,
    error,
}) => {
    return (
        <form className={s.desc_data} onSubmit={handleSubmit}>
            <div className={s.desc_name}>
                <label htmlFor="fullName">Full name: </label>
                {createField(undefined,"fullName",[requiredField],Input,{type:"text"})}
            </div>
            <div className={s.desc_status}>
                <ProfileStatus status={status} updateStatus={updateStatus} />
            </div>
            <div className={s.desc_info}>
                <div>
                    <label htmlFor="lookingForAJob">Looking for a job: </label>
                    {createField(undefined,"lookingForAJob",[],Input,{type:"checkbox"})}
                </div>
                <div>
                    <label htmlFor="aboutMe">About me: </label>
                    {createField(undefined,"aboutMe",[requiredField],Input,{type:"text"})}
                </div>
                <div>
                    <label htmlFor="instagram">Instagram: </label>
                    {createField(undefined,"contacts.instagram",[],Input,{type:"text"})}
                </div>
                <div>
                    <label htmlFor="contacts.gitHub">Github: </label>
                    {createField(undefined,"contacts.gitHub",[],Input,{type:"text"})}
                </div>
                <div>
                    <label htmlFor="webSite">Website: </label>
                    {createField(undefined,"contacts.webSite",[],Input,{type:"text"})}
                </div>
                <div>
                    <label htmlFor="lookingForAJobDescription">
                        My skills:{" "}
                    </label>
                    {createField(undefined,"lookingForAJobDescription",[requiredField],Input,{type:"text"})}
                </div>
            </div>
            <div>
                <button>Save</button>
                <button onClick={disableEditMode}>Cancel</button>
            </div>
        </form>
    )
}

let ProfileDataFormRedux: any = reduxForm<PropsType & any>({
    form: "profileData",
    enableReinitialize: true,
    destroyOnUnmount: false,
})(ProfileDataForm)

export default Description
