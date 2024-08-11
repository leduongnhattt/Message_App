export const constanst = {
  CURRENT_TOKEN: 'CURRENT_TOKEN',
};

const APIURL = 'http://localhost:4000';

export const apiEndPoint = {
  AuthEndPoint: {
    login: `${APIURL}/auth/login`,
    logout: `${APIURL}/auth/logout`,
    me: `${APIURL}/auth/me`
  },
  MessageEndPoint: `${APIURL}/message`,
  UsersEndPoint: `${APIURL}/users`
};
