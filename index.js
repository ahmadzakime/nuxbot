const { Telegraf } = require('telegraf');
const fs = require('fs');
const bch = require("@bochilteam/scraper")
const Jimp = require('jimp');
const FormData = require('form-data');
const axios = require("axios");
const cheerio = require("cheerio");
const figlet = require('figlet');
const os = require('os');
const request = require('request');
const api = require("caliph-api");
const { Hercai } = require('hercai');
const herc = new Hercai();
const countryFlags = require('./lib/flag');
const { yta, ytv } = require('./lib/y2mate')
const s = require('./lib/scraper')

const bot = new Telegraf('6136209053:AAEMze5op88eNvucTXd2UkX-tGEuVFYBNw0');
const SLAZZER_API_KEY = '3247981dc7f047fdbc677c2a0e67d171'
 
let wait = '⏳ Mohon tunggu sebentar'

const {
    simple
} = require('./lib/myfunc')

const databasePath = 'users.json';
//___________FUNCTION___________//
function findUser(criteria, value) {
  return new Promise((resolve, reject) => {
    fs.readFile('users.json', 'utf8', (err, data) => {
      if (err) {
        reject('Terjadi kesalahan saat membaca file');
        return;
      }

      const database = JSON.parse(data);
      const users = database.users;

      const targetUser = users.find(user => user[criteria] === value);

      if (targetUser) {
        resolve(targetUser);
      } else {
        reject(`Tidak ada pengguna dengan ${criteria} ${value}`);
      }
    });
  });
}

