/**
 * for docker purposes only
 */

/* eslint-disable-next-line */
const express = require('express');

const app = express();

const resolvePath = `${__dirname}/dist`;

app.use(express.static(resolvePath));
app.get('/*', (req, res) => {
  res.sendFile(`${resolvePath}/index.html`);
});

const port = 8080;

const server = app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});

process.on('SIGTERM', () => {
  server.close(() => { process.exit(0); });
});
