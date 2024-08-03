<h1 align="center">Swallow</h1>

<div align="center">
<img src="https://img.shields.io/badge/-Node.js-339933.svg?logo=node.js&style=for-the-badge"><img src="https://img.shields.io/badge/-Npm-CB3837.svg?logo=npm&style=for-the-badge"><img src="https://img.shields.io/badge/-Pnpm-BD081C.svg?logo=pnpm&style=for-the-badge"><img src="https://img.shields.io/badge/-Eslint-4B32C3.svg?logo=eslint&style=for-the-badge"><img src="https://img.shields.io/badge/-Prettier-F7B93E.svg?logo=prettier&style=for-the-badge">
</div>

<p align="center">
<image src="https://github.com/Fyphen1223/Swallow/assets/89511960/872ace42-9e44-4092-96d2-5e82e6d85466" width="300px">
</p>
<div align="center">

[![CodeFactor](https://www.codefactor.io/repository/github/fyphen1223/swallow/badge)](https://www.codefactor.io/repository/github/fyphen1223/swallow)

Swallow is a versatile yet easy-to-use and fast Discord music bot written in Node.js

[Roadmaps](./ROADMAPS.md), [Change log](./CHANGELOG.md)

<h1 align="center">What you expect for Swallow</h1>

#### ⚡ Insanely fast

#### 👍 Wide-variety content loading from famous providers to minor providers

#### 🖐️ Easy-to-use, informative, intuitive UI for users

#### ✅ Compatible with LavaLink and NodeLink, using TsumiLink client

#### 🤤 Low-end PC friendly, works with even Raspberry Pi

#### 🧠 Completely optional AI system integrated, with voice recognition and more

<h1 align="center">What you can expect future for Swallow</h1>

#### ✅ Dashboard system that can be used through Discord Activity

#### 🔈 Additional audio providers

<h1 align="center">What not to expect for Swallow</h1>

#### 🤮 Insanely laggy audio streaming with limited sources

#### 🫠 Takes too much time for local setup, takes up a lot of disk space like a blackhole

#### ☹ Hard to configure, too complex code system to re-write

</div>

<h1 align="center">Requirements</h1>

Node.js, npm, pnpm

> [!IMPORTANT]
> Install or update pnpm using this command below
>
> `npm i pnpm@latest -g`

#### First, clone this repository using this command

```bash
git clone https://github.com/Fyphen1223/Swallow
```

#### Second, cd into that directory and execute this command

```bash
pnpm i
```

#### Third, create config.json according to config.example.json file

<details>

<summary>If you want to use voice recognizer</summary>

Create a new folder and cd into it, then use nvm or something like that to use older Node.js version to install vosk (as 18< version of Node.js is not copmatible with it)

Second, copy everything in that `node_modules` folder and paste it into the original `node_modules`.

Third, download models and then put them in models directory, naming them as their capable language name.

I will soon release compressed `node_modules` folder.

</details>

#### Lastly, run the bot by just executing this command

```bash
pnpm run start
```

<br>

<details>

<summary>When you encounter error</summary>

First, please make sure that you have installed Node.js and pnpm correctly.

Second, try removing `node_modules` folder and re-install packages.

Third, make sure Lava/NodeLink is running if you configured it in config.json.

Lastly, if you still have a problem, please create an issue and let me know!

</details>

<h1 align="center">Showcase</h1>

Music card example:
![image](https://github.com/Fyphen1223/Swallow/assets/89511960/042d6aaf-24cb-44cc-8d91-41addcf25f17)
