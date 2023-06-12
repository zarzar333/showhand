const fs = require('fs');
const csvParser = require('csv-parser');
const path = './data.csv'; // Change this to your CSV file path

let groupedData = {};
let id = 0;  // Initialize the counter

let targetInfo = {
  'シティハウス赤羽レジデンス': {
    Latitude: 35.78034411079482,
    Longitude: 139.7263848994443,
    address: '東京都 北区 赤羽2丁目28'
  },
  'ロイヤルシーズン南麻布': {
    Latitude: 35.64876584127162,
    Longitude: 139.72974568511472,
    address: '〒106-0047 東京都港区南麻布３丁目１１−41'
  },
  'ブランズ碑文谷': {
    Latitude: 35.62290353284759,
    Longitude:  139.6855553376629,
    address: '〒152-0003 東京都目黒区碑文谷２丁目２０−24'
  }
}


fs.createReadStream(path)
  .pipe(csvParser())
  .on('data', (row) => {
    row.id = id++;  // Add id field to each row
    
    // Check if the groupField value is already a key in the groupedData object
    // If not, create a new array for it
    // Then, add the row to the correct array based on its groupField value
    const groupField = row['物件']; // Replace 'groupField' with the actual field name you want to group by
    if (!groupedData[groupField]) {
      groupedData[groupField] = [];
    }
    delete row['物件']
    groupedData[groupField].push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
    
    const json = JSON.stringify({
      targetInfo: targetInfo,
      nearby: groupedData
    }, null, 2);
    
    fs.writeFile('data.json', json, (err) => {
      if (err) {
        throw err;
      }
      console.log('JSON file is saved.');
    });
  });
