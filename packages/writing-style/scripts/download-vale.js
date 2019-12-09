const os = require('os');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const shelljs = require('shelljs');
const { path7za } = require('7zip-bin');

const version = '1.7.1';

const platform = os.platform();

const archiveName = (() => {
  switch (platform) {
    case 'darwin':
      return `vale_${version}_macOS_64-bit.tar.gz`;
    case 'linux':
      return `vale_${version}_Linux_64-bit.tar.gz`;
    case 'win32':
      return `vale_${version}_Windows_64-bit.zip`;
    default:
      throw new Error(
        `Cannot download vale binary, unsupported platform: ${platform}.`
      );
  }
})();

const isWin = platform === 'win32';
const binaryFileName = isWin ? 'vale.exe' : 'vale';
const archivePath = path.join(__dirname, `../${archiveName}`);
const binPath = path.join(__dirname, '../bin');
const destBinaryPath = path.join(binPath, binaryFileName);

const abortIfError = result => {
  if (result.code > 0) {
    throw new Error(result.stderr);
  }
};
const downloadAndExtractArchive = async url => {
  // Download the archive
  const res = await fetch(url);
  const fileStream = fs.createWriteStream(archivePath);
  await new Promise((resolve, reject) => {
    res.body.pipe(fileStream);
    res.body.on('error', error => {
      reject(error);
    });
    fileStream.on('finish', resolve);
  });

  // Extract the vale binary from the downloaded archive into the "bin" folder
  const extractCommand = isWin
    ? // For zip files we can run the extraction directly
      `${path7za} e ${archivePath} -o${binPath} ${binaryFileName}`
    : // For tar.gz files we need to run the extraction in 2 steps
      // e     = Extract files from archive
      // -so   = write to stdout switch
      // -si   = read from stdin switch
      // -aoa  = Overwrite all existing files without prompt.
      // -ttar = Treat the stdin byte stream as a TAR file
      // -o    = output directory
      `${path7za} e ${archivePath} -so | ${path7za} e -aoa -si -ttar -o${binPath} ${binaryFileName}`;
  abortIfError(shelljs.exec(extractCommand, { silent: true }));

  // Assign proper write permissions to the file
  abortIfError(shelljs.chmod(755, destBinaryPath));

  // Remove downloaded archive
  abortIfError(shelljs.rm('-rf', archivePath));
};

console.log('[writing-styles] Verifying vale installation...');
if (fs.existsSync(destBinaryPath)) {
  console.log(
    '[writing-styles] Vale binary already installed, skipping installation...'
  );
} else {
  console.log('[writing-styles] Installing vale...');
  downloadAndExtractArchive(
    `https://github.com/errata-ai/vale/releases/download/v${version}/${archiveName}`
  ).then(
    () => {
      console.log('[writing-styles] Vale binary installed.');
    },
    error => {
      console.error('[writing-styles] Error installing vale binary', error);
      process.exit(1);
    }
  );
}
