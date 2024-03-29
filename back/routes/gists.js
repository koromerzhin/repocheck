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

async function getGists(param)
{
  const query =  `
  {
    viewer {
      gists(${param}) {
        nodes {
          id
          name
          files {
            encodedName
            encoding
            extension
            name
            size
            text
          }
        }
      }
    }
  }`;
  return await graphqlWithAuth(query);
}

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    let total = totalParPage;
    if (req.query['total'] !== undefined) {
      total = parseInt(req.query['total']);
    }
    let params = `first:${total}`;
    if (req.query['after'] !== undefined) {
      params += ` after:"${req.query['after']}"`
    }
    const result = await getGists(params);
    res.json(result);
  } catch (error)
  {
    res.send(error);
  }
});

module.exports = router;