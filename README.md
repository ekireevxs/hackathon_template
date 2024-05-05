# Xsolla PayStation Jam

Application consists of 2 components:

1. `hosting` is a React application with pay-station iframe integrated in it.
2. `functions` is an Express (Node.js) application that uses api.xsolla.com to create PayStation token. It
   is [configured](functions/src/index.ts) to use demo project.

Deployment configuration described in [firebase.json](firebase.json) and [.firebaserc](.firebaserc)

## Local Development

Install dependencies:
1. `npm i -g firebase-tools`
2. `npm i`
3. `cd functions && npm i`
4. `firebase login`
5. `firebase use livedemo-hackathon`

To simplify local development, you can insert the token into the url as a query parameter, and not use generation from
the server.

```
http://localhost:4173/demo-page?token=${token}
```

If you are using sandbox token, add `&sandbox=1`

```
http://localhost:4173/demo-page?token=${token}&sandbox=1
```

## Deploy

Application is will deploy to firebase

functions:
Run `npm run deploy:functions`. After that see deployment url in job terminal, by example:
`✔  functions[token(us-central1)] Successful create operation.
Function URL (token(us-central1)): https://us-central1-livedemo-hackathon.cloudfunctions.net/token`

hosting:
Run `npm run deploy:hosting`. After that see deployment url in job terminal, by example:
`✔ hosting:channel: Channel URL (livedemo-hackathon-app): https://livedemo-hackathon-app.web.app [expires 2022-11-04 13:30:24]`

#### If you need to change the deployment settings, please contact the organizers.

## Communication api management

### ALWAYS INCLUDE THE PROJECT AS A CONDITION FOR COMMUNICATION. COMMUNICATION IS DISPLAYED IN PRODUCTION

**To execute the request for communication addition, please contact Evgeniy Kireev (e.kireev@xsolla.com).**

Relative with
the [documentation](https://xsolla.atlassian.net/wiki/spaces/PAYMENTS/pages/21701067146/Communications+with+users+on+Pay+Station+4#Background),
you can create any communication you want.

Examples of creating communication:

API endpoint: `https://communication-api.xsolla.com/api/communication`

Request Body:

**firstScreenCommunication**

```json
{
  "name": "Alipay",
  "behaviour": {
    "type": "firstScreenCommunication",
    "messages": {
      "text": "Testing for user"
    },
    "data": {
      "pid": 3623,
      "promotionType": "new_method",
      "iconName": "alipay.svg",
      "buttonText": "Try it out",
      "countryIso": "CN"
    }
  },
  "properties": {
    "is_active": true
  },
  "apply_criteria":  [
     [
        {
           "name": "project_id",
           "type": "array",
           "value": [
              "${your_project_id}"
           ],
           "operator": "in"
        },
        {
           "name": "user_id",
           "type": "string",
           "value": "1234",
           "operator": null
        }
     ]
  ]
}
```

**paymentMethodLabel**

```json
{
  "name": "Yota",
  "date_start": "2024-04-04T00:00:00.000Z",
  "date_end": "2024-04-18T00:00:00.000Z",
  "behaviour": {
    "type": "paymentMethodLabel",
    "messages": {
      "text": "NEW"
    },
    "data": {
      "pid": 3716,
      "promotionType": "new_method"
    }
  },
  "properties": {
    "is_active": true
  },
  "apply_criteria": [
    [
      {
        "name": "project_id",
        "type": "array",
        "value": [
          "${your_project_id}"
        ],
        "operator": "in"
      },
      {
        "name": "country_iso",
        "type": "string",
        "value": "US"
      }
    ]
  ]
}
```

**topMethodLabel**

```json
{
  "name": "Yota",
  "date_start": "2024-04-04T00:00:00.000Z",
  "date_end": "2024-04-18T00:00:00.000Z",
  "behaviour": {
    "type": "topMethodLabel",
    "data": {
      "pid": 3716,
      "promotionType": "new_method"
    }
  },
  "properties": {
    "is_active": true
  },
  "apply_criteria": [
    [
      {
        "name": "project_id",
        "type": "array",
        "value": [
          "${your_project_id}"
        ],
        "operator": "ni"
      },
      {
        "name": "country_iso",
        "type": "string",
        "value": "RU"
      }
    ]
  ]
}
```

The **operator** property is used for including or excluding certain criteria. For example, it can be used to exclude
certain project_id values:

```json
  {
  "name": "project_id",
  "type": "array",
  "value": [
    "${your_project_id}"
  ],
  "operator": "ni"
}
```

Swagger for more information: https://communication-api.nl-k8s-stage.srv.local/docs/swagger/index.html
