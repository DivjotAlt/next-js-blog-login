import { accountExists, checkPassword } from "../../lib/accounts";
import { isTokenCorrect, getTokenContent } from "../../lib/token";

export default function handler(req, res) {
  const { token } = req.query;
  if (isTokenCorrect(token)) {
    const tokenContent = getTokenContent(token);
    if (tokenContent.username && tokenContent.password) {
      const { username, password } = tokenContent;
      if (accountExists(username)) {
        res.status(200).json({ verified: checkPassword(username, password) });
      } else {
        res
          .status(404)
          .json({ code: "The account found in the token doesn't exist" });
      }
    } else res.status(404).json({ code: "Server Error: Wrong token" });
  } else res.status(404).json({ code: "Server Error: Invalid token" });
}
