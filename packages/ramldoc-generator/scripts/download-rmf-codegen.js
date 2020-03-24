const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const shelljs = require('shelljs');
const { rmfCodegenVersion } = require('../package.json');

const binPath = path.join(__dirname, '../bin');
const jarName = `rmf-codegen-${rmfCodegenVersion}.jar`;
const jarPath = path.join(binPath, jarName);
const downloadURI = `https://dl.bintray.com/vrapio/vrapio/io/vrap/rmf/codegen/cli-application/${rmfCodegenVersion}/cli-application-${rmfCodegenVersion}-all.jar`;

const abortIfError = (result) => {
  if (result.code > 0) {
    throw new Error(result.stderr);
  }
};

const isJavaInstalled = () => {
  try {
    const result = shelljs.exec('java -version', { silent: true });
    return result.code === 0;
  } catch (error) {
    return false;
  }
};

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

if (!isJavaInstalled()) {
  console.warn(
    '[ramldoc-generator] Warning: no java runtime detected in path. Using existing RAMLdocs is possible but not regeneration from master RAML definitions.'
  );
}
console.log('[ramldoc-generator] Verifying rmf-codegen installation...');
if (fs.existsSync(jarPath)) {
  console.log(
    '[ramldoc-generator] rmf-codegen jar already installed, skipping installation...'
  );
} else {
  console.log('[ramldoc-generator] Installing rmf-codegen jar..');
  downloadArchive(downloadURI).then(
    () => {
      console.log('[ramldoc-generator] rmf-codegen jar installed.');
    },
    (error) => {
      console.error(
        '[ramldoc-generator] Error installing rmf-codegen jar',
        error
      );
      process.exit(1);
    }
  );
}
