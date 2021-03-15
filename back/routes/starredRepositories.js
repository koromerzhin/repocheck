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

async function getStar(param)
{
  const query =  `
  {
    viewer {
      starredRepositories(${param}) {
        totalCount,
        pageInfo {
          endCursor,
          startCursor
        }
        edges {
          node {
            id
            owner {
              login
              avatarUrl
              url
            }
            createdAt
            sshUrl
            updatedAt
            pushedAt
            description
            url
            isArchived
            name
            licenseInfo {
              name
            }
            stargazerCount
            forkCount
            releases(first: 1) {
              totalCount
            }
            languages(first: 10) {
              totalCount
              edges {
                node {
                  id
                  color
                  name
                }
              }
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
  const result = await getStar(params);
  res.json(result);
});

module.exports = router;