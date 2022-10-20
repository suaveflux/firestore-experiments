# firestore-experiments

This project contains a bunch of tests related to firestore. I write these whenever I want to better understand how firestore works.

## How to run

To run any of the tests you'll need to to the following.

### Create test firebase project and generate a private key file for your service account

1. go to firebase console and create a project
1. In the Firebase console for the project, open Settings > Service Accounts
1. Click Generate New Private Key, then confirm by clicking Generate Key
1. save the JSON file containing the key in the root of this project under name ```creds.json``` (the file is .gitignored)

### UN-SKIP the scenarios you'd like to see

In order to not run every test every time I want to check one thing, all scenarios are marked to be skipped by default. so in order to run a scenario, find the ```describe.skip``` part of its declaration and remove the ```.skip``` part.

### run npm test or yarn test
