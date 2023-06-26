import { promises } from "fs";

export const isExist = async (path) => {
  try {
    await promises.access(path);
    return true;
  } catch {
    return false;
  }
};
