const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('assets'));

const detectionManager = require('./detections/detectionManager');

app.get('/', (req, res) => {
  const deny = detectionManager.runDetections(req);
  if (deny) {
    res.sendFile(__dirname + '/assets/block.html');
  } else {
    res.send('Your connection was verified by Welkinsage Networks.');
  }
});

app.listen(port, () => console.log(`Firewall listening on port ${port}!`));
