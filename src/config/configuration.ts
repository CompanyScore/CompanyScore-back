export default () => ({
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'default_access_secret',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'default_refresh_secret',
    accessExpiresIn: Number(process.env.JWT_ACCESS_EXPIRES_IN),
    refreshExpiresIn: Number(process.env.JWT_REFRESH_EXPIRES_IN),
  },
});
