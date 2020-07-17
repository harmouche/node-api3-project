const express = require('express');

const router = express.Router();

const Posts = require('./postDb');

router.get('/', (req, res) => {
  // do your magic!
  Posts.get(req.query)
  .then(posts => {
    res.status(200).json(posts);
    console.log("Posts from get", Posts)
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ 
      message: 'Error retrieving the post'
    });
  });
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  Posts.getById(req.params.id)
  .then(post => {
    if(post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({ message: 'Post not found'})
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving the post'})
  })
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  Posts.remove(req.params.id)
  .then(count => {
    if(count === 0){
      res.status(404).json({
        message: 'The post with the specified ID does not exist'
      })
    } else {
      res.status(200).json(count);
    }
  })
  .catch(err => {
    res.status(500).json("Error occured")
  })
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  Posts.update(req.params.id, req.body)
  .then(post => {
    if(post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'The post could not be found'})
    }
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json({
      message: 'There was an error updating the post'
    });
  });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  Posts.getById(id)
  .then(post => {
    if(post) {
      req.post = post;
      next();
    } else {
      res.status(400).json({ message: 'Invalid post id' });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message:`there was a problem with your ${req.method} request`
    });
  });
}

module.exports = router;
