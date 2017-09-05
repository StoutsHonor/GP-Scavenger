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
  createChallengeDescription: null,
  createChallengeObjective: null,
  createChallengeAnswer: null,
  createChallengeTimeLimit: null,

};

// for each case, the return is similar to a setState() in React
export default function(state = initialState, action) {
  switch (action.type) {
    case entered_field:
      // console.log('state: ', state);
      if (action.payload.field === 'createChallengeLocation') {
        return Object.assign({}, state, {
          [action.payload.field]: action.payload.info,
          createChallengeTimeLimit: null,
          createChallengeObjective: null,
          createChallengeAnswer: null,
        })
      } else if (action.payload.field === 'createChallengeObjective' ||
      action.payload.field === 'createChallengeAnswer' ||
      action.payload.field === 'createChallengeTimeLimit'
      ) {
        return Object.assign({}, state, {
          [action.payload.field]: action.payload.info,
          createChallengeLocation: null
        })
      } else {
        return Object.assign({}, state, {
          [action.payload.field]: action.payload.info
        })
      }



    case start_location_set:
      return Object.assign({}, state, {createGameStartingLocation: action.payload})
    case challenge_location_set:
      return Object.assign({}, state, {createChallengeLocation: action.payload})
    case create_challenges_updated:
      // console.log('reducer heard update, updating challenges to: ', action.payload);
      return Object.assign({}, state, {
        createGameChallenges: action.payload.slice(),
        createChallengeLocation: null,
        createChallengeType: null,
        createChallengeTitle: null,
        createChallengeDescription: null,
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
        createChallengeDescription: null,
        createChallengeObjective: null,
        createChallengeAnswer: null
      })
    default:
      return state;
  }
}
