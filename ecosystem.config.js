/**
 * An ecosystem file for use with PM2 http://pm2.keymetrics.io/
 * 
 * to deploy to production:
 * install pm2 globally
 *  npm i -g pm2
 * setup pm2 to autostart on reboots
 *  pm2 startup
 * build your web-app
 *  npm run build
 * start it with pm2
 *  pm2 start ecosystem.config.js
*/

module.exports = {
  apps: [{
    name: "portfolio",
    script: 'npm',
    args: 'start',
    watch: true
  }]
}