/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable import/no-default-export */
const reduxMigrations = {
  0: (state) => {
    const { upvotePercent } = state.application;
    state.application.postUpvotePercent = upvotePercent;
    state.application.commentUpvotePercent = upvotePercent;
    state.application.upvotePercent = undefined;
    return state;
  },
  1: (state) => {
    state.application.notificationDetails.favoriteNotification = true;
    return state;
  },
  2: (state) => {
    state.application.notificationDetails.bookmarkNotification = true;
    return state;
  }
};

export default {
  reduxMigrations
};
