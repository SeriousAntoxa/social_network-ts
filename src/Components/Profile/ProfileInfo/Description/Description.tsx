import s from "./Description.module.css"
import { FC, useState } from "react"
import userLogo from "./../../../../assets/image/user.png"
import ProfileStatus from "../ProfileStatus/ProfileStatus"
import {
    reduxForm,
    FormSubmitHandler,
    InjectedFormProps
} from "redux-form"
import {
    Input,
    createField,
} from "../../../common/FormControls/FormControls"
import { requiredField } from "../../../../utils/validators/validators"
import { ProfileType } from "../../../../redux/profile-reducer"

//зарефакторить форму

type DescriptionPropsType = {
    isOwner: boolean
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (form: ProfileType) => void
}

type ProfileFormDataKeysType = Extract<keyof ProfileFormDataType, string>


const Description: FC<DescriptionPropsType> = (props) => {
    const [editMode, setEditMode] = useState(false)
    let profile = props.profile
    const onSelectMainPhoto = (e: any): void => {
        if (!!e.target.files[0].length && e.target.files[0].length !== 0) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit: FormSubmitHandler<any> = (formData: ProfileType): void => {
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
            },
        }

        props.saveProfile(form)
            setEditMode(false)
    }

    return (
        <div className={s.desc}>
            <div className={s.desc_logo}>
                <img
                    className={s.desc_img}
                    src={(profile.photos && profile.photos.small) || userLogo}
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

const ProfileData: FC<any> = ({
    isOwner,
    profile,
    enableEditMode,
    updateStatus,
    status,
}) => {
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

type ProfileFormDataType = {
    fullName: string
    lookingForAJob: any
    aboutMe: string
    gitHub: string
    instagram: string
    webSite: string
    lookingForAJobDescription: string
}

type ProfileDataPropsType = {
    isOwner: boolean
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (form: ProfileType) => Promise<any>

    disableEditMode: () => void
    initialValues: any
}

const ProfileDataForm: FC<InjectedFormProps<any, any> & any> = (props) => {

    let { handleSubmit, status, updateStatus, disableEditMode, error } = props

    return (
        <form className={s.desc_data} onSubmit={handleSubmit}>
            <div className={s.desc_name}>
                <label htmlFor="fullName">Full name: </label>
                {createField<ProfileFormDataKeysType>(undefined, "fullName", [requiredField], Input, {
                    type: "text",
                })}
            </div>
            <div className={s.desc_status}>
                <ProfileStatus status={status} updateStatus={updateStatus} />
            </div>
            <div className={s.desc_info}>
                <div>
                    <label htmlFor="lookingForAJob">Looking for a job: </label>
                    {createField<ProfileFormDataKeysType>(undefined, "lookingForAJob", [], Input, {
                        type: "checkbox",
                    })}
                </div>
                <div>
                    <label htmlFor="aboutMe">About me: </label>
                    {createField<ProfileFormDataKeysType>(undefined, "aboutMe", [requiredField], Input, {
                        type: "text",
                    })}
                </div>
                <div>
                    <label htmlFor="instagram">Instagram: </label>
                    {createField<ProfileFormDataKeysType>(undefined, "instagram", [], Input, {
                        type: "text",
                    })}
                </div>
                <div>
                    <label htmlFor="gitHub">Github: </label>
                    {createField<ProfileFormDataKeysType>(undefined, "gitHub", [], Input, {
                        type: "text",
                    })}
                </div>
                <div>
                    <label htmlFor="webSite">Website: </label>
                    {createField<ProfileFormDataKeysType>(undefined, "webSite", [], Input, {
                        type: "text",
                    })}
                </div>
                <div>
                    <label htmlFor="lookingForAJobDescription">
                        My skills:{" "}
                    </label>
                    {createField(
                        undefined,
                        "lookingForAJobDescription",
                        [requiredField],
                        Input,
                        { type: "text" }
                    )}
                </div>
            </div>
            <div>
                <button>Save</button>
                <button onClick={disableEditMode}>Cancel</button>
            </div>
        </form>
    )
}

let ProfileDataFormRedux = reduxForm<any, any>({
    form: "profileData",
    enableReinitialize: true,
    destroyOnUnmount: false,
})(ProfileDataForm)

export default Description
