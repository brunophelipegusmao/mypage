const getRequiredEnv = (name: "DATABASE_URL") => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is required to initialize the database layer.`);
  }

  return value;
};

export const dbEnv = {
  DATABASE_URL: getRequiredEnv("DATABASE_URL"),
};
