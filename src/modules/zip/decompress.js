import fs, { mkdir } from "fs";
import zlib from "node:zlib";
import { cd } from "../nwd/cd.js";
import { sep } from "path";

export const decompress = async (
  curentDirArray,
  pathToFile,
  pathToDestination
) => {
  const isPathToFileExit = await cd(pathToFile, curentDirArray);
  const isPathToDestinationExit = await cd(pathToDestination, curentDirArray);

  if (!!isPathToFileExit) {
    !isPathToDestinationExit &&
      mkdir(pathToDestination, { recursive: true }, (err) => {
        if (err) console.log("Operation failed");
      });

    const isNewPathToDir = await cd(pathToDestination, curentDirArray);

    if (!!isNewPathToDir) {
      const fileName = isPathToFileExit.slice(-1).join(sep);
      const ind = fileName.indexOf(".");
      const fileNameWithoutExt = fileName.slice(0, ind);

      const input = fs.createReadStream(isPathToFileExit.join(sep));
      const output = fs.createWriteStream(
        isNewPathToDir.join(sep) + `${sep}` + `${fileNameWithoutExt}` + ".txt"
      );

      const decompressStream = zlib.createBrotliCompress();

      input.pipe(decompressStream).pipe(output);

      output.on("error", (error) => {
        if (error) console.error("Operation failed");
      });
    }
  }
};
