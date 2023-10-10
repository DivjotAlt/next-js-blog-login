import { accountExists, createAccount } from "../../lib/accounts";
import { createToken } from "../../lib/token";

export default function handler(req, res) {
  const { username, password } = req.query;
  if (username && password) {
    if (accountExists(username))
      res.status(403).json({ code: "Account already exists" });
    else {
      createAccount(username, password);
      res.status(200).json({ token: createToken(username, password) });
    }
  } else {
    res.status(500).json({ code: "Server error: `query wrong`" });
  }
}
