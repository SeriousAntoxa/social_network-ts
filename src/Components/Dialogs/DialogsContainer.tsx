import { connect } from "react-redux"
import { InitialStateType, sendMessage } from "../../redux/dialogs-reducer"
import Dialogs from "./Dialogs"
import { AppStateType } from "../../redux/redux-store"

type MapStateToPropsType = {
    dialogsPage: InitialStateType
    auth: boolean
}

type MapDispatchToPropsType = {
    sendMessage: (newMessage: string) => void
}

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
        auth: state.auth.isAuth,
    }
}

/*let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: () => {
      let action = sendMessageActionCreator();
      dispatch(action);
    }
  };
};*/

const DialogsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, any, AppStateType>(mapStateToProps, { sendMessage })(Dialogs)

export default DialogsContainer
