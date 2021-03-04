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

async function getFollowers(param)
{
  const query =  `
  {
    viewer {
      followers(${param}) {
        totalCount,
        pageInfo {
          endCursor,
          startCursor
        }
        edges {
          node {
            bio
            bioHTML
            company
            companyHTML
            avatarUrl
            createdAt
            name
            login
            websiteUrl
            organizations {
              totalCount
            }
          }
        }
      }
    }
  }`;
  return await graphqlWithAuth(query);
}

/* GET home page. */
router.get('/', async function (req, res, next) {
  let total = totalParPage;
  if (req.query['total'] !== undefined) {
    total = parseInt(req.query['total']);
  }
  let params = `first:${total}`;
  if (req.query['after'] !== undefined) {
    params += ` after:"${req.query['after']}"`
  }
  const result = await getFollowers(params);
  res.json(result);
});

module.exports = router;