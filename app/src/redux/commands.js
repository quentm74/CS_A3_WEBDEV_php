import * as api from "../utils/api";
import {loadingStatus} from "../utils/consts";
import {batch} from "react-redux";
import {updateErrorStatus, updateLoadingStatus, updateMsgStatus} from "./status";
import {setQuantities} from "./cart";

const prefix = "COMMANDS:";

const UPDATE_COMMANDS = prefix + 'UPDATE_COMMANDS';
const updateCommands = (commands) => ({
  type: UPDATE_COMMANDS,
  commands: commands,
});

const SELECT_COMMAND = prefix + 'SELECT_COMMAND';
export const selectCommand = (id) => ({
  type: SELECT_COMMAND,
  id: id,
});

export const loadAllCommands = () => {
  return (dispatch, _) => {
    dispatch(updateLoadingStatus('load_commands', loadingStatus.LOADING));
    dispatch(updateErrorStatus('load_commands', null));
    api.http_get("/commands.php", (data) => {
      batch(() => {
        dispatch(updateLoadingStatus('load_commands', loadingStatus.SUCCESS));
        dispatch(updateCommands(data.commands));
      });
    }, (error) => {
      dispatch(updateLoadingStatus('load_commands', loadingStatus.ERROR));
      dispatch(updateErrorStatus('load_commands', error.data.msg));
    });
  };
};

const initState = {
  commands: [],
  selectedCommand: -1,
};

export const commandsReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_COMMANDS:
      return {
        ...state,
        commands: action.commands,
      };
    case SELECT_COMMAND:
      return {
        ...state,
        selectedCommand: action.id,
      };
  }
  return state;
};