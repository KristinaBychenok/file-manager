import fs from "fs";
import { sep } from "path";
import { cd } from "../nwd/cd.js";

export const rm = async (curentDirArray, pathToFile) => {
  const isExist = await cd(pathToFile, curentDirArray);

  if (!!isExist) {
    fs.rm(isExist.join(sep), { recursive: true }, (err) => {
      if (err) console.log("Operation failed");
    });
  }
};
