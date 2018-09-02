import { FETCH_JOBS } from "../actions/index";


const INITIAL_STATE = {
  results: null
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_JOBS:
      return { ...state, results: action.payload };
    default:
      return state;
  }
}

export default reducer;