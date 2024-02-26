export * from './Authentication/authentication';
export * from './Users/users';
export * from './Follow/follow';
export * from './Notifications/notifications';

function getFirstErrorMessage(jsonData) {
  const datum = Object.values(jsonData.error.data.errors).flatMap(
    errorArr => errorArr,
  );
  if (datum.length > 0) {
    return datum;
  }
  return ['Something wend wrong'];
}

export const makeApiCall = (apiFunction, snackBar) => {
  apiFunction()
    .then(response => {
      if (
        response &&
        response.data &&
        response.data.message &&
        response.data.status === 'success'
      ) {
        snackBar(response.data.message, 'success', response.data);
      } else if (
        response &&
        response.data &&
        response.data.message &&
        response.data.status === 'issues'
      ) {
        snackBar(response.data.message, 'issues', response.data);
      } else if (
        response &&
        response.data &&
        response.data.status &&
        response.data.status === 'success'
      ) {
        snackBar('Successfull', 'issues', response.data);
      } else if (
        response &&
        response.error.data &&
        response.error.data.message &&
        response.error.data.status === 'error'
      ) {
        snackBar(response.error.data.message, 'error', response.error.data);
      } else {
        const messages = getFirstErrorMessage(response);
        messages.forEach(message => {
          snackBar(message, 'error', response.data);
        });
      }
    })

    .catch(error => {
      snackBar('Something went wrong', 'error');
    });
};
