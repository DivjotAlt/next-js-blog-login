import { accountExists, createAccount } from "../../lib/auth";
import { createToken } from "../../lib/token";

export default function handler(req, res) {
  const { username, password } = req.query;
  if (username && password) {
    if (accountExists(username)) res.status(403).json({ code: "EACCEXIST" });
    else {
      createAccount(username, password);
      res.status(200).json({ token: createToken(username, password) });
    }
  } else {
    res.status(200).json({ code: "EQUERYWRONG" });
  }
}
