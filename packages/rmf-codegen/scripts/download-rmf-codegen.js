const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const shelljs = require('shelljs');
const os = require('os');
const { rmfCodegenVersion } = require('../package.json');

const binPath = path.join(__dirname, '../bin');

if (os.platform() === 'linux') {
  downloadLinux();
} else {
  downloadJar();
}

function downloadLinux() {
  const linuxName = `rmf-codegen-${rmfCodegenVersion}.linux`;
  const linuxPath = path.join(binPath, linuxName);
  if (fs.existsSync(linuxPath)) {
    console.log(
      '[rmf-codegen] rmf-codegen linux already installed, skipping installation...'
    );

    return;
  }

  const downloadURI = `https://github.com/commercetools/rmf-codegen/releases/download/${rmfCodegenVersion}/rmf-codegen.linux`;

  console.log('[rmf-codegen] Installing rmf-codegen linux..');
  downloadArchive(downloadURI, linuxPath).then(
    () => {
      console.log('[rmf-codegen] rmf-codegen linux installed.');
    },
    (error) => {
      console.error('[rmf-codegen] Error installing rmf-codegen linux', error);
      process.exit(1);
    }
  );
}

function downloadJar() {
  const jarName = `rmf-codegen-${rmfCodegenVersion}.jar`;
  const jarPath = path.join(binPath, jarName);
  const downloadURI = `https://github.com/commercetools/rmf-codegen/releases/download/${rmfCodegenVersion}/rmf-codegen.jar`;

  if (!isJavaInstalled()) {
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
    downloadArchive(downloadURI, jarPath).then(
      () => {
        console.log('[rmf-codegen] rmf-codegen jar installed.');
      },
      (error) => {
        console.error('[rmf-codegen] Error installing rmf-codegen jar', error);
        process.exit(1);
      }
    );
  }
}

function isJavaInstalled() {
  try {
    const result = shelljs.exec('java -version', { silent: true });
    return result.code === 0;
  } catch (error) {
    return false;
  }
}

async function downloadArchive(url, filePath) {
  // Download the archive
  const res = await fetch(url);
  const fileStream = fs.createWriteStream(filePath);
  await new Promise((resolve, reject) => {
    res.body.pipe(fileStream);
    res.body.on('error', (error) => {
      reject(error);
    });
    fileStream.on('finish', resolve);
  });

  // Assign proper write permissions to the file
  abortIfError(shelljs.chmod(755, filePath));
}

function abortIfError(result) {
  if (result.code > 0) {
    throw new Error(result.stderr);
  }
}
