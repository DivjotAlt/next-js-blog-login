import { addViewToPost } from "../../lib/posts";
export default function handler(req, res) {
  const { postId } = req.query;
  let currentViews = addViewToPost(postId);
  res.status(200).json({ views: currentViews });
}
