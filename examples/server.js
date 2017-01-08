const express = require('express');
const expressApiDoc = require('../src'); // replace with 'express-apidoc' in your own project:

const app = express();

app.use('/example', expressApiDoc({
  src: [__dirname], // like -i option, where your doc written
  // includeFilters: [".*\\.js$"] // like -f option
}));

app.listen(9000, () => console.log('open http://127.0.0.1:9000'));

// open 'http://127.0.0.1:9000/example/foo' see what happened.
// edit doc.js and refresh your browser :)