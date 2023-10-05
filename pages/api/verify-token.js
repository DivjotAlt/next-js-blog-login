import { accountExists, checkPassword } from "../../lib/auth";
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
        res.status(404).json({ code: "EACCNOTEXIST" });
      }
    } else res.status(404).json({ code: "ETOKENWRONG" });
  } else res.status(404).json({ code: "ETOKENINVALID" });
}
