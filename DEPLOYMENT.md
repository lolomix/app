# Deployment Workflows
We use Firebase's hosting solution to run our application. An automated workflow has been set up to install, test, 
build and deploy the application on particular events. We use GitHub Actions and you can find the relevant YAML files 
in the `.github` directory. The workflow deploys to destination channels on Firebase depending on the event that 
triggered it.

## PR Environments 
Deployment is triggered upon a Pull Request (PR) GitHub event. The url is randomly generated and the files
are hosted by a preview channel on Firebase. Debugging is enabled an uses a test network.
The URL is generated on the fly and output by the Deploy Job of the triggered workflow in Actions.

## Staging Environment
Deployment is triggered upon a Push/Merge GitHub event. The url should be permanent and the files
are hosted by the staging preview channel on Firebase. Debugging is enabled an uses a test network.
https://maindapp--staging-hpzex1ak.web.app/

## Production Environment
Deployment is triggered upon a Release GitHub event. The url should be permanent and the files
are hosted by the live channel on Firebase. Debugging is disabled an uses the polygon main network.
https://app.cryptochefs.io