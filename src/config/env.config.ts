export const env = {
  get PORT() {
    return process.env.PORT;
  },
  get DB_CONNECTION_URL() {
    return process.env.DB_CONNECTION_URL;
  },
};
