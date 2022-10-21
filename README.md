# Omnipetal (Daemon) <img src="https://user-images.githubusercontent.com/68202118/162853416-0ca7c63b-0d6d-4d28-9c5c-3f165bb31811.png" width="25" height="25">
## Daemon for [Omnipetal (Client)](https://github.com/juaneth/Omnipetal)

## What is "Omnipetal Daemon"?
Omnipetal is a client for creating Minecraft Servers remotely using docker. We have two components, a Client and a Daemon, this repository is for the Daemon that connects to the Client via API. This can be installed on it's own however and it is basically an API for managing your servers over http.

<img src="https://user-images.githubusercontent.com/68202118/163295548-453fee68-0ef9-4483-bff4-75d16dda3776.png" height="300">

## Getting started

### Firstly
Ensure you have nodeJS installed and ready (if unsure run `node -v`) and pm2 installed. Then run the code below:

```
git clone https://github.com/juaneth/Omnipetal-Daemon.git
cd Omnipetal-Daemon
npm i
pm2 start src/index.js
```

## Config

API Config is all located in `./config.json` and you can change API settings there, eg. Port, Auth Key. If you cant find it, run `node .` then it should be created!
