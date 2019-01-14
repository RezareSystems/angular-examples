## Example application that shows various angular concepts, tools, libraries and many more.

### Includes examples showing:

- using ngrx for global app state management
  - use of ngrx/entities for manipulating and querying entity collections
  - use of ngrx/effects for handling asynchronous API calls with app state
  - use of ngrx-store-freeze for development purposes which ensures state is not being mutated
  - demonstration of **optimistic updates** with ngrx
- unit testing with Jest
  - instructions for migrating existing Angular app using Jaminse/Karma to Jest
  - various examples of unit testing services and also testing state reducers
- e2e testing with protractor
  - various examples of end to end testing with protractor
- using prettier for formatting typescript and stylesheets
  - using .prettierrc file for specifying formatter options
  - uses prettier plugin for Visual Studio Code
- linting typescript files using tslint
  - uses tslint plugin for Visual Studio Code
- uses json-server for mocking backend API server
  - sets up proxy for json-server API
- has both lazy-loaded and eagerly loaded modules

## Starting the application

To start the angular application run **ng serve**
To start the mock backend server run **npm run mockserver**