function generateRandomPassword() {
  const length = 12; // Panjang kata sandi
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Karakter yang digunakan
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

// Fungsi untuk menyimpan perubahan ke dalam database JSON
function saveDatabase(database) {
  fs.writeFileSync('users.json', JSON.stringify(database, null, 2));
}

// Fungsi untuk memuat database JSON
function loadDatabase() {
  try {
    const data = fs.readFileSync('users.json', 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Gagal memuat database:', err);
    return { users: [] };
  }
}

function saveDatabase(database) {
  fs.writeFileSync(databasePath, JSON.stringify(database, null, 2));
}

// Fungsi untuk memuat database JSON
function loadDatabase() {
  try {
    const data = fs.readFileSync(databasePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Gagal memuat database:', err);
    return { users: [] };
  }
}

function heroku1() {
  try {
    const data = fs.readFileSync('heroku.json', 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Gagal memuat database:', err);
    return { users: [] };
  }
}

function heroku2(database) {
  fs.writeFileSync('heroku.json', JSON.stringify(database, null, 2));
}

function filterUsers(kriteria) {
  const database = loadDatabase();
  return database.users.filter(user => {
    // Ganti kondisi di bawah sesuai dengan kriteria yang Anda inginkan
    return user.username.toLowerCase().includes(kriteria.toLowerCase()) ||
           user.email.toLowerCase().includes(kriteria.toLowerCase())
           
  });
}

function heroku(criteria, value) {
  return new Promise((resolve, reject) => {
    fs.readFile('heroku.json', 'utf8', (err, data) => {
      if (err) {
        reject('Terjadi kesalahan saat membaca file');
        return;
      }

      const database = JSON.parse(data);
      const users = database.users;

      const targetUser = users.find(user => user[criteria] === value);

      if (targetUser) {
        resolve(targetUser);
      } else {
        reject(`Tidak ada pengguna dengan ${criteria} ${value}`);
      }
    });
  });
}

// Fungsi untuk memeriksa apakah pengguna terdaftar dalam daftar pemblokiran
function isUserBanned(userId) {
  const banList = getBanList();
  return banList.includes(userId);
}

// Fungsi untuk mendapatkan daftar pengguna yang diblokir dari file
function getBanList() {
  try {
    const banData = fs.readFileSync('ban.json');
    return JSON.parse(banData);
  } catch (error) {
    return [];
  }
}

// Middleware untuk memeriksa dan mengabaikan perintah dari pengguna yang diblokir
bot.use((ctx, next) => {
  const userId = ctx.from.id;
  if (isUserBanned(userId)) {
    return ctx.reply('Anda diblokir dari menggunakan bot ini.');
  }
  return next();
});

bot.use((ctx, next) => {
  const timestamp = new Date().toLocaleTimeString();
  const username = ctx.message.from.username || 'Unknown User';

  console.log(`[${timestamp}] User: @${username}, Command: ${ctx.message.text}`);
  next();
});

bot.start((ctx) => {
const username = ctx.message.from.username;
ctx.reply(`Halo ${username}! Nama saya HLXEvo Saya adalah Bot Telegram multi fungsi! Klik /menu untuk mengetahui lebih lanjut tentang cara menggunakan bot ini.

Kirim perintah /privacy untuk melihat syarat dan ketentuan penggunaan bot.
`)});

bot.command('menu', async (ctx) => {
  ctx.reply(`╭─❒ 「 Bot Info 」 
├ Creator :  [@ahmadzakiyo)
├ Sponsored :  [@BotFather]
├ Memory Used : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
├ Hostname : ${os.hostname()}
├ Platform : ${os.platform()}
╰❒ Runtime : ${simple.runtime(process.uptime())}

╭─❒ 「 Daftar Menu 」 
├ /ig link
├ 
├ 
╰❒ m`);
});

//______________SEARCH__________//
bot.command('github', async (ctx) => {
  const [criteria, value] = ctx.message.text.split(' ').slice(1);

  try {
    const user = await findUser(criteria, value);
    let hasil = `GITHUB STUDENT PACK
------------------------------------------------------
🔐Data Login 🔐
Username : ${user.username}
Email: ${user.email}
Pass: ${user.password} 

------------------------------------------------------
          ⚠️INFORMATION⚠️
• Data Login Email dan Github sama tidak ada perbedaan 
• Garansi Akun 3 Hari setelah Pembelian

Terimakasih sudah membeli di tunggu order selanjutnya 🙏`
    ctx.reply(hasil);
  } catch (error) {
    ctx.reply(error);
  }
});

bot.command('heroku', async (ctx) => {
  const [criteria, value] = ctx.message.text.split(' ').slice(1);

  try {
    const user = await heroku(criteria, value);
    let hasil = ` HEROKU 156$ 1 TAHUN
------------------------------------------------------
🔐Data Login 🔐
Username : ${user.username}
Email: ${user.email}
Pass: ${user.password}

------------------------------------------------------
          ⚠️INFORMATION⚠️
• Garansi Akun 3 Hari setelah Pembelian

Terimakasih sudah membeli di tunggu order selanjutnya 🙏`
    ctx.reply(hasil);
  } catch (error) {
    ctx.reply(error);
  }
});


bot.command('git', (ctx) => {
  const ownerChatId = '1265481161'; // Ganti dengan chat ID Anda
  const senderChatId = ctx.chat.id;
  const time = new Date().toLocaleString();
  
  if (senderChatId.toString() === ownerChatId) {
    const database = loadDatabase();
    const kriteria = ctx.message.text.split(' ').slice(1).join(' ');

    if (kriteria) {
      const filteredUsers = database.users.filter(user => {
        // Ganti kondisi di bawah sesuai dengan kriteria yang Anda inginkan
        return user.username.toLowerCase().includes(kriteria.toLowerCase())
               
      });

      if (filteredUsers.length > 0) {
        const response = filteredUsers.map(user => {
          return `       GITHUB STUDENT PACK
------------------------------------------------------
            🔐Data Login 🔐
       
Username : ${user.username}
Email: ${user.email}
Pass: ${user.password} 
Tanggal Pembuatan: ${user.tanggalPendaftaran}
Waktu Pembelian: ${time}

------------------------------------------------------
          ⚠️INFORMATION⚠️
• Data Login Email dan Github sama tidak ada perbedaan 
• Garansi Akun 3 Hari setelah Pembelian

Terimakasih sudah membeli di tunggu order selanjutnya 🙏`;
        }).join('\n');

        ctx.reply(response);
      } else {
        ctx.reply('Tidak ada pengguna yang cocok dengan kriteria tersebut.');
      }
    } else {
      ctx.reply('Harap masukkan kriteria pencarian setelah perintah.');
    }
  } else {
    ctx.reply('Anda tidak memiliki izin untuk menggunakan perintah ini.');
  }
});


bot.command('daftar', (ctx) => {
  const chatId = ctx.chat.id;
  const username = ctx.message.text.split(' ')[1];
  const email = ctx.message.text.split(' ')[2];
  const password = ctx.message.text.split(' ')[3];
  const tanggalPendaftaran = new Date().toLocaleDateString();
  const verificationStatus = false;

  const newUser = {
    username,
    email,
    password,
    tanggalPendaftaran,
    verificationStatus,
  };

  const database = loadDatabase();

  database.users.push(newUser);

  saveDatabase(database);

  ctx.reply(`Pendaftaran berhasil! Terima kasih, ${username}!`);
});

bot.command('ben', (ctx) => {
  const countryCode = ctx.message.text.split(' ')[1];
  
  // Mengecek apakah kode negara valid
  if (emojiFlags(countryCode)) {
    const flagEmoji = emojiFlags.get(countryCode);
    ctx.reply(`Emoji bendera untuk ${countryCode}: ${flagEmoji}`);
  } else {
    ctx.reply('Kode negara tidak valid atau emoji bendera tidak tersedia.');
  }
});

bot.on('photo', async (ctx) => {
  const photoId = ctx.message.photo[ctx.message.photo.length - 1].file_id;
  const photoFile = await ctx.telegram.getFile(photoId);

  const photoUrl = `https://api.telegram.org/file/bot${bot}/${photoFile}`;
  
  // Mengirim gambar ke remove.bg API untuk menghapus latar belakang
  const options = {
    method: 'POST',
    url: 'https://api.slazzer.com/v2.0/remove_image_background',
    formData: {
      source: request(photoUrl),
      api_key: SLAZZER_API_KEY,
    },
  };

  request(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const result = JSON.parse(body);

      // Mengirim gambar hasil penghapusan latar belakang
      if (result.success) {
        ctx.replyWithPhoto({ source: Buffer.from(result.output_url, 'base64') });
      } else {
        ctx.reply('Maaf, latar belakang tidak dapat dihapus. Pastikan gambar memiliki objek yang jelas.');
      }
    } else {
      ctx.reply('Terjadi kesalahan saat menghapus latar belakang.');
    }
  });
});

bot.command('s', async (ctx) => {
  const bin = ctx.message.text.split(' ')[1];
  const fileId = ctx.message.photo[ctx.message.photo.length - 1].file_id;

  // Mengirim stiker berdasarkan file_id
  ctx.telegram.createStickerSet(
    ctx.message.from.id,
    `CustomStickerBy${ctx.message.from.id}`,
    `StickerSetBy${ctx.message.from.id}`,
    {
      png_sticker: fileId,
      emojis: '🌟',
    }
  )
  .then(() => ctx.reply('Stiker kustom berhasil dibuat!'))
  .catch((error) => {
    console.error(error);
    ctx.reply('Maaf, terjadi kesalahan saat membuat stiker.');
  });
});

bot.command('ban', (ctx) => {
  const userId = ctx.message.text.split(' ')[1];

  if (!userId) {
    return ctx.reply('Mohon berikan User ID yang ingin diblokir.');
  }

  const banList = getBanList();
  if (!banList.includes(userId)) {
    banList.push(userId);
    fs.writeFileSync('ban.json', JSON.stringify(banList));
    ctx.reply(`Pengguna dengan User ID ${userId} telah diblokir.`);
  } else {
    ctx.reply(`Pengguna dengan User ID ${userId} sudah diblokir sebelumnya.`);
  }
});

bot.command('bin', async (ctx) => {
  const bin = ctx.message.text.split(' ')[1];

   if (!/^\d{6}$/.test(bin)) {
    return ctx.reply('Format nomor BIN tidak valid. Harap masukkan 6 digit angka.');
  }

  try {
    const response = await axios.get(`https://data.handyapi.com/bin/${bin}`);
    const binData = response.data;
    //console.log(binData)
    const flagEmoji = countryFlags[binData.Country.A2]

    const message = `BIN : ${bin}\nBrand: ${binData.Scheme}\nType : ${binData.Type}\nLevel : ${binData.CardTier}\nBank : ${binData.Issuer}\nCountry : ${binData.Country.Name} ${flagEmoji}\nNegara Bagian : ${binData.Country.Cont}\nStatus : ${binData.Status} ✔️
    `;

    ctx.reply(message);
  } catch (error) {
    console.error('Error fetching BIN data:', error.message);
    ctx.reply('Maaf, terjadi kesalahan saat mengambil data BIN. Silakan coba lagi nanti.');
  }
});

// Load database


bot.command('verif', (ctx) => {
  let database = JSON.parse(fs.readFileSync('users.json'));
  const users = database.users;
      
  const username = ctx.message.text.split(' ').slice(1).join(' ');
  const user = users.find(user => user.username === username);

  if (user) {
    user.verified = user.username.toLowerCase() === 'verifikasi';
    fs.writeFileSync('users.json', JSON.stringify(database, null, 2));
    ctx.reply(`Status verifikasi untuk ${username} berhasil diubah.`);
  } else {
    ctx.reply(`User dengan username ${username} tidak ditemukan.`);
  }
});

bot.command('herokuadd', (ctx) => {
  const [username, email, password, status] = ctx.message.text.split(' ').slice(1);

  if (username && email && password) {
    fs.readFile('heroku.json', 'utf8', (err, data) => {
      if (err) {
        ctx.reply('Terjadi kesalahan saat membaca file');
        return;
      }

      const database = JSON.parse(data);
      const users = database.users;

      users.push({ username, email, password });

      fs.writeFile('heroku.json', JSON.stringify(database), 'utf8', (err) => {
        if (err) {
          ctx.reply('Terjadi kesalahan saat menulis file');
          return;
        }
        ctx.reply('Data pengguna berhasil ditambahkan!');
      });
    });
  } else {
    ctx.reply('Format perintah salah. Gunakan /heroku [username] [email] [password]');
  }
});

//_____________LIST_______________//
bot.command('list', (ctx) => {
  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
      ctx.reply('Terjadi kesalahan saat membaca file');
      return;
    }

    const database = JSON.parse(data);
    const users = database.users;

    if (users.length > 0) {
      let response = 'Daftar Pengguna:\n';
      users.forEach((user, index) => {
        response += `
          ${index + 1}. Username: ${user.username}, Email: ${user.email}, Password: ${user.password}
        `;
      });
      ctx.reply(response);
    } else {
      ctx.reply('Tidak ada pengguna yang tersedia');
    }
  });
});

