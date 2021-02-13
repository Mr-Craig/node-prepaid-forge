# node-prepaid-forge

A node.js api wrapper for https://prepaidforge.com

The usage is pretty self-explantory just use this as a reference https://www.notion.so/PrepaidForge-API-Integration-b57e925dd11049228d74c04d62452499

Look at test.js for usage

```
npm i prepaid-forge
```


# Disclaimer

The API Token expires before the time given by the prepaid forge api. You also can't request a new API token until the token has expired. I've put in a workaround but be prepared for up to 30 seconds of delay time in executing your query. If you have a better work around please fork.
