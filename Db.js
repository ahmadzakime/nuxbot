const fs = require('fs');

// Baca file database.json
fs.readFile('./database/database.json', (err, data) => {
  if (err) {
    console.error('Terjadi kesalahan saat membaca file:', err);
    return;
  }

  const database = JSON.parse(data);

  // Fungsi untuk mencari data berdasarkan kriteria
  function findData(criteria) {
    const selectedData = database.filter(entry => entry.username === criteria);
    return selectedData;
  }

  // Panggil fungsi untuk mencari data berdasarkan kriteria
  
  const result = findData(`${text}`);

  if (result.length > 0) {
    console.log('Data ditemukan:');
    result.forEach(entry => {
      console.log(`Username: ${entry.username}, Password: ${entry.password}`);
    });
  } else {
    console.log('Data tidak ditemukan.');
  }
});