bot.command('listgh', (ctx) => {
  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
      ctx.reply('Terjadi kesalahan saat membaca file');
      return;
    }

    const database = JSON.parse(data);
    const users = database.users;
    const verificationStatus = false;

    if (users.length > 0) {
      let response = 'List Github Account:\n';
      users.forEach((user, index) => {
        response += `
------------------------------------------------------
🔐Data Login 🔐
Username : ${user.username}
Email: ${user.email}
Pass: ${user.password} 
Tanggal Pendaftaran: ${user.tanggalPendaftaran}
verifikasi Status: ${verificationStatus}
------------------------------------------------------`;
      });
      ctx.reply(response);
    } else {
      ctx.reply('Tidak ada pengguna yang tersedia');
    }
  });
});

bot.command('listheroku', (ctx) => {
  fs.readFile('heroku.json', 'utf8', (err, data) => {
    if (err) {
      ctx.reply('Terjadi kesalahan saat membaca file');
      return;
    }
    
    const time = new Date().toLocaleString();
    const database = JSON.parse(data);
    const users = database.users;

    if (users.length > 0) {
      let response = 'List Heroku Account:\n';
      users.forEach((user, index) => {
        response += `
------------------------------------------------------
🔐Data Login 🔐
Username : ${user.username}
Email: ${user.email}
Pass: ${user.password} 
Tanggal Pendaftaran: ${user.tanggalPendaftaran}
Waktu Pembelian: ${time}
------------------------------------------------------`;
      });
      ctx.reply(response);
    } else {
      ctx.reply('Tidak ada pengguna yang tersedia');
    }
  });
});
//buatkan saya progam nodejs dengan npm telegraf untuk melihat database json yang berisi username email dan password
//______________DELETE_____________//
bot.command('delgh', (ctx) => {
  const criteria = ctx.message.text.split(' ')[1]; // Misal: /hapus_user username
  const database = loadDatabase();

  const updatedUsers = database.users.filter(user => user.username !== criteria);
  database.users = updatedUsers;

  saveDatabase(database);

  ctx.reply(`Pengguna dengan username '${criteria}' berhasil dihapus dari database.`);
});

