import * as ACTIONS from 'stores/types';

const initialState = 0;

export default function (state = initialState, action: IAction<void>): number {
  switch (action.type) {
    case ACTIONS.COUNTER_INCREASE:
      return state + 1;
    case ACTIONS.COUNTER_DOUBLE:
      return state * 2;
  }
  return state;
}
