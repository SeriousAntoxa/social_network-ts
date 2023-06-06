import { InitialStateType, PostType } from "../../../redux/profile-reducer";
import {
  addPost,
} from "../../../redux/profile-reducer";
import { AppStateType } from "../../../redux/redux-store";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";

type MapStateToPropsType = {
    profilePage: InitialStateType
}

type MapDispatchToPropsType = {
    addPost: (newPost: string) => void
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    profilePage: state.profilePage,
  };
};

const MyPostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, unknown, AppStateType>(mapStateToProps, {addPost})(MyPosts);

export default MyPostsContainer;
