const fs = require('fs');
const path = require('path');

const detectionManager = (req) => {
  const detectionPath = path.join(__dirname, 'impl');
  const detections = fs.readdirSync(detectionPath);

  const runDetections = () => {
    let isBot = false;
    detections.forEach((detection) => {
      const detectionImpl = require(path.join(detectionPath, detection));
      isBot = isBot || detectionImpl.isBot();
    });
    return isBot;
  };

  return {
    runDetections,
  };
};

module.exports = detectionManager();
