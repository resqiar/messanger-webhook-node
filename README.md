# messanger-webhook-node
A fairly simple messenger bot example.
This bot does a simple task; asking name, birthdate, and return how many days left for user's next birthday.

## Demo
This code is live on Heroku platform, bot can be accessed by doing steps below.
1. Navigate to [Messanger](https://www.messenger.com/) <br>
![Dashboard Messenger Image](https://i.imgur.com/DCQEuH2.png)
2. Search for new message with bot-testing-node, or follow this link [https://www.messenger.com/t/101624075397676](https://www.messenger.com/t/101624075397676) <br>
![Search Messenger Image](https://i.imgur.com/hGVQ3uZ.png)
3. Start messeging and say hi! <br>
![Messeging Messenger Image](https://i.imgur.com/87MrN2x.png)


## How to install 
- Clone this repository
```
git clone https://github.com/resqiar/messanger-webhook-node.git
```
- Rename sample-env.txt to .env and **satisfy all the keys** 
```
VERIFY_TOKEN= <YOUR CUSTOM TOKEN HERE>
ACCESS_TOKEN= <YOUR FACEBOOK TOKEN HERE>

# DATABASE KEY
DB_HOST= <YOUR DATABASE HOST>
```
> 💡 Tips: If you want to deploy to Heroku, navigate to [config vars](https://devcenter.heroku.com/articles/config-vars), and write your environtment variables there. 

- Install all the dependencies
```
npm install
```
> 💡 Tips: This bot uses Mongodb as a database, you can set-up your cluster [here](https://www.mongodb.com), otherwise you can change to whatever database you prefer.

## Facebook Page, Facebook App, Facebook Access Token
This bot use Facebook webhook services that requires you to create your own Facebook Page and a PAGE_ACCESS_TOKEN that will use to communicate between our server
and Facebook server through a webhook. If you dont have one please create your own first [HERE](https://developers.facebook.com/)

## Deployment 
To deploy a live webhook that can receive webhook events from the Messenger Platform, your code must be hosted on a public HTTPS server that meets the following requirements:
- HTTPS support, Self-signed certificates are not supported
- A valid SSL certificate
- An open port that accepts GET and POST requests

Facebook webhook requires a valid SSL certificates to sent a data to our endpoints, so we need cloud to handle this, at this point you can use whatever service you like,
like AWS, Heroku, or even your own machine. i personally prefer Heroku as a PaaS, learn more about deployment on [Heroku Devcenter](https://devcenter.heroku.com/articles/deploying-nodejs)

## REST ENDPOINTS
Used to get or modify messages that the bot captured from the user. 
> 💡 Tips: This bot is live on Heroku platform. Therefore, **BASE_URL** is on https://secret-gorge-09638.herokuapp.com/

### GET All Messages
```
BASE_URL/messages
```
Return all received messages from the user to the bot in JSON format
```
[
    {
      "_id": "6077e7a0e184a300152af32e",
      "message": "2000-5-2",
      "sender_id": "4219814188031847",
      "createdAt": "2021-04-15T07:13:36.449Z",
      "updatedAt": "2021-04-15T07:13:36.449Z",
      "__v": 0
    },
    {
      "_id": "6078600a9799a70015ded33b",
      "message": "hi",
      "sender_id": "4219814188031847",
      "createdAt": "2021-04-15T15:47:22.747Z",
      "updatedAt": "2021-04-15T15:47:22.747Z",
      "__v": 0
    },
    {
      ...
    }
]
```
### GET Single Message
```
BASE_URL/messages/<id>
```
Return a single message by its ID in JSON format
```
 {
      "_id": "6077e7a0e184a300152af32e",
      "message": "2000-5-2",
      "sender_id": "4219814188031847",
      "createdAt": "2021-04-15T07:13:36.449Z",
      "updatedAt": "2021-04-15T07:13:36.449Z",
      "__v": 0
 }
```
### DELETE Single Message
```
BASE_URL/messages/<id>
```
Delete single message by its ID and return status in JSON format
```
 {
      "status": "DELETED",
 }
```
