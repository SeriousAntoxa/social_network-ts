import { connect } from "react-redux"
import { sendMessage } from "../../redux/dialogs-reducer"
import Dialogs from "./Dialogs.js"
import { AppStateType } from "../../redux/redux-store"

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

const DialogsContainer = connect(mapStateToProps, { sendMessage })(Dialogs)

export default DialogsContainer
