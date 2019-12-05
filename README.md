# This project was created through the Serverless-Stack.com tutorial

## Debriefing

What did you learn in the process of doing this tutorial?

* The fundamentals of creating a serverless API using AWS Lambda, including authentication, what S3's are vs a Database
* How simple AWS makes calls to the API using Amplify
* How to use bootstrap-react
* How to use hooks in React

What questions, thoughts, or concerns do you have about this technology stack and tutorial?

* Authentication piece of the tutorial seems to lack in completeness; for example, the suggestion in the hints for how to handle a user trying to submit a signup form when they already exist tells you to resend the confirmation code, when it should probably also have a check to see if the user is already confirmed rather than just sending a new code right off the bat.
* I also had an issue with the starter files that serverless-stack provided; the eslinter threw errors when trying to import/export modules, so I had to disable it.
* Overall I found it to be very comprehensive and thorough and a good introduction to serverless apps! 

What did you add to the App/project, and why?

* I added a canvas drawing component so users can add a sketch to add to their note instead of just a file attachment; I thought it could be an easy way to have a user illustrate something for their note without having to do it separately on their computer.
* I also added a row in the db for a track of when the note was updated; I thought this could be useful information for the user especially when they add lots of notes.

What do you see as some of the benefits/negatives of building Apps in the serverless stack?

* Benefits: easy deployment, don't have to worry about serving and the details because AWS takes care of it all for you, lots of support and built-in features and customizability so it's quicker to set up than a from scratch server, easier to scale
* Negatives: can be expensive depending on the size of the project, if you want to change which serverless provider you use it seems like it would be difficult/involve a complete code refactor, might be more difficult to debug errors/testing.

## Technologies Used

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In addition, it uses React Canvas, React Color, and React Bootstrap

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
