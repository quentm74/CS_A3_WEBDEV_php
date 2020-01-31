import {loadingStatus} from "../utils/consts";

const prefix = "STATUS:";

const UPDATE_LOADING_STATUS = prefix + "UPDATE_LOADING_STATUS";
export const updateLoadingStatus = (section, status) => ({
  type: UPDATE_LOADING_STATUS,
  section: section,
  status: status,
});

const UPDATE_ERROR_STATUS = prefix + "UPDATE_ERROR_STATUS";
export const updateErrorStatus = (section, status) => ({
  type: UPDATE_ERROR_STATUS,
  section: section,
  status: status,
});


const initState = {
  sign_in_loading: loadingStatus.NOT_STARTED,
  sign_in_error: null,
};

export const statusReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_LOADING_STATUS:
      let updated_state_loading = state;
      updated_state_loading[action.section + '_loading'] = action.status;
      return updated_state_loading;
    case UPDATE_ERROR_STATUS:
      let updated_state_error = state;
      updated_state_error[action.section + '_error'] = action.status;
      return updated_state_error;
  }
  return state;
};