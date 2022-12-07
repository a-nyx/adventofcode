const fs = require("fs");
const data = fs.readFileSync("./input.txt", "utf8");

const lines = data.split("\n");

const disk = {
  "/": {
    folders: [],
    files: {},
    parent: null,
  },
};

let path = "/";

// build disk
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (line.startsWith("$ cd")) {
    const intoFolder = line.slice(5);

    if (intoFolder === ".." && path !== "/") {
      path = path.slice(0, path.lastIndexOf("/"));
    } else if (intoFolder == "/") {
      path = "/";
    } else if (path + "/" + intoFolder in disk) {
      path = path + "/" + intoFolder;
    } else {
      const newPath = path + "/" + intoFolder;
      disk[newPath] = {
        files: {},
        folders: [],
        parent: path,
      };
      path = newPath;
    }
  }

  if (line === "$ ls") {
    i++;
    let lsLine = lines[i];
    while (!lsLine.startsWith("$") && lsLine.length !== 0) {
      if (lsLine.startsWith("dir")) {
        const folderName = path + "/" + lsLine.slice(4);
        disk[path].folders.push(folderName);
        if (!(folderName in disk)) {
          disk[folderName] = {
            files: {},
            folders: [],
            parent: path,
          };
        }
      } else {
        const spaceIndex = lsLine.indexOf(" ");
        const fileName = lsLine.slice(spaceIndex + 1);
        const fileSize = lsLine.slice(0, spaceIndex);
        disk[path].files[fileName] = Number(fileSize);
      }
      i++;
      lsLine = lines[i];
    }
    i--;
  }
}

// add sizes
const addFolderSize = (folder) => {
  if ("size" in disk[folder]) return;
  let size = 0;
  for (let i = 0; i < disk[folder].folders.length; i++) {
    const subFolderName = disk[folder].folders[i];
    if (!(size in disk[subFolderName])) {
      addFolderSize(subFolderName);
    }
    size += disk[subFolderName].size;
  }
  for (let file in disk[folder].files) {
    size += disk[folder].files[file];
  }
  disk[folder].size = size;
};

for (let key in disk) {
  addFolderSize(key);
}

const totalSize = disk["/"].size;
const cleanSize = totalSize - 40_000_000;
let smallest = totalSize;

for (let key in disk) {
  const folderSize = disk[key].size;
  if (folderSize >= cleanSize && folderSize < smallest) {
    smallest = folderSize;
  }
}

console.log(smallest);