bot.command('delhk', (ctx) => {
  const criteria = ctx.message.text.split(' ')[1]; // Misal: /hapus_user username
  const database = heroku1();

  const updatedUsers = database.users.filter(user => user.username !== criteria);
  database.users = updatedUsers;

  heroku2(database);

  ctx.reply(`Pengguna dengan username '${criteria}' berhasil dihapus dari database.`);
});

bot.command('githubstalk', async (ctx) => {
  const username = ctx.message.text.split(' ')[1];

  if (!username) {
    return ctx.reply('Gunakan perintah /githubstalk [username] untuk mengetahui informasi GitHub.');
  }

  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    const user = response.data;

    const message = `
𝗜𝗗: ${user.id}
𝗝𝗲𝗻𝗶𝘀: ${user.type}
𝗨𝘀𝗲𝗿𝗻𝗮𝗺𝗲: ${user.login}
𝗡𝗮𝗺𝗮: ${user.name || 'Tidak Di Temukan'}
𝗕𝗶𝗼: ${user.bio || 'Tidak Di Temukan'}
𝗕𝗶𝗼 𝗟𝗶𝗻𝗸: ${user.blog || 'Tidak Di Temukan'}
𝗙𝗼𝗹𝗹𝗼𝘄𝗲𝗿: ${user.followers}
𝗙𝗼𝗹𝗹𝗼𝘄𝗶𝗻𝗴: ${user.following}
𝗣𝘂𝗯𝗹𝗶𝗰 𝗥𝗲𝗽𝗼: ${user.public_repos}
𝗣𝘂𝗯𝗹𝗶𝗰 𝗚𝗶𝘁𝘀: ${user.public_gists}
𝗘𝗺𝗮𝗶𝗹: ${user.email || 'Tidak Di Temukan'}
𝗧𝗮𝗻𝗴𝗴𝗮𝗹 𝗣𝗲𝗺𝗯𝘂𝗮𝘁𝗮𝗻: ${user.created_at}
    `;

    console.log('BERHASIL')
    ctx.replyWithPhoto({ url: user.avatar_url }, { caption: message });
  } catch (error) {
    ctx.reply('User GitHub tidak ditemukan.');
  }
});

