import fs from "fs";
import path from "path";

const homeDir = process.cwd();
const dataFolderPath = path.join(homeDir, "data");

/**
 * path of the data file
 */
export const dataFilePath = path.join(dataFolderPath, "accounts.json");
/**
 * contents of data file as javascript array
 */
export let dataFileContents = JSON.parse(
  fs.readFileSync(dataFilePath, "utf-8")
);

function updateFile() {
  fs.writeFileSync(dataFilePath, JSON.stringify(dataFileContents));
}

/**
 * gets account details
 * @param {string} username
 * @param {string} password
 * @returns an object containing everything that is in the data file
 */
export function getAccount(username, password) {
  updateFile();
  return dataFileContents.filter((account) => {
    username === account.username && password === account.password;
  });
}

/**
 * Returns whether the account exists
 * @param {string} username
 * @returns boolean: whether the account exists
 */
export function accountExists(username) {
  return !!dataFileContents.filter((account) => {
    return username === account.username;
  })[0];
}

export function checkPassword(username, password) {
  return accountExists(username)
    ? dataFileContents.filter(
        (accountObj) => accountObj.username == username
      )[0].password === password
    : false;
}

/**
 * Creates an account if an account of the same username doesn't exist
 * @param {string} username
 * @param {string} password
 * @returns nothing
 */
export function createAccount(username, password) {
  if (!accountExists(username)) {
    dataFileContents.push({ username, password });
    updateFile();
  }
  return;
}

/**
 * Returns an array containing all usernames
 * @returns An array containing all usernames
 */
export function getUserNames() {
  return [...dataFileContents.map((userObject) => userObject.username)];
}

export function getPublicAccount(username) {
  let userObject = dataFileContents.filter(
    (obj) => obj.username === username
  )[0];
  return {
    username: userObject.username,
  };
}
