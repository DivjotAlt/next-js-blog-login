import jwt from "jsonwebtoken";

const secretPhrase =
  "Hello, my name is Divjot, hope that your day is going well :)";

export function createToken(username, password) {
  return jwt.sign({ username, password }, secretPhrase);
}

export function isTokenCorrect(token) {
  let verifiedToken;
  try {
    verifiedToken = jwt.verify(token, secretPhrase);
  } catch (_) {
    verifiedToken = false;
  }
  return !!verifiedToken;
}

export function getTokenContent(token) {
  return isTokenCorrect(token) ? jwt.verify(token, secretPhrase) : null;
}
