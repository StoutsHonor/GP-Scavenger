import { entered_field, create_challenges_updated, submitted_create_game, start_location_set, challenge_location_set } from '../actions/index';

const initialState = { 
  createGameName: null,
  createGameDescription: null,
  createGameDuration: null,
  createGameMaxPlayers: null,
  createGameMode: null,
  createGameStartingLocation: null,
  createGameChallenges: [],
  createChallengeLocation: null,
  createChallengeType: null,
  createChallengeTitle: null,
  createChallengeObjective: null,
  createChallengeAnswer: null,

};

// for each case, the return is similar to a setState() in React
export default function(state = initialState, action) {
  switch (action.type) {
    case entered_field:
      console.log('state: ', state);
      return Object.assign({}, state, {[action.payload.field]: action.payload.info})
    case start_location_set:
      return Object.assign({}, state, {createGameStartingLocation: action.payload})
    case challenge_location_set:
      return Object.assign({}, state, {createChallengeLocation: action.payload})
    case create_challenges_updated:
      return Object.assign({}, state, {
        createGameChallenges: action.payload,
        createChallengeLocation: null,
        createChallengeType: null,
        createChallengeTitle: null,
        createChallengeObjective: null,
        createChallengeAnswer: null
      })
    case submitted_create_game: // a game was submitted, we reset the store
      return Object.assign({}, state, {
        createGameName: null,
        createGameDescription: null,
        createGameDuration: null,
        createGameMaxPlayers: null,
        createGameMode: null,
        createGameStartingLocation: null,
        createGameChallenges: [],
        createChallengeLocation: null,
        createChallengeType: null,
        createChallengeTitle: null,
        createChallengeObjective: null,
        createChallengeAnswer: null
      })
    default:
      return state;
  }
}
