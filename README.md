# Reverse Web Proxy in NodeJS

When looking to share port 80 and [443](https://letsencrypt.org/getting-started/) between multiple hosts, I decided to use NodeJS with [http-proxy](https://www.npmjs.com/package/http-proxy).

The goal was to make the application handle requests sent to `http://public-ip/server1/pathto/myfile` by proxying it to `http://lan-server1/myapp/pathto/myfile`, etc

This project is an example of how you can do the same.

## Setup and Installation
  - Open `config.js` and configure your folder name to URL routes, the default URL if no matches found, and the path to your SSL certificate and key
  - Install the required packages `npm install`
  - Start the service `npm start`