bot.command('igstalk', async (ctx) => {
   const url = ctx.message.text.split(' ')[1];
  ctx.reply(wait)
  try {
      const igs = await s.igstalk(url)   
    // Tampilkan informasi di Telegram
    const message = `𝗜𝗗 : ${igs.id}\n𝗨𝘀𝗲𝗿𝗻𝗮𝗺𝗲 : ${igs.usernamee}\n𝗡𝗮𝗺𝗮: ${igs.fullname}\n𝗕𝗶𝗼 : ${igs.biog}\n𝗕𝗶𝗼 𝗟𝗶𝗻𝗸 : ${igs.biolink}\n𝗙𝗼𝗹𝗹𝗼𝘄𝗲𝗿 : ${igs.follower}\n𝗙𝗼𝗹𝗹𝗼𝘄𝗲𝗿 : ${igs.following}\n𝗔𝗸𝘂𝗻 𝗕𝗶𝘀𝗻𝗶𝘀 : ${igs.bisnis  ? 'Akun Bisnis' : 'Bukan Bisnis'}\n𝗔𝗸𝘂𝗻 𝗣𝗿𝗼𝗳𝗲𝘀𝗶𝗼𝗻𝗮𝗹 : ${igs.profesional ? 'Akun Profesional' : 'Bukan Profesional'}\n𝗔𝗸𝘂𝗻 𝗣𝗿𝗶𝘃𝗮𝘁𝗲 : ${igs.privatee ? 'Akun Private: True' : 'Bukan Private'}\n𝗔𝗸𝘂𝗻 𝗩𝗲𝗿𝗶𝗳𝗶𝗲𝗱 : ${igs.verified ? 'Akun Terverifikasi' : 'Akun Tidak Terverifikasi'}`;
     
    console.log('BERHASIL')
    ctx.replyWithPhoto({ url: igs.profile }, { caption: message });
  } catch (error) {
    console.error(error);
    ctx.reply('Terjadi kesalahan saat mengambil data Instagram.');
  }
});

