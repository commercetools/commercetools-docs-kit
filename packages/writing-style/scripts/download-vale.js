/* eslint-disable no-console */
const os = require('os');
const fs = require('fs');
const path = require('path');
const shelljs = require('shelljs');
const { path7za } = require('7zip-bin');
const { valeVersion } = require('../package.json');

const platform = os.platform();
const arch = process.arch;

// see https://github.com/node-fetch/node-fetch#commonjs
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const archiveName = (() => {
  switch (platform) {
    case 'darwin':
      return arch === 'arm64'
        ? `vale_${valeVersion}_macOS_arm64.tar.gz`
        : `vale_${valeVersion}_macOS_64-bit.tar.gz`;
    case 'linux':
      return `vale_${valeVersion}_Linux_64-bit.tar.gz`;
    case 'win32':
      return `vale_${valeVersion}_Windows_64-bit.zip`;
    default:
      throw new Error(
        `Cannot download vale binary, unsupported platform: ${platform}.`
      );
  }
})();

const isWin = platform === 'win32';
const binaryFileName = isWin ? `vale.exe` : `vale`;
const localBinaryFileName = isWin
  ? `vale-${valeVersion}.exe`
  : `vale-${valeVersion}`;
const archivePath = path.join(__dirname, `../${archiveName}`);
const binPath = path.join(__dirname, '../vale-bin/');
const downloadBinaryPath = path.join(binPath, binaryFileName);
const destBinaryPath = path.join(binPath, localBinaryFileName);

const abortIfError = (result) => {
  if (result.code > 0) {
    throw new Error(result.stderr);
  }
};
const downloadAndExtractArchive = async (url) => {
  // Download the archive
  const res = await fetch(url);
  const fileStream = fs.createWriteStream(archivePath);
  await new Promise((resolve, reject) => {
    res.body.pipe(fileStream);
    res.body.on('error', (error) => {
      reject(error);
    });
    fileStream.on('finish', resolve);
  });

  shelljs.mkdir('-p', binPath);

  // Extract the vale binary from the downloaded archive into the "bin" folder
  const extractCommand = isWin
    ? // on windows we use the 7za library, on unices the OS tar works better since v2.x
      `${path7za} e ${archivePath} -o${binPath} ${binaryFileName}`
    : `tar -xzvf ${archivePath} -C ${binPath}`;
  abortIfError(shelljs.exec(extractCommand, { silent: true }));

  // Rename to a file name with version to make sure version upgrades happen if an older version is present
  abortIfError(shelljs.mv(downloadBinaryPath, destBinaryPath));

  // Assign proper write permissions to the file
  abortIfError(shelljs.chmod(755, destBinaryPath));

  // Remove downloaded archive
  abortIfError(shelljs.rm('-rf', archivePath));
};

console.log('[writing-styles] Verifying vale installation...');
if (fs.existsSync(destBinaryPath)) {
  console.log(destBinaryPath);
  console.log(
    '[writing-styles] Vale binary already installed, skipping installation...'
  );
} else {
  console.log(`[writing-styles] Installing vale ${valeVersion} ...`);
  downloadAndExtractArchive(
    `https://github.com/errata-ai/vale/releases/download/v${valeVersion}/${archiveName}`
  ).then(
    () => {
      console.log('[writing-styles] Vale binary installed.');
    },
    (error) => {
      console.error('[writing-styles] Error installing vale binary', error);
      process.exit(1);
    }
  );
}
