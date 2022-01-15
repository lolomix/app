![Deploy on Live Channel](https://github.com/cryptoChefs/app/actions/workflows/deploy-to-firebase-hosting.yml/badge.svg?event=release)

# CryptoChefs - Main App

This is the source code of the main app of CryptoChefs - including but not limited to market, kitchen and the buffet.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

We do not currently have a dockerized environment, so the easiest way to run the app is on your local machine.
The app can be up and running in minutes as long as you have all the requirements.

### Environmental Requirements

These packages must be installed globally on your machine.

- Node > 16.13 (LTS)
- Yarn >= 1.19.1

### The .env file

We use dotenv to provide all the environmental files to the application. There is an `.env.sample` file
in the repository that is almost ready for local development.

1. Please make copy of this file and name it `.env` by running the `cp .env.sample .env` command on macOS or Linux.
2. Replace the `{ADD_INFURA_ID}` placeholder with an INFURA ID. You can use your own key or we can provide one for you. Please ask one of the members.

### App Dependencies

Please install the dependencies of the app and try to keep it up to date for the best experience.
Running `yarn install` will install/update all the packages that the app needs according to the `yarn.lock` file.

### Running the App

Run the `yarn start` in order to run the app in development mode. It supports hot reloading, feel free to edit the
files while the app is running. You should be able to see most of the changes instantly. If not, however, then you can
always close the app and then start it again.

## Available Commands

In the project directory, you can run the following commands:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Documentation

- [Contribution Guidelines](CONTRIBUTING.md)
- [Deployment Workflows](DEPLOYMENT.md)
- [Style Guide](STYLEGUIDE.md)

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
