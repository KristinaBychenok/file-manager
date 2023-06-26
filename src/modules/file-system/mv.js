import fs, { mkdir } from "fs";
import { sep } from "path";
import { cd } from "../nwd/cd.js";
import { pipeline } from "stream";
import { rm } from "./rm.js";

export const mv = async (curentDirArray, pathToFile, pathToNewDirectory) => {
  const isFileExist = await cd(pathToFile, curentDirArray);

  mkdir(pathToNewDirectory, { recursive: true }, (err) => {
    if (err) console.log("Operation failed");
  });

  if (isFileExist) {
    const readStream = fs.createReadStream(isFileExist.join(sep));
    const writeStream = fs.createWriteStream(
      pathToNewDirectory + `${sep}` + isFileExist.slice(-1)
    );

    pipeline(readStream, writeStream, (err) => {
      if (err) {
        console.log("Operation failed");
        return;
      }

      rm(curentDirArray, isFileExist.join(sep))
    });
  }
};
