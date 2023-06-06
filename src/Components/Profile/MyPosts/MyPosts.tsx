import React, { FC, ReactElement } from "react"
import s from "./MyPosts.module.css"
import Post from "./Post/Post"
import MyPostFormRedux from "./MyPostForm/MyPostForm"
import { InitialStateType, PostType } from "../../../redux/profile-reducer"

type PropsType = {
        profilePage: InitialStateType
        addPost: (newPost: string) => void
}

type MyPostFormDataType = {
    newPost: string
}

const MyPosts: FC<PropsType> = (props) => {
    const onSubmit = (formData: MyPostFormDataType): void => {
        props.addPost(formData.newPost)
    }

    const postsData = props.profilePage.posts.map((m: PostType, i: number): ReactElement => (
        <Post key={i} message={m.message} like={m.likeCounter} />
    ))

    return (
        <div className={s.myPost}>
            <p>My posts</p>
            <MyPostFormRedux onSubmit={onSubmit} />
            <div>{postsData}</div>
        </div>
    )
}

export default MyPosts
