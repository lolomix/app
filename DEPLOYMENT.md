# Deployment Workflows
We use Firebase's hosting solution to run our application. An automated workflow has been set up to install, test, 
build and deploy the application on particular events. We use GitHub Actions and you can find the relevant YAML files 
in the `.github` directory. The workflow deploys to destination channels on Firebase depending on the event that 
triggered the it.

## Pull Request (PRs) Event
Deploys to a randomly generated preview channel on Firebase.

## Push Event
Deploys to the staging preview channel on Firebase.

## Release Event
Deploys to the live channel on Firebase with the following URL - https://app.cryptochefs.io