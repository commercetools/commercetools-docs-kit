const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const shelljs = require('shelljs');
const { rmfCodegenVersion } = require('../package.json');

const binPath = path.join(__dirname, '../bin');
const linkPath = path.join(binPath, "rmf-codegen.jar")
const jarName = (version) => `rmf-codegen-${version}.jar`;
const jarPath = (version) => path.join(binPath, jarName(version));
const downloadURI = (version) => `https://github.com/commercetools/rmf-codegen/releases/download/${version}/rmf-codegen.jar`;

const cheerio = require('cheerio');
const semver = require("semver");
const { version } = require('react');
const mavenRepo = "https://repo1.maven.org/maven2/com/commercetools/rmf/cli-application/"
const mavenMeta = mavenRepo + "maven-metadata.xml"

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

const downloadArchive = async (url, filePath) => {
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
  abortIfError(shelljs.ln("-sf", filePath, linkPath))
};

const readMavenMeta = async (url) => {
  const res = await fetch(url);
  return res.text()
}

const retrieveInstallVersion = (xml) => {
  const $ = cheerio.load(xml)
  var versions = $("version").map(function () {
    return $(this).text()
  }).toArray()

  const version = semver.maxSatisfying(versions, rmfCodegenVersion)
  return version
}

if (!isJavaInstalled()) {
  console.warn(
    '[rmf-codegen] Warning: no java runtime detected in path. Using existing RAMLdocs is possible but not regeneration from master RAML definitions.'
  );
}
console.log('[rmf-codegen] Verifying rmf-codegen installation...');

readMavenMeta(mavenMeta).then(retrieveInstallVersion).then((version) => {
  const jarFilePath = jarPath(version)
  if (fs.existsSync(jarFilePath)) {
    console.log(
      '[rmf-codegen] rmf-codegen jar already installed, skipping installation...'
    );
  } else {
    console.log('[rmf-codegen] Installing rmf-codegen jar..');
    const jarUri = downloadURI(version);
    downloadArchive(jarUri, jarFilePath).then(
      () => {
        console.log('[rmf-codegen] rmf-codegen jar installed.');
      },
      (error) => {
        console.error('[rmf-codegen] Error installing rmf-codegen jar', error);
        process.exit(1);
      }
    );
  }
})

