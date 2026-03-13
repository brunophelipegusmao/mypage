import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const passwordHashAlgorithm = "scrypt";
const passwordHashKeyLength = 64;
const passwordHashCostFactor = 16_384;
const passwordHashBlockSize = 8;
const passwordHashParallelization = 1;
const passwordHashSaltBytes = 16;
const passwordHashMaxMemory =
  128 * passwordHashCostFactor * passwordHashBlockSize * passwordHashParallelization;

export const hashPassword = async (password: string) => {
  const salt = randomBytes(passwordHashSaltBytes).toString("base64url");
  const derivedKey = scryptSync(password, salt, passwordHashKeyLength, {
    N: passwordHashCostFactor,
    r: passwordHashBlockSize,
    p: passwordHashParallelization,
    maxmem: passwordHashMaxMemory,
  });

  return [
    passwordHashAlgorithm,
    passwordHashCostFactor,
    passwordHashBlockSize,
    passwordHashParallelization,
    salt,
    derivedKey.toString("base64url"),
  ].join("$");
};

export const verifyPassword = async (
  password: string,
  storedPasswordHash: string,
) => {
  const [algorithm, costFactor, blockSize, parallelization, salt, hash] =
    storedPasswordHash.split("$");

  if (
    algorithm !== passwordHashAlgorithm ||
    !costFactor ||
    !blockSize ||
    !parallelization ||
    !salt ||
    !hash
  ) {
    return false;
  }

  const derivedKey = scryptSync(password, salt, passwordHashKeyLength, {
    N: Number(costFactor),
    r: Number(blockSize),
    p: Number(parallelization),
    maxmem: passwordHashMaxMemory,
  });

  const storedKey = Buffer.from(hash, "base64url");

  if (storedKey.length !== derivedKey.length) {
    return false;
  }

  return timingSafeEqual(storedKey, derivedKey);
};
