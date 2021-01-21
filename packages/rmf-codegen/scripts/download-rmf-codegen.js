const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const shelljs = require('shelljs');
const { rmfCodegenVersion } = require('../package.json');
const { javaIsInstalled, abortIfError } = require('./helpers');

const binPath = path.join(__dirname, '../bin');
const jarName = `rmf-codegen-${rmfCodegenVersion}.jar`;
const jarPath = path.join(binPath, jarName);
const downloadURI = `https://github.com/commercetools/rmf-codegen/releases/download/${rmfCodegenVersion}/rmf-codegen.jar`;

const downloadArchive = async (url) => {
  // Download the archive
  const res = await fetch(url);
  const fileStream = fs.createWriteStream(jarPath);
  await new Promise((resolve, reject) => {
    res.body.pipe(fileStream);
    res.body.on('error', (error) => {
      reject(error);
    });
    fileStream.on('finish', resolve);
  });

  // Assign proper write permissions to the file
  abortIfError(shelljs.chmod(755, jarPath));
};

if (!javaIsInstalled()) {
  console.warn(
    '[rmf-codegen] Warning: no java runtime detected in path. Using existing RAMLdocs is possible but not regeneration from master RAML definitions.'
  );
}
console.log('[rmf-codegen] Verifying rmf-codegen installation...');
if (fs.existsSync(jarPath)) {
  console.log(
    '[rmf-codegen] rmf-codegen jar already installed, skipping installation...'
  );
} else {
  console.log('[rmf-codegen] Installing rmf-codegen jar..');
  downloadArchive(downloadURI).then(
    () => {
      console.log('[rmf-codegen] rmf-codegen jar installed.');
    },
    (error) => {
      console.error('[rmf-codegen] Error installing rmf-codegen jar', error);
      process.exit(1);
    }
  );
}
