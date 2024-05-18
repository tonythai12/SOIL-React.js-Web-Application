import dotenv from 'dotenv';
dotenv.config();

// double check for env variables to prevent misspelling.
function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value === null) {
    throw new Error(`Key ${key} is undifined`);
  } else {
    return value;
  }
}

// using config obejct outside instead of using env value directly.
export const config = {
  host: {
    port: required('HOST_PORT', 3306),
  },
  db: {
    host: required('DB_HOST'),
    user: required('DB_USER'),
    database: required('DB_DATABASE'),
    password: required('DB_PASSWORD'),
  },
};