bot.command('ai', async (ctx) => {
  const url = ctx.message.text.split(' ')[1];
 
  try {
   let ai = await herc.question({model:"gemini",content: url }).then(response => {
     ctx.reply(response.reply)
   });
  
   console.log('BERHASIL')
  } catch (error) {
    console.error(error);
    ctx.reply('Terjadi kesalahan saat mencoba menghubungi AI');
  }
});

bot.command('midjourney', async (ctx) => {
  const que = ctx.message.text.split(' ')[1];
  ctx.reply(wait)
  try {
     /* Available Models */
/* "v1" , "v2" , "v2-beta" , "v3" (DALL-E) , "lexica" , "prodia" */
/* Default Model; "v2" */
   let ai = await herc.drawImage({model:"v4",prompt: que }).then(response => {
     ctx.replyWithPhoto({
                          url: response.url
                        }, {
                            caption: 'Gambar Berhasil di buat'
                        })
   });
  
   console.log('BERHASIL')
  } catch (error) {
    console.error(error);
    ctx.reply('Terjadi kesalahan saat mencoba menghubungi AI');
  }
});

bot.command('lexica', async (ctx) => {
  const que = ctx.message.text.split(' ')[1];
  ctx.reply(wait)
  try {
     /* Available Models */
/* "v1" , "v2" , "v2-beta" , "v3" (DALL-E) , "lexica" , "prodia" */
/* Default Model; "v2" */
   let ai = await herc.drawImage({model:"lexica",prompt: que }).then(response => {
     ctx.replyWithPhoto({
                          url: response.url
                        }, {
                            caption: 'Gambar Berhasil di buat'
                        })
   });
  
   console.log('BERHASIL')
  } catch (error) {
    console.error(error);
    ctx.reply('Terjadi kesalahan saat mencoba menghubungi AI');
  }
});

bot.command('dalle', async (ctx) => {
  const que = ctx.message.text.split(' ')[1];
  ctx.reply(wait)
  try {
     /* Available Models */
/* "v1" , "v2" , "v2-beta" , "v3" (DALL-E) , "lexica" , "prodia" */
/* Default Model; "v2" */
   let ai = await herc.drawImage({model:"v3",prompt: que }).then(response => {
     ctx.replyWithPhoto({
                          url: response.url
                        }, {
                            caption: 'Gambar Berhasil di buat'
                        })
   });
  
   console.log('BERHASIL')
  } catch (error) {
    console.error(error);
    ctx.reply('Terjadi kesalahan saat mencoba menghubungi AI');
  }
});

bot.command('prodia', async (ctx) => {
  const que = ctx.message.text.split(' ')[1];
  ctx.reply(wait)
  try {
     /* Available Models */
/* "v1" , "v2" , "v2-beta" , "v3" (DALL-E) , "lexica" , "prodia" */
/* Default Model; "v2" */
   let ai = await herc.drawImage({model:"prodia",prompt: que }).then(response => {
     ctx.replyWithPhoto({
                          url: response.url
                        }, {
                            caption: 'Gambar Berhasil di buat'
                        })
   });
  
   console.log('BERHASIL')
  } catch (error) {
    console.error(error);
    ctx.reply('Terjadi kesalahan saat mencoba menghubungi AI');
  }
});

bot.command('passgen', (ctx) => {
  const password = generateRandomPassword();
  ctx.reply(`${password}`);
});

bot.command('ytmp3', async (ctx) => {
  const url = ctx.message.text.split(' ')[1];
  ctx.reply(wait)
  try {
    const info = await bch.youtubedlv(url)
    const hasil = await data.audio['128kbps'].download()
                        ctx.replyWithAudio({
                            url: hasil
                        })
   //console.log(info)
   console.log('BERHASIL')
  } catch (error) {
    console.error(error);
    ctx.reply('Terjadi kesalahan saat mencoba mengunduh video.');
  }
});

bot.command('ytmp4', async (ctx) => {
  const url = ctx.message.text.split(' ')[1];
  ctx.reply(wait)
  try {
    const info = await bch.youtubedlv(url)
    const hasil = await data.audio['720p'].download()
                        ctx.replyWithVideo({
                            url: hasil
                        })
   //console.log(info)
   console.log('BERHASIL')
  } catch (error) {
    console.error(error);
    ctx.reply('Terjadi kesalahan saat mencoba mengunduh video.');
  }
});

