// houseKeeping recoreds that older than 180 days
const cros = require('node-cron');
const archive = require('./data/archive.json');
const fs = require('fs');
const path = require('path');

const houseKeepingTask = () => {
  console.log(`runing house kepping  task , ${new Date()}`);
  try {
    archive.map((item, index) => {
      const presentDate = new Date().getTime() / (1000 * 60 * 60 * 24);
      const recordDate = new Date(item.date).getTime() / (1000 * 60 * 60 * 24);

      console.log(
        `The Number Of Days is ${Math.floor(presentDate - recordDate)}`
      );
      if (Math.floor(presentDate - recordDate) > 180) {
        archive.splice(index, 1);
        fs.writeFileSync(
          path.join(__dirname, './data/archive.json'),
          JSON.stringify(archive),
          'utf-8'
        );
      }
    });
  } catch (error) {
    console.log(error);
  }
  console.log(`house kepping  task end  `);
};

cros.schedule('*/1 * * * * *', houseKeepingTask);
