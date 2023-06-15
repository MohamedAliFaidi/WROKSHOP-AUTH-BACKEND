const Post = require("../Models/Post");

async function addPost(req, res) {
  try {
    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

function getAllPosts(req, res) {
  Post.find()
    .then((posts) => {
      res.status(200).send(posts);
    })
    .catch((error) => {
      console.log(error);
    });
}

updatePost = async (req, res) => {
  try {
    const updated = await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
    });

    res.status(200).json(updated);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  addPost,
  getAllPosts,
  updatePost,
};
