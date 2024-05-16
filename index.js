const config = require('./config.json');

const fs = require('node:fs');
const path = require('node:path');

const log = require('./util/log.js');
const { playerQueue } = require('./util/queue.js');

globalThis.queue = new playerQueue();

const discord = require('discord.js');
const { TsumiInstance } = require('tsumi');

const client = new discord.Client({
	intents: [
		discord.GatewayIntentBits.DirectMessageReactions,
		discord.GatewayIntentBits.DirectMessageTyping,
		discord.GatewayIntentBits.DirectMessages,
		discord.GatewayIntentBits.GuildBans,
		discord.GatewayIntentBits.GuildEmojisAndStickers,
		discord.GatewayIntentBits.GuildIntegrations,
		discord.GatewayIntentBits.GuildInvites,
		discord.GatewayIntentBits.GuildMembers,
		discord.GatewayIntentBits.GuildMessageReactions,
		discord.GatewayIntentBits.GuildMessageTyping,
		discord.GatewayIntentBits.GuildMessages,
		discord.GatewayIntentBits.GuildPresences,
		discord.GatewayIntentBits.GuildScheduledEvents,
		discord.GatewayIntentBits.GuildVoiceStates,
		discord.GatewayIntentBits.GuildWebhooks,
		discord.GatewayIntentBits.Guilds,
		discord.GatewayIntentBits.MessageContent,
	],
	partials: [
		discord.Partials.Channel,
		discord.Partials.GuildMember,
		discord.Partials.GuildScheduledEvent,
		discord.Partials.Message,
		discord.Partials.Reaction,
		discord.Partials.ThreadMember,
		discord.Partials.User,
	],
});

globalThis.discordClient = client;
globalThis.Tsumi = new TsumiInstance({
	botId: config.bot.applicationId,
	sendPayload: (guildId, payload) => {
		globalThis.discordClient.guilds.cache.get(guildId).shard.send(payload);
	},
	userAgent: 'Swallow/0.0.2',
});

client.commands = new discord.Collection();

function createFolderIfNotExists(folderPath) {
	if (!fs.existsSync(folderPath)) {
		fs.mkdirSync(folderPath);
	}
}

const folders = ['./data', './log', './cache'];
folders.forEach((folderPath) => {
	createFolderIfNotExists(folderPath);
});

function createFileIfNotExists(filePath) {
	if (!fs.existsSync(filePath)) {
		fs.writeFileSync(filePath, filePath.match('log') ? '' : JSON.stringify({}));
	}
}

const file = [
	'./cache/search.json',
	'./cache/searchResults.json',
	'./data/guilds.json',
	'./log/log.txt',
];
file.forEach((filePath) => {
	createFileIfNotExists(filePath);
});

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs
		.readdirSync(commandsPath)
		.filter((file) => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			log.warn(
				`The command at ${filePath} is missing a required "data" or "execute" property.`,
				true,
				config.config.log.saveToFile
			);
		}
	}
}

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

globalThis.Tsumi.on('ready', () => {
	log.info('Tsumi is ready', true, config.config.log.saveToFile);
});

client.on('raw', (data) => {
	globalThis.Tsumi.handleRaw(data);
});

client.login(config.bot.token);
