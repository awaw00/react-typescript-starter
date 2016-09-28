import * as ACTIONS from 'stores/types';
export function increase () {
  return {
    type: ACTIONS.COUNTER_INCREASE
  };
}

export function double () {
  return (dispatch) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type: ACTIONS.COUNTER_DOUBLE
        });
        resolve();
      }, 500);
    });
  };
}
