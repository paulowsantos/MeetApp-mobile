import produce from 'immer';

const INITIAL_STATE = {
  meetchanged: false,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meet/CHANGE_MEET': {
        draft.meetchanged = !draft.meetchanged;
        break;
      }
      default:
    }
  });
}
