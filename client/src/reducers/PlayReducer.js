import { get_all_users_games } from '../actions/index';
import { get_all_game_challenges } from '../actions/index';

const initialState = { 
  games: null,
  allChallenges: null
};

// for each case, the return is similar to a setState() in React
export default function(state = initialState, action) {
  switch (action.type) {
    case get_all_users_games:
      return Object.assign({}, state, {games: action.payload})
    case get_all_game_challenges:
      return Object.assign({}, state, {allChallenges: action.payload})
    default:
      return state;
  }
}
