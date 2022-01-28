var express = require('express');
const { graphql } = require("@octokit/graphql");
var router = express.Router();
require('dotenv').config()
const totalParPage = 50;
const graphqlWithAuth = graphql.defaults(
  {
    headers: {
      authorization: "token " + process.env.VUE_APP_GITHUB_TOKEN,
    }
  }
)

async function follow(param)
{
  const query =  `mutation{
    followUser(input: {userId: "${param}"}) {
      clientMutationId
    }
  }`;
  return await graphqlWithAuth(query);
}

async function unfollow(param)
{
  const query =  `mutation{
    unfollowUser(input: {userId: "${param}"}) {
      clientMutationId
    }
  }`;
  return await graphqlWithAuth(query);
}

async function addStar(param)
{
  const query =  `mutation{
    addStar(input: {starrableId: "${param}"}) {
      clientMutationId
    }
  }`;
  return await graphqlWithAuth(query);
}

async function removeStar(param)
{
  const query =  `mutation{
    removeStar(input: {starrableId: "${param}"}) {
      clientMutationId
    }
  }`;
  return await graphqlWithAuth(query);
}

router.get('/unfollow', async function (req, res, next) {
  try {
    const result = await unfollow(req.query.id);
    res.json(result);
  } catch (error) {
    res.send(error);
  }
});

router.get('/follow', async function (req, res, next) {
  try {
    const result = await follow(req.query.id);
    res.json(result);
  } catch (error) {
    res.send(error);
  }
});

router.get('/star/', async function (req, res, next) {
  res.send('test');
});

router.get('/star/add', async function (req, res, next) {
  try {
    const result = await addStar(req.query.id);
    res.json(result);
  } catch (error) {
    res.send(error);
  }
});

router.get('/star/remove', async function (req, res, next) {
  try {
    const result = await removeStar(req.query.id);
    res.json(result);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;