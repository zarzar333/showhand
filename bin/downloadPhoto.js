const fs = require('fs');
const axios = require('axios');
const csvParser = require('csv-parser');
const path = './src/data/data.json'; // Change this to your CSV file path


async function downloadWithRetry(url, path, retries = 3) {
    try {
        await downloadImage(url, path);
        console.log(`Downloaded image from ${url}`);
    } catch (error) {
        if (retries > 0) {
            console.log(`Failed to download image from ${url}. Retrying... (${retries} attempts left)`);
            await new Promise(resolve => setTimeout(resolve, 1000));  // wait for 1 second before retrying
            await downloadWithRetry(url, path, retries - 1);
        } else {
            console.error(`Failed to download image from ${url} after multiple attempts.`);
        }
    }
}

async function downloadImage (url, path) {
  const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
  });

  const writer = fs.createWriteStream(path);

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
  });
}

async function downloadAllImages(photos, delay) {
  for (photo of photos) {
      if (photo.url.trim().length > 0) {
        console.log(`Downloading ${photo.url}`)
        await downloadWithRetry(photo.url, photo.path);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
  }
}



fs.readFile(path, 'utf8', (err, data) => {
  if (err) {
      console.log(`Error reading file from disk: ${err}`);
  } else {
      // parse JSON string to JSON object
      const jsonData = JSON.parse(data);
      const photos = [];
      // log the data
      for(key in jsonData.nearby) {
        for (location of jsonData.nearby[key]) {
          photos.push({
            url: location['photo需要消耗APIkey'], 
            path: `./photos/${location['id']}.png`
          });
        }
      }
      console.log(`collected ${photos.length} images`);


      downloadAllImages(photos, 1000);
  }
});



