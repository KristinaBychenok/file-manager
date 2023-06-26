import { cd } from "../nwd/cd.js";
import crypto from "crypto";
import fs from "fs";
import { sep } from "path";

export const calcHash = async (curentDirArray, pathToFile) => {
  const isExit = await cd(pathToFile, curentDirArray);

  if (!!isExit) {
    const hash = crypto.createHash("sha256");

    const input = fs.createReadStream(isExit.join(sep));

    input.on("data", (data) => {
      hash.update(data);
    });
    input.on("end", () => {
      console.log(hash.digest("hex"));
    });
    input.on("error", () => {
      console.log("Operation failed");
    });
  }
};
