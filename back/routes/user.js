var express = require('express')
const { graphql } = require("@octokit/graphql")
var router = express.Router()
require('dotenv').config()
const totalParPage = 50;
const graphqlWithAuth = graphql.defaults(
  {
    headers: {
      authorization: "token " + process.env.VUE_APP_GITHUB_TOKEN,
    }
  }
)

async function getStar(login, param)
{
  const query =  `
  {
    user(login:"${login}") {
      starredRepositories(${param}) {
        totalCount,
        pageInfo {
          endCursor,
          startCursor
        }
        nodes {
          id
          owner {
            login
            avatarUrl
            url
            repositories{
              totalCount
            }
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
          repositoryTopics(first: 10) {
            totalCount
            nodes {
              url
              topic {
                name
              }
            }
          }
          languages(first: 10) {
            totalCount
            nodes {
              id
              color
              name
            }
          }
        }
      }
    }
  }`;
  return await graphqlWithAuth(query);
}

async function getRepositories(login, param)
{
  const query =  `
  {
    user(login:"${login}") {
      repositories(${param}) {
        totalCount,
        pageInfo {
          endCursor,
          startCursor
        }
        nodes {
          id
          createdAt
          sshUrl
          updatedAt
          pushedAt
          description
          url
          isArchived
          name
          stargazerCount
          forkCount
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
          releases(first: 1) {
            totalCount
          }
          vulnerabilityAlerts {
            totalCount
          }
          submodules{
            totalCount
          }
          watchers {
            totalCount
          }
          repositoryTopics(first: 10) {
            totalCount
            nodes {
              url
              topic {
                name
              }
            }
          }
          languages(first: 10) {
            totalCount
            nodes {
              id
              color
              name
            }
          }
        }
      }
    }
  }`
  return await graphqlWithAuth(query)
}
router.get('/repositories', async function (req, res, next) {
  try {
    let total = totalParPage;
    if (req.query['total'] !== undefined) {
      total = parseInt(req.query['total']);
    }
    let params = `first:${total}`;
    if (req.query['after'] !== undefined) {
      params += ` after:"${req.query['after']}"`
    }
    let result = []
    if (req.query['login'] !== undefined) {
      result = await getRepositories(req.query.login, params);
    }
    res.json(result);
  } catch (error) {
    res.send(error);
  }
});
router.get('/stars', async function (req, res, next) {
  try {
    let total = totalParPage;
    if (req.query['total'] !== undefined) {
      total = parseInt(req.query['total']);
    }
    let params = `first:${total}`;
    if (req.query['after'] !== undefined) {
      params += ` after:"${req.query['after']}"`
    }
    let result = []
    if (req.query['login'] !== undefined) {
      result = await getStar(req.query.login, params);
    }
    res.json(result);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;