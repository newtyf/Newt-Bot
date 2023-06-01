<h1 align="center">Juan Bot</h1>
<h6 align="center">Discord bot</h6>

<div align="center"><img src="https://user-images.githubusercontent.com/87625663/232165199-88c5f0b2-a210-48ea-ab99-1d546728f4c1.png" alt="game-image" width="150" /></div>

[comment]: <> (<p align="center">Live Site <a href="https://rps.newtyf.com/">Here</a>.</p>)


1. Bootstrapped with [Node JS](https://nodejs.org/en).

## 👾 Set Up

1. Node Version

  ```sh
  $ node version 18.7.0
  "you need use this node version or lastest for play music with opus"
  ```
  
2. Create an .env file based on .env.example

  ```env
    clientId= # required
    guildId= # required
    token= # required TOKEN BOT
    api_key_giphy= # required for gifs
    api_key_youtube= # optional
    environment=  # development || production
    NIXPACKS_NODE_VERSION= # optional
  ```

3. Install the dependencies

  ```sh
   npm install
   ```

4. Start development server

  ```sh
   npm run dev
   ```

## 👾 Run for production

1. run for production:

 ```sh
   npm run start
   ``` 
   
## 👾 Useful commands

  ```sh
   npm run insert
   "you use this command for deploy commands created"
   "if .env environment is "production" deploy in production bot otherwise in dev environment"
   ``` 
   
   ```sh
   npm run clear
   "you use this command for remove commands created"
   "if .env environment is "production" remove in production bot otherwise in dev environment"
   ``` 

  

### 🛠 Built with

- [Node Js](https://nodejs.org/en)
- [Discord JS](https://discord.js.org/#/) - NodeJs library
- [Discord-player](https://www.npmjs.com/package/discord-player) - NodeJs library
- [node-fetch](https://www.npmjs.com/package/node-fetch)
- [GIPHY](https://developers.giphy.com/)
- [Dotenv](https://www.npmjs.com/package/dotenv)

### 💻 Author

- Portfolio - [@newtyf](https://newtyf.com)
- Instagram - [@newtyf](https://www.instagram.com/newt_yf/)
- LinkedIn - [@newtyf](https://www.linkedin.com/in/axel-mu%C3%B1oz/)
- Frontend Mentor - [@newtyf](https://www.frontendmentor.io/profile/TREz-bits)
