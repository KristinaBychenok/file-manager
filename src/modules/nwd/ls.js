import fs from "fs";

export const ls = async (pathToDir) => {
  fs.readdir(pathToDir, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.log("Operation failed");
      return
    }

    const tableList = {
      directory: [],
      file: [],
    };

    files
      .map((file) => ({
        name: file.name,
        type: file.isDirectory() ? "directory" : "file",
      }))
      .sort((a, b) => a.name.toLowerCase() - b.name.toLowerCase())
      .forEach((el) =>
        el.type === "directory"
          ? tableList.directory.push(el)
          : tableList.file.push(el)
      );
    console.table([...tableList.directory, ...tableList.file]);
  });
};
