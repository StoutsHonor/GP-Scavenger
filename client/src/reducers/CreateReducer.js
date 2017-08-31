import { entered_field, challenge_added, submitted_create_game } from '../actions/index';

const initialState = { 
  createGameName: null,
  createGameDescription: '1234123',
  createGameDuration: '1231',
  createGameMaxPlayers: null,
  createGameMode: null,
  createGameStartingLocation: null,
  createGameChallenges: []
};

// for each case, the return is similar to a setState() in React
export default function(state = initialState, action) {
  switch (action.type) {
    case entered_field:
      return Object.assign({}, state, {[action.payload.field]: action.payload.info})
    case challenge_added:
      return Object.assign({}, state, {createGameChallenges: action.payload})
    case submitted_create_game:
      return Object.assign({}, state, {
        createGameName: null,
        createGameDescription: null,
        createGameDuration: null,
        createGameMaxPlayers: null,
        createGameMode: null,
        createGameStartingLocation: null,
        createGameChallenges: []
      })
    default:
      return state;
  }
}
