import fs from "fs";
import { cd } from "../nwd/cd.js";
import { sep } from "path";

export const cat = async (pathToDir, curentDirArray) => {
  const isFileExist = await cd(pathToDir, curentDirArray);

  if (!!isFileExist) {
    const filePath = isFileExist.join(sep);
    const readStream = fs.createReadStream(filePath);
    readStream.on("error", () => {
      console.log("Operation failed");
    });

    readStream.on("data", (chunk) => {
      process.stdout.write(chunk);
    });

    readStream.on("end", () => {
      process.stdout.write("\n");
    });
  }
};
