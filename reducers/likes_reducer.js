import { LIKE_JOB, CLEAR_LIKED_JOBS } from "../actions/index";
import _ from 'lodash';
import { REHYDRATE } from 'redux-persist';

const reducer = (state = [], action) => {
  switch (action.type) {
    case LIKE_JOB:
      return _.uniqBy([ action.payload, ...state ], 'jobkey');
    case CLEAR_LIKED_JOBS:
      return [];
    case REHYDRATE:
      return action.payload.likes || [];
    default:
      return state;
  }
}

export default reducer;