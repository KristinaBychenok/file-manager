import fs from "fs";
import { sep } from "path";
import { cd } from "../nwd/cd.js";

export const rn = async (curentDirArray, pathToFile, fileName) => {
  const isFileExist = await cd(pathToFile, curentDirArray);

  if (!!isFileExist) {
    const newFilePath = [...isFileExist];
    newFilePath.pop();
    newFilePath.push(fileName);

    fs.rename(isFileExist.join(sep), newFilePath.join(sep), (err) => {
      if (err) console.log("Operation failed");
    });
  }
};
