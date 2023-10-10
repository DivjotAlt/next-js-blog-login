import { getTokenContent } from "../../lib/token";
import { checkPassword } from "../../lib/accounts";

export default function handler(req, res) {
  const { token } = req.query;
  const tokenBody = getTokenContent(token);
  if (tokenBody) {
    if (checkPassword(tokenBody.username, tokenBody.password))
      res.status(200).json({ username: tokenBody.username });
    else res.status(403).json({ code: "Password in token is incorrect" });
  } else {
    res.status(500).json({ code: "Server error: invalid token" });
  }
}
