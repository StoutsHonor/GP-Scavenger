
// actions exported by index. will be like events that this reducer will listen for
import { user_logged_in, user_started_game, user_ended_game } from '../actions/index';

const initialState = { 
  userIdentity: null,
  userOwnedGames: null,
  userFriendList: null,
  userCurrentLocation: null,  
  userIsInGame: false,
  userCurrentGame: null,
  settingDistanceTolerance: null,
};

// for each case, the return is similar to a setState() in React
export default function(state = initialState, action) {
  switch (action.type) {
    case user_logged_in:
      return Object.assign({}, state, {
        userIdentity: action.payload.uid,
        userGames: null,
        userInGames: null,
        userCurrentGame: null,
        userFriendList: null,
      })
    case user_started_game:
      return Object.assign({}, state, {
        //
      })
    case user_ended_game:
      return Object.assign({}, state, {
        userIsInGame: false,
        userCurrentGame: null
      })
    default:
      return state;
  }
}
