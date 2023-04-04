import {writeFile, readFile} from 'fs/promises';

export const save = async (newData) => {
  // ESM does not have __filename or __dirname, so get path using URL
  const {pathname: databaseFile} = new URL(
    './../database.json',
    import.meta.url
  );
  const fileData = (await readFile(databaseFile)).toString();
  const currentData = JSON.parse(fileData);
  currentData.push(newData);
  await writeFile(databaseFile, JSON.stringify(currentData));
};
