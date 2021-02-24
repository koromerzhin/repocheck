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

async function getRepositories(privacy, param)
{
  const query =  `
  {
    viewer {
      repositories(privacy:${privacy},${param}) {
        totalCount,
        pageInfo {
          endCursor,
          startCursor
        }
        edges {
          node {
            id
            createdAt
            updatedAt
            pushedAt
            description
            url
            isArchived
            name
            issuesOpen: issues(states: OPEN) {
              totalCount
            }
            issuesClose: issues(states: CLOSED) {
              totalCount
            }
            owner {
              login
            }
            licenseInfo {
              name
            }
            pullRequestOpen: pullRequests(states: OPEN) {
              totalCount
            }
            pullRequestClose: pullRequests(states: CLOSED) {
              totalCount
            }
            defaultBranchRef {
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
router.get('/public', async function (req, res, next) {
  let total = totalParPage;
  if (req.query['total'] !== undefined) {
    total = parseInt(req.query['total']);
  }
  let params = `first:${total}`;
  if (req.query['after'] !== undefined) {
    params += ` after:"${req.query['after']}"`
  }
  const result = await getRepositories('PUBLIC,', params);
  res.json(result);
});
router.get('/private', async function (req, res, next) {
  let total = totalParPage;
  if (req.query['total'] !== undefined) {
    total = parseInt(req.query['total']);
  }
  let params = `first:${total}`;
  if (req.query['after'] !== undefined) {
    params += ` after:"${req.query['after']}"`
  }
  const result = await getRepositories('PRIVATE,', params);
  res.json(result);
});

module.exports = router;