// List out the types of actions, and export these. The reducers will import these, to know where to make updates.

export const entered_field = 'entered_field';
export const create_challenges_updated = 'create_challenges_updated';
export const submitted_create_game = 'submitted_create_game';
export const start_location_set = 'start_location_set';
export const challenge_location_set = 'challenge_location_set';
export const get_all_users_games = 'get_all_users_games';
export const get_all_game_challenges = 'get_all_game_challenges';

// Action Creators: the function that returns the action
// (the object that is returned is the action)
// these will be called by our containers (aka components that have access to the redux store)

// modular function. will update with 'info' at 'field'
export const enteredField = (field, info) => {
  console.log('Field: ', field, ' , info: ', info);
  return {
      type: entered_field,
      payload: {field, info}
  };
};

export const challengesUpdated = (challengeInfo) => {
  console.log('Challenges updated: ', challengeInfo);
  return {
      type: create_challenges_updated,
      payload: challengeInfo
  };
};

export const submittedCreatedGame = (gameInfo) => {
  console.log('Game was submitted: ', gameInfo);
  return {
      type: submitted_create_game,
      payload: gameInfo
  };
};

export const startLocationSet = (location) => {
  console.log('Game was submitted: ', location);
  return {
      type: start_location_set,
      payload: location
  };
};

export const challengeLocationSet = (location) => {
  console.log('Game was submitted: ', location);
  return {
      type: challenge_location_set,
      payload: location
  };
};

// client related actions:
export const user_logged_in = 'user_logged_in';
export const user_started_game = 'user_started_game';
export const user_ended_game = 'user_ended_game';
export const user_added_friend = 'user_added_friend';
export const user_removed_friend = 'user_removed_friend';

export const userLoggedIn = (data) => {
  console.log('User Logged In: ', data);
  return {
      type: user_logged_in,
      payload: data
  };
};

export const userStartedGame = (data) => {
  console.log('Game was submitted: ', data);
  return {
      type: user_started_game,
      payload: data
  };
};

export const userEndedGame = (data) => {
  console.log('Game was submitted: ', data);
  return {
      type: user_ended_game,
      payload: data
  };
};

export const get_gameId = 'get_gameId';
export const get_game = 'get_game';
export const set_current_challenge_index = 'set_current_challenge_index';
export const set_game_points = 'set_game_points';

export const getGameId = (games) => {
  console.log('Games were submitted: ', games);
  return {
      type: get_gameId,
      payload: games
  };
};

export const getGameInfo = (game) => {
  console.log('Game info was submitted: ', game);
  return {
      type: get_game,
      payload: game
  };
};

export const getAllGameChallenges = (challenges) => {
  console.log('Challenges were dispatched to store: ', challenges);
  return {
      type: get_all_game_challenges,
      payload: challenges
  };
};

export const setCurrentChallengeIndex = (index) => {
  return {
      type: set_current_challenge_index,
      payload: index
  };
};

export const setGamePoints = (points) => {
  return {
      type: set_game_points,
      payload: points
  };
};