# Challenge Test

## Setup

- Make sure to have Node installed.
- To install dependencies run `yarn install`.

## Start the app

- To start the development server run `nx serve challenge-test`.
- Open your browser and navigate to http://localhost:4200/.

## Stack

- NX
- React
- Redux
- Material UI
- Material Icons
- Jest
- Playwright
- Firebase
- Azure Static Web App Service

## Features

- Dark/Light Theme
- Firebase Auth with Email/Password and Google Sign In
- State management with Redux
- Firebase Database for users and real time chat
- Unit Testing
- Coverage Reporter (in console and html)
- E2E Testing
- Linting
- Formatting with Prettier
- Github Action to build and deploy app to Azure
- Deployed in Azure
- Skeletons in Loading states
- Responsive
- Pre-push check action with Husky
- CI/CD with Github Actions and Azure

## Deploy

[Find the deployed app here](https://challenge.luispablolopez.com/)

## Pages

#### /auth/login

- Displays the login form and the Google Sign In button

![Login Light Theme](/screenshots/login-light.png?raw=true "Login Light Theme")

![Login Dark Theme](/screenshots/login-dark.png?raw=true "Login Dark theme")

#### /auth/register

- Displays the register form

![Register Light Theme](/screenshots/register-light.png?raw=true "Register Light Theme")

![Register Dark Theme](/screenshots/register-dark.png?raw=true "Register Dark theme")

#### /

- Just displays a dashboard with couple of counters that redirects you to Clientes or Conversaciones pages.

![Dashboard Page](/screenshots/dashboard.png?raw=true "Dashboard Page")

#### /clientes

- Displays a list of Clientes (the ones received in the email, let's call them mock clients)
- Displays a little counter of clients
- Displays a list of Clientes Verificados which are the users registered with the app's auth system.

**NOTE:** Mocked clients are just showable, explanation on next block.

![Clientes Page](/screenshots/clientes.png?raw=true "Clientes Page")

#### /clientes/:clientId

- Displays the client profile with a list of the client's conversations
- Displays a card with client's details.
- If is a mocked client, it displays the conversation taken from the received data on the email with requirements.
- Clicking an element of this conversations list takes you to `/conversacion/:conversationId`
- If is a Verified Client it will show a button to Start Chat with the client
- If there's an open conversation already with this client it will be displayed on the list so it can be continued and if clicked it takes you to `/chat/:chatId`.

**NOTE:** Conversacion and Chat pages are different behavior, explanation on next blocks.

![Cliente Mock Page](/screenshots/cliente-mock.png?raw=true "Cliente Mock Page")

![Cliente Real Page](/screenshots/cliente-real.png?raw=true "Cliente Real Page")

#### /conversaciones

- It displays a table with the data of the received conversations on the email of the Mocked Clients
- Clicking any element of this list takes you to the details of the mocked conversation, page `/conversacion/:conversationId`

![Conversaciones Page](/screenshots/conversaciones.png?raw=true "Conversaciones Page")

#### /conversaciones/:conversationId

- It displays the details and messages of the mocked conversation received on the email

**NOTE**: Conversaciones and Conversacion page were just created to displayed the received data of the email, the real time feature example is in chat page.

![Conversacion Page](/screenshots/conversacion.png?raw=true "Conversacion Page")

#### /chat/:chatId

- When is a verified client and you click Start Chat, it creates a real time chat with the client
- You'll find the details of the chat and below the input to write your first message
- The other user will receive the message at the moment you send it, try this with another registered colleague to confirm it's working.

![Chat Page](/screenshots/chat.png?raw=true "Chat Page")


## CI/CD

This process is done by Github Actions and deployed on Azure Static Web App service.

The Github Action can be found on `.github/workflows`, this action runs when the push is in `main` branch or in pull-requests.

The steps the action do are:

- Install dependencies
- Run Lint
- Run Tests
- It cleans the dist folder
- Install required actions packages
- Get the Github Id Token
- Build app and deploy with static-web-apps-deploy (this step runs yarn build internally)

## Firebase

To have a backend implementation for this challenge I decided to use Firebase as it's simple and fast to implement and understand, nice to build a MVP.
Firebase Auth is used to have Email/Password and Google Sign In authentication.
Firebase Database is used as storage and using the real time database feature it has it is used for the chat functionality.

## Useful Commands

To do production build, this will build the app to `dist/apps/challenge-test`

```
yarn build
```

Lint code

```
yarn lint
```

Prettier run

```
yarn prettier
```

Unit Tests run

```
yarn test
```

Open coverage after running unit tests

```
yarn open-coverage
```

End To End Tests run

```
yarn e2e
```
