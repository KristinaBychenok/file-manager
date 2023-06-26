import { sep, isAbsolute } from "path";
import { isExist } from "./isExist.js";

export const cd = async (pathToDirArray, curentDirArray) => {
  let newPath = [...curentDirArray];

  const sepRegXp = /\\|\//;

  const enteredPath = pathToDirArray.split(sepRegXp);

  if (isAbsolute(enteredPath.join(sep))) {
    if (await isExist(enteredPath.join(sep))) {
      newPath = enteredPath;
      return newPath;
    } else {
      console.log("Operation failed");
      return;
    }
  } else {
    enteredPath.forEach((el) => {
      if (el === ".") return;
      if (el === "..") {
        newPath.length > 1 && newPath.pop();
      } else {
        newPath.push(el);
      }
    });

    if (await isExist(newPath.join(sep))) {
      return newPath;
    } else {
      console.log("Operation failed");
      return;
    }
  }
};
