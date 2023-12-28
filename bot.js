const { Telegraf } = require('telegraf');
const Binlookup = require('binlookup');
const figlet = require('figlet');
const bot = new Telegraf('5913815080:AAFv5x_9EYHMkp3Mz-i_VgfzQWqT15ThmfI');
const binlookup = new Binlookup();

bot.start((ctx) => ctx.reply('Selamat datang! Kirimkan nomor BIN untuk mengecek informasinya.'));

bot.command('bin', async (ctx) => {
  const binNumber = ctx.message.text.trim();

  if (!isValidBin(binNumber)) {
    return ctx.reply('Format BIN tidak valid. Harap kirim nomor BIN yang benar.');
  }

  try {
    const result = await binlookup.lookup(binNumber);
    if (result) {
      return ctx.reply(`Informasi BIN:\nBrand: ${result.brand}\nType: ${result.type}\nCountry: ${result.country}`);
    } else {
      return ctx.reply('Tidak dapat menemukan informasi untuk BIN ini.');
    }
  } catch (error) {
    console.error('Error during BIN lookup:', error);
    return ctx.reply('Terjadi kesalahan saat mencari informasi BIN.');
  }
});

function isValidBin(bin) {
  // Implement your own validation logic for BIN numbers
  // For simplicity, let's assume a valid BIN is a numeric string of length 6
  return /^\d{6}$/.test(bin);
}

bot.use((ctx, next) => {
  const command = ctx.message.text;
  commandHistory.push(command);
  console.log(`Command received: ${command}`);
  next();
});

bot.launch();

figlet('HLX BOT SIAP', function(err, data) {
  if (err) {
    console.log('Terjadi kesalahan:', err);
    return;
  }
  console.log(data);
});
