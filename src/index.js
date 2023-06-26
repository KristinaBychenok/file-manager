import readline from "readline";
import { homedir } from "os";
import path from "path";
import {
  cd,
  ls,
  cat,
  add,
  rn,
  cp,
  rm,
  mv,
  os,
  calcHash,
  compress,
  decompress,
} from "./modules/index.js";

const __userName = process.argv[2].slice(11);
const __homeDir = homedir();

let curentDirArray = __homeDir.split(path.sep);

const printWrapper = async (fn, args) => {
  await fn(args);
  console.log(`You are currently in ${curentDirArray.join(path.sep)}`);
};

const handleExit = () => {
  console.log(`Thank you for using File Manager, ${__userName}, goodbye!`);
  process.exit(0);
};

const handleUp = () => curentDirArray.length > 1 && curentDirArray.pop();

const handleCd = async (pathToDir) => {
  const result = await cd(pathToDir[0], curentDirArray);
  if (!!result) curentDirArray = result;
};

const handleLs = async () => await ls(curentDirArray.join(path.sep));

const handleCat = async (pathToDir) => {
  await cat(pathToDir[0], curentDirArray);
};

const handleAdd = async (fileName) => {
  await add(curentDirArray, fileName);
};

const handleRn = async (fileInfo) => {
  await rn(curentDirArray, fileInfo[0], fileInfo[1]);
};

const handleCp = async (filesInfo) => {
  await cp(curentDirArray, filesInfo[0], filesInfo[1]);
};

const handleMv = async (filesInfo) => {
  await mv(curentDirArray, filesInfo[0], filesInfo[1]);
};

const handleRm = async (pathToFile) => {
  await rm(curentDirArray, pathToFile[0]);
};

const handleOs = async (info) => {
  await os(info[0]);
};

const handleHash = async (pathToFile) => {
  await calcHash(curentDirArray, pathToFile[0]);
};

const handleCompress = async (filesInfo) => {
  await compress(curentDirArray, filesInfo[0], filesInfo[1]);
};

const handleDecompress = async (filesInfo) => {
  await decompress(curentDirArray, filesInfo[0], filesInfo[1]);
};

const start = () => {
  const rl = readline.createInterface(process.stdin, process.stdout);

  console.log(`Welcome to the File Manager, ${__userName}!`);
  console.log(`You are currently in ${__homeDir}`);

  rl.on("line", (input) => {
    const [command, ...args] = input.split(" ");
    switch (command) {
      case ".exit":
        handleExit();
        return;
      case "up":
        printWrapper(handleUp);
        return;
      case "cd":
        printWrapper(handleCd, args);
        return;
      case "ls":
        printWrapper(handleLs);
        return;
      case "cat":
        printWrapper(handleCat, args);
        return;
      case "add":
        printWrapper(handleAdd, args);
        return;
      case "rn":
        printWrapper(handleRn, args);
        return;
      case "cp":
        printWrapper(handleCp, args);
        return;
      case "mv":
        printWrapper(handleMv, args);
        return;
      case "rm":
        printWrapper(handleRm, args);
        return;
      case "os":
        printWrapper(handleOs, args);
        return;
      case "hash":
        printWrapper(handleHash, args);
        return;
      case "compress":
        printWrapper(handleCompress, args);
        return;
      case "decompress":
        printWrapper(handleDecompress, args);
        return;

      default:
        console.log("Invalid input");
    }
  });

  rl.on("SIGINT", () => handleExit());
};

start();
