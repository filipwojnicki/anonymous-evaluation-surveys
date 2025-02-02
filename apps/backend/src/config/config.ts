export default (): Record<string, unknown> => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_NAME,
  },
  JWT_SECRET: process.env.JWT_SECRET,
  ANONYMOUS_ID_SECRET: process.env.ANONYMOUS_ID_SECRET,
  NODE_ENV: process.env.NODE_ENV,
});
