const fs = require('node:fs');
const log = require('./util/log.js');

const { bootServer } = require('./server/server.js');

if (!fs.existsSync('./config.json')) {
	log.warn(`No config file detected, creating...`, true, true);
	fs.copyFileSync('./assets/default/config.example.json', './config.json');
	log.warn(`Config file created, please edit it and reboot.`, true, true);
	process.exit(1);
}

try {
	require('./config.json');
} catch (_) {
	log.error(
		`Config file is broken, please try deleting it and rebooting to fix this issue. : ${err}`,
		true,
		true
	);
	process.exit(1);
}

const config = require('./config.json');
if (!config.bot.token || !config.bot.applicationId) {
	log.error(
		`Config file is missing required fields, please edit it and reboot.`,
		true,
		true
	);
	log.error(
		`Required fields: ${!config.bot.token ? `bot.token` : ``} ${
			!config.bot.applicationId ? `bot.applicationId` : ``
		}`,
		true,
		true
	);
	process.exit(1);
}

if (config.dashboard.enabled) bootServer();

const path = require('node:path');

const { playerQueue } = require('./util/queue.js');
const { database } = require('./util/database.js');

globalThis.queue = new playerQueue();

const discord = require('discord.js');
const { TsumiInstance } = require('tsumi');

const client = new discord.Client({
	intents: [
		discord.GatewayIntentBits.GuildEmojisAndStickers,
		discord.GatewayIntentBits.GuildIntegrations,
		discord.GatewayIntentBits.GuildMembers,
		discord.GatewayIntentBits.GuildMessageReactions,
		discord.GatewayIntentBits.GuildMessageTyping,
		discord.GatewayIntentBits.GuildMessages,
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
	userAgent: 'Swallow/0.0.1',
});

client.commands = new discord.Collection();
client.buttons = new discord.Collection();

function createFolderIfNotExists(folderPath) {
	if (!fs.existsSync(folderPath)) {
		fs.mkdirSync(folderPath);
	}
}

const folders = [path.join(__dirname, 'data'), path.join(__dirname, 'log')];
folders.forEach((folderPath) => {
	createFolderIfNotExists(folderPath);
});

/*
 * @param {String} filename
 * @return {String}
 * @description Sanitize the filename to prevent illegal characters.
 * @example sanitizeFileName('2021-09-01T00:00:00.000Z.txt') => '2021-09-01T00-00-00.000Z.txt'
 */
function sanitizeFileName(filename) {
	return filename.replace(/:/g, '-');
}

function createFileIfNotExists(filePath) {
	if (!fs.existsSync(filePath)) {
		fs.writeFileSync(
			filePath,
			filePath.match('log')
				? sanitizeFileName(new Date().toISOString() + '\n')
				: JSON.stringify({})
		);
	}
}

const file = [
	path.join(__dirname, 'data', 'guilds.json'),
	path.join(__dirname, 'log', 'log.txt'),
	path.join(__dirname, 'data', 'premium.json'),
];
file.forEach((filePath) => {
	createFileIfNotExists(filePath);
});

globalThis.guilds = new database({ database: 'local' });
globalThis.premium = new database({ database: 'local' });

const logFilePath = path.join(__dirname, 'log', 'log.txt');
const logContent = fs.readFileSync(logFilePath, 'utf8').trim().split('\n')[0];
const compressedFileName = logContent + '.txt';
const compressedFilePath = path.join(
	__dirname,
	'log',
	sanitizeFileName(compressedFileName)
);

fs.writeFileSync(logFilePath, new Date().toISOString() + '\n');

fs.renameSync(logFilePath, compressedFilePath);
fs.writeFileSync(logFilePath, new Date().toISOString() + '\n');

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
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

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

const buttonsPath = path.join(__dirname, 'buttons');
const buttonFiles = fs.readdirSync(buttonsPath).filter((file) => file.endsWith('.js'));
for (const file of buttonFiles) {
	const filePath = path.join(buttonsPath, file);
	const button = require(filePath);
	if ('data' in button && 'execute' in button) {
		client.buttons.set(button.data.customId, button);
	} else {
		log.warn(
			`The button at ${filePath} is missing a required "data" or "execute" property.`,
			true,
			config.config.log.saveToFile
		);
	}
}

globalThis.Tsumi.on('ready', () => {
	log.info('Tsumi is ready', true, config.config.log.saveToFile);
});

client.on('raw', (data) => {
	globalThis.Tsumi.handleRaw(data);
});

client.login(config.bot.token);
