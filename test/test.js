const os = require('os');

// RAM使用量を取得
const totalMem = os.totalmem();
const freeMem = os.freemem();
const usedMem = totalMem - freeMem;

console.log(`Total Memory: ${totalMem / 1024 / 1024} MB`);
console.log(`Free Memory: ${freeMem / 1024 / 1024} MB`);
console.log(`Used Memory: ${usedMem / 1024 / 1024} MB`);

// CPU情報を取得
const cpus = os.cpus();
console.log(`CPU Core Count: ${cpus.length}`);
console.log(`CPU Model: ${cpus[0].model}`);
