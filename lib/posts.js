import fs from "fs";
import path from "path";
// const fs = require("fs");
// const path = require("path");

const postsFilePath = path.join(process.cwd(), "/data/posts.json");
export let postsFileContent = JSON.parse(
  fs.readFileSync(postsFilePath, "utf-8")
);
function clearViews() {
  for (let i = 0; i < postsFileContent.length; i++)
    postsFileContent[i].views = 0;
}

function updatePostsFile() {
  fs.writeFileSync(postsFilePath, JSON.stringify(postsFileContent));
}

export function getPostObject(id) {
  return postsFileContent.filter((post) => post.id === id)[0];
}

export function addViewToPost(postId) {
  let index = postsFileContent.indexOf(getPostObject(postId));
  let views = ++postsFileContent[index].views;
  if (process.env.NODE_ENV === "development") clearViews();
  updatePostsFile();
  return views;
}

export function newPost(postObject) {
  if (!postObject.id) {
    throw new Error(
      "`id` not found in parmeter postObject of newPost in `lib/pollPosts.js`"
    );
  }
  postObject.views = 0;
  postsFileContent.push(postObject);
  updatePostsFile();
  return postObject;
}

export function getPostNames() {
  return postsFileContent.map((postObject) => postObject.id);
}
