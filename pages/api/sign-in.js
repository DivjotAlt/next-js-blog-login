import { accountExists, checkPassword } from "../../lib/auth";
import { createToken } from "../../lib/token";

export default function handler(req, res) {
  const { username, password } = req.query;
  if (accountExists(username)) {
    if (checkPassword(username, password)) {
      res.status(200).json({ token: createToken(username, password) });
    } else {
      res.status(200).json({ code: "EPASSWRONG" });
    }
  } else {
    res.status(403).json({ code: "EACCNOTEXIST" });
  }
}
