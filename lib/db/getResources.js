import { readdir } from "fs/promises";
import path from "path";

/**
 * @param {string} source - The source to be processed.
 */
const getDirectories = async (source) => {
  return (await readdir(source, { withFileTypes: true }))
    .filter((dir) => dir.isDirectory())
    .map((dir) => dir.name);
};

export default async function getResources() {
  const resourceDirs = await getDirectories('./resources');

  return resourceDirs
    .filter((name) => name !== "health")
    .map((name) => ({
      dir: `resources/${name}`,
      name,
    }));
};