bot.command('pin', async (ctx) => {
  const url = ctx.message.text.split(' ')[1];

  try {
   let { pinterest } = require('./lib/scraper')
   let search = (url)
   anu = await pinterest(search)
   result = anu[Math.floor(Math.random() * anu.length)]
                        ctx.replyWithPhoto({
                            url: result
                        }, {
                            caption: 'Nih...'
                        })
                 
   console.log('BERHASIL')
  } catch (error) {
    console.error(error);
    ctx.reply('Terjadi kesalahan saat mencoba mengunduh video.');
  }
});

bot.command('ig', async (ctx) => {
  const url = ctx.message.text.split(' ')[1];
  ctx.reply(wait)
  try {
    const info = await bch.snapsave(url)   .then(async(result)=> {
                for(let i of result)
                        {
                        ctx.replyWithVideo({
                            url: i.url
                        }, {
                            caption: 'Video Berhasil Di unduh'
                        })
                  }
                })
   console.log('BERHASIL')
  } catch (error) {
    console.error(error);
    ctx.reply('Terjadi kesalahan saat mencoba mengunduh video.');
  }
});

bot.command('tiktok', async (ctx) => {
  const url = ctx.message.text.split(' ')[1];
  ctx.reply(wait)
  try {
    const info = await api.downloader.tiktok(url)
                        ctx.replyWithVideo({
                            url: info.nowm
                        }, {
                            caption: 'Video Berhasil Di unduh'
                        })
   console.log('BERHASIL')
  } catch (error) {
    console.error(error);
    ctx.reply('Terjadi kesalahan saat mencoba mengunduh video.');
  }
});

bot.command('tiktokaudio', async (ctx) => {
  const url = ctx.message.text.split(' ')[1];
  ctx.reply(wait)
  try {
    const info = await api.downloader.tiktok(url)
                        ctx.replyWithAudio({
                          url: info.audio
                        }, {
                            caption: 'Audio Berhasil Di unduh'
                        })
   console.log('BERHASIL')
  } catch (error) {
    console.error(error);
    ctx.reply('Terjadi kesalahan saat mencoba mengunduh video.');
  }
});

bot.command('download', async (ctx) => {
  try {
    // Perform the HTTP GET request to the website8
    const response = await axios.get('https://terabox-dl.qtcloud.workers.dev/');

    // Load the HTML content into Cheerio
    const $ = cheerio.load(response.data);

    // Extract the download link
    const downloadLink = $('a').attr('href');

    if (downloadLink) {
      // Send the download link to the user
      ctx.reply(`Download link: ${downloadLink}`);
    } else {
      ctx.reply('Failed to retrieve the download link.');
    }
  } catch (error) {
    console.error(error);
    ctx.reply('An error occurred while trying to download.');
  }
});


bot.on('photo', async (ctx) => {
  try {
    const photoId = ctx.message.photo[ctx.message.photo.length - 1].file_id;
    const fileLink = await ctx.telegram.getFileLink(photoId);
    const reminiResult = await remini(fileLink);
    const newPhoto = { source: Buffer.from(reminiResult.image_data) };
    ctx.replyWithPhoto(newPhoto);
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    ctx.reply('Terjadi kesalahan saat meningkatkan gambar.');
  }
});


bot.command('speed', async (ctx) => {
  const test = speedTest();

  ctx.reply('Mengecek kecepatan internet...');

  test.on('data', data => {
    const downloadSpeed = (data.speeds.download / 1e6).toFixed(2); // dalam Mbps
    const uploadSpeed = (data.speeds.upload / 1e6).toFixed(2); // dalam Mbps

    ctx.reply(`Hasil tes kecepatan internet:\nDownload: ${downloadSpeed} Mbps\nUpload: ${uploadSpeed} Mbps`);
  });

  test.on('error', err => {
    console.error(err);
    ctx.reply('Terjadi kesalahan saat menguji kecepatan internet.');
  });
});

bot.launch();
// Fungsi untuk menghasilkan kata sandi acak
figlet('HLX BOT SIAP', function(err, data) {
  if (err) {
    console.log('Terjadi kesalahan:', err);
    return;
  }
  console.log(data);
});