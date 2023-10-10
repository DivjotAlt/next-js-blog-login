import jwt from "jsonwebtoken";

const secretPhrase =
  process.env.NODE_ENV === "development"
    ? "Hello, my name is Divjot, hope that your day is going well :)"
    : process.env.TOKEN_PHRASE;

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
