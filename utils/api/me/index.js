const Authenticated = (cookie) => {
  return {
    ...JSON.parse(cookie),
    status: "authenticated",
  };
};

const Unauthenticated = () => {
  return {
    status: "unauthenticated",
  };
};

export { Authenticated, Unauthenticated };
