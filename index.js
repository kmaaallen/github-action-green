import fetch from "node-fetch";
import { getInput, setOutput, setFailed } from "@actions/core";
import { context } from "@actions/github";

try {
  // `url` input defined in action metadata file
  const url = getInput("url");
  console.log(`Tested url: ${url}!`);

  fetch(`https://api.websitecarbon.com/site?url=${url}`)
    .then((response) => response.json())
    .then((data) => setOutput("stats", data));

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  setFailed(error.message);
}
