

// List out the types of actions, and export these. The reducers will import these, to know where to make updates.

export const entered_field = 'entered_field';
export const challenge_added = 'challenge_added';
export const submitted_create_game = 'submitted_create_game';


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

export const challengeAdded = (challengeInfo) => {
  console.log('Challenge was added: ', challengeInfo);
  return {
      type: challenge_added,
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


