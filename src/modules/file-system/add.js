import fs from "fs";
import { sep } from "path";

export const add = async (curentDirArray, fileName) => {
  const newFile = curentDirArray.join(sep) + `${sep}` + fileName.join();
  fs.writeFile(newFile, "", { flag: "ax" }, (err) => {
    if (err) console.log("Operation failed");
  });
};
