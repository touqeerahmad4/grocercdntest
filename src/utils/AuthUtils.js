export const checkLoggedIn = props => {
  if (!props.customerStore.isLoggedIn) {
    const location = props.location;
    const redirect = location.pathname + location.search;
    props.history.push(`/login?redirect=${redirect}`);
  }
  return props.customerStore.isLoggedIn;
};
