const { Telegraf } = require('telegraf');
const bch = require('@bochilteam/scraper');

const bot = new Telegraf('YOUR_TELEGRAM_BOT_TOKEN');

bot.start((ctx) => ctx.reply('Selamat datang di Bot YouTube Downloader! Kirimkan link video YouTube untuk mulai mendownload.'));

bot.on('text', async (ctx) => {
  const youtubeUrl = ctx.message.text.trim();

  try {
    // Mendapatkan informasi tentang video dari YouTube
    const videoInfo = await bch.youtubedlv2(youtubeUrl);

    // Mendownload video dan audio
    const videoDownloadUrl = await bch.download(videoInfo.videoFormats[0].url);
    const audioDownloadUrl = await bch.download(videoInfo.audioFormats[0].url);

    // Mengirim video dan audio ke pengguna
    ctx.replyWithVideo({ source: videoDownloadUrl });
    ctx.replyWithAudio({ source: audioDownloadUrl });
  } catch (error) {
    console.error(error);
    ctx.reply('Maaf, terjadi kesalahan saat memproses video YouTube.');
  }
});

bot.launch();
