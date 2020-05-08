# Halcyon

A web application template.

[https://halcyon.chrispoulter.com](https://halcyon.chrispoulter.com)

## Technologies

-   React
    [https://reactjs.org](https://reactjs.org)
-   Apollo GraphQL
    [https://www.apollographql.com](https://www.apollographql.com)
-   FaunaDB
    [https://fauna.com](https://fauna.com)
-   Pusher
    [https://pusher.com](https://pusher.com)
-   Mailgun
    [https://www.mailgun.com](https://www.mailgun.com)
-   Sentry
    [https://sentry.io](https://sentry.io)
-   Vercel
    [https://vercel.com](https://vercel.com)

## Dependencies

To install global dependencies run the command:

    npm install -g yarn now

To configure the Now CLI run the command:

    now

To install the project dependencies run the command:

    yarn

## Running

Create a `.env` file in root directory:

```
# Client Settings
REACT_APP_PUSHER_APPKEY=
REACT_APP_PUSHER_CLUSTER=

REACT_APP_SENTRY_DSN=
REACT_APP_SENTRY_ENVIRONMENT=

# Api Settings
FAUNADB_SECRET=

JWT_SECURITYKEY=
JWT_ISSUER=
JWT_AUDIENCE=

SEED_EMAILADDRESS=
SEED_PASSWORD=

MAILGUN_DOMAIN=
MAILGUN_APIKEY=
MAILGUN_NOREPLY=

PUSHER_APPKEY=
PUSHER_APPID=
PUSHER_SECRET=
PUSHER_CLUSTER=

SENTRY_DSN=
SENTRY_ENVIRONMENT=
```

Start the application by running the command:

    now dev
