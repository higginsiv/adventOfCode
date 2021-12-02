module.exports = function (config) {
  config.set({
    basePath: '',
    client: {
      jasmine: {
        random: false,
      },
    },
    frameworks: ['jasmine'],
    files: [
      // Vendor
      // Source
      // Specs
      'js/spec/*.spec.js',

      // Fixtures
      { pattern: 'spec/fixtures/**/*.json', included: false, served: true }
    ],
    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox', // Required to run without privileges in docker
          '--user-data-dir=/tmp/chrome-test-profile',
          '--disable-web-security',
        ],
      },
    },
    browserNoActivityTimeout: 30000,
    singleRun: true,
    concurrency: Infinity,
  });
};
