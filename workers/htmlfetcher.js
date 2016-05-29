// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers.js');
var CronJob = require('cron').CronJob;

exports.fetch = () => {
  console.log('Cron downloading...');
  archive.readListOfUrls( urls => {
    archive.downloadUrls(urls);
  });
};

new CronJob('*/5 * * * * *', exports.fetch, null, true, 'America/Los_Angeles');