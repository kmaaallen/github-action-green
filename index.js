const fetch = require("node-fetch");
const core = require("@actions/core");
const github = require("@actions/github");

try {
  // `url` input defined in action metadata file
  const url = core.getInput("url");
  console.log(`Tested url: ${url}!`);

  fetch(`https://api.websitecarbon.com/site?url=${url}`)
    .then((response) => response.json())
    .then((data) => console.log(data));

  core.setOutput("stats", data);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
