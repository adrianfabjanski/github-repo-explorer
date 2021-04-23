export const SET_USERS = "SET_USERS";
export const SET_SEARCH_TERM = "SET_SEARCH_TERM";

export const setUsers = (users) => {
  return { type: SET_USERS, users };
};

export const setSearchTerm = (searchTerm) => {
  return { type: SET_SEARCH_TERM, searchTerm };
};
