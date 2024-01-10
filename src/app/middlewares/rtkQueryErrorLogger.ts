import {isRejectedWithValue} from '@reduxjs/toolkit';

const rtkQueryErrorLogger = api => next => action => {
  if (isRejectedWithValue(action)) {
  }
  return next(action);
};

export {rtkQueryErrorLogger};
