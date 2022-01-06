# Contributing Guidelines
You can contribute to the repository by creating a pull request.  

## Why do we need PRs?
PRs help us to keep the development of new code isolated in a separate environment. They also come super 
handy generating notes for a new releases.

## Branching Model
We're following GitHub Flow branching model (it is also called the Simplified GitFlow). It's a 
branch-based lightweight workflow. 

You can read more here - https://docs.github.com/en/get-started/quickstart/github-flow

1. Create Branch
First, thing first is to make sure that you are on `master` branch and the latest changes has been pulled. There is no 
requirement or meaning being adding any prefix to name of the branch in this branching model (remember, we're 
trying to keep things simple). 
```bash
git checkout master
git pull
git checkout -b the-name-of-the-branch-or-feature-or-whatever   
```

2. Make the changes
Edit the files and make your changes. Commit the changes to the local branch. Give each commit a
descriptive message to help you and future contributors understand what changes the commit contains. 
Ideally, each commit contains an isolated, complete change.
```bash
git add path/to/the/file
git commit -m "simple but descriptive comment about the change"
git push origin the-name-of-the-branch-or-feature-or-whatever
```

3. Create a pull request (PR)
Navigate to the repository in the browser and create a pull request using your branch. You can find the URL to 
a preview environment in Actions once the build is complete. Please add a short but descriptive title in the PR, 
it helps us identify PRs in the future.

4. Seek out of Approvals
Please reach out to the tech team to review your PR. In an ideal scenario, you should be looking 
for 2 approvals at least from them.

5. Merge your pull request (PR)
Once your PR is reviewed and approved, merge your pull request. This will automatically merge your branch 
into the `master` branch. Presuming the tests and the build are successful, your changes will show up on our 
staging website. You can find the URL to this staging environment in the Actions Tab.