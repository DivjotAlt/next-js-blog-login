import { newPost } from "../../lib/posts";
import { getTokenContent } from "../../lib/token";
import { checkPassword } from "../../lib/accounts";

export default function handler(req, res) {
  let { id, description, heading, paragraph, token } = req.query;
  let author;
  if (!(id && description && token))
    res.status(500).json({ code: "Server error: Invalid query" });

  let tokenContent = getTokenContent(token);
  if (!tokenContent.username)
    res.status(500).json({ code: "Server error: Invalid token in query" });

  if (!checkPassword(tokenContent.username, tokenContent.password))
    res
      .status(500)
      .json({ code: "Password in account wrong", action: "logout" });
  else author = tokenContent.username;

  res.status(200).json({
    postId: newPost({
      id,
      desc: description,
      content: { heading, paragraph },
      author,
    }).id,
  });
}
