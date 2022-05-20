const log = require('npmlog');


log.level = 'warn'
log.maxRecordSize = 3;
// log.disableColor()
log.pause()
console.log(log.record)

log.silly('fyi', 'I have a kitty cat: %j', 'test cat');
log.info('fyi', 'I have a kitty cat: %j', 'test cat');
log.resume()
log.warn('fyi', 'I have a kitty cat: %j', 'test cat');
log.error('fyi', 'I have a kitty cat: %j', 'test cat');


console.log(log.record)