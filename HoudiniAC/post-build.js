const fs = require('fs-extra');

function postBuild() {
  const sourceDir = './public';
  const targetDir = '../docs/AdventCalendarHub';

  fs.copySync(sourceDir, targetDir, { overwrite: true }, function (err) {
    if (err) {
      console.error('Error copying files', err);
    } else {
        console.log('Files copied successfully');

    }
  });
}

postBuild();
