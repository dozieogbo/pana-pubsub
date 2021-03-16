# Simple Pub/Sub Sample

To set up, create a .env file (optional) and set the app port as follows.

`PORT=8000`

Install dependencies

`yarn`

Run app

`yarn start`


There are 2 test endpoints you can use to test the subscription i.e. 

`/test1`
`/test2`

## Assumptions & Limitations

- Currently uses an in-app memory as opposed to an external persistence so everything resets when the app is restarted.
- Users who subscribe to a topic would like to be pinged when data is published to the topic, regardless of casing.
- The same app is allowed to act as both a subscriber and publisher.
