
const bunyan = require('bunyan');
const PrettyStream = require('bunyan-prettystream');

const prettyStdOut = new PrettyStream();
prettyStdOut.pipe(process.stdout);

module.exports = bunyan.createLogger({
  name: 'Node JS Express User Authentication Boilterplate Server',
  streams: [
    {
      level: 'debug',
      type: 'raw',
      stream: prettyStdOut
    },
    {
      level: 'error',
      type: 'raw',
      stream: prettyStdOut
    },
    {
      level: 'info',
      type: 'raw',
      stream: prettyStdOut
    },
]
});
