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

async function getFollow(type, param)
{
  const query =  `
  {
    viewer {
      ${type}(${param}) {
        totalCount,
        pageInfo {
          endCursor,
          startCursor
        }
        nodes {
          bio
          url
          bioHTML
          location
          company
          avatarUrl
          createdAt
          name
          login
          websiteUrl
          createdAt
          updatedAt
          organizations {
            totalCount
          }
          starredRepositories{
            totalCount
          }
          repositories {
            totalCount
          }
        }
      }
    }
  }`;
  return await graphqlWithAuth(query);
}

/* GET home page. */
router.get('/following', async function (req, res, next) {
  try {
    let total = totalParPage;
    if (req.query['total'] !== undefined) {
      total = parseInt(req.query['total']);
    }
    let params = `first:${total}`;
    if (req.query['after'] !== undefined) {
      params += ` after:"${req.query['after']}"`
    }
    const result = await getFollow('following', params);
    res.json(result);
  } catch(error) {
    res.send(error);
  }
});

/* GET home page. */
router.get('/followers', async function (req, res, next) {
  try {
    let total = totalParPage;
    if (req.query['total'] !== undefined) {
      total = parseInt(req.query['total']);
    }
    let params = `first:${total}`;
    if (req.query['after'] !== undefined) {
      params += ` after:"${req.query['after']}"`
    }
    const result = await getFollow('followers', params);
    res.json(result);
  } catch(error) {
    res.send(error);
  }
});
router.get('/', async function (req, res, next) {
  res.send('test');
});

module.exports = router;