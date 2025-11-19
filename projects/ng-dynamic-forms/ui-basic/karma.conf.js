// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageReporter: {
      dir: require('path').join(__dirname, '../../../coverage/ng-dynamic-forms/ui-basic'),
      subdir: '.',
      reporters: [
        {type: 'html'},
        {type: 'json'},
        {type: 'lcovonly'},
        {type: 'text-summary'}
      ],
      check: {
        global: {
          statements: 55,
          branches: 45,
          functions: 55,
          lines: 55
        }
      }
    },
    reporters: ['progress', 'kjhtml', 'exit-on-success'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        executable: process.env.CHROME_BIN || require('path').join(__dirname, '../../../.bin/chrome-headless-wrapper.sh'),
        flags: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--headless=new',
          '--disable-gpu',
          '--remote-debugging-port=9223',
          '--disable-crashpad',
          '--disable-background-networking',
          '--disable-background-timer-throttling',
          '--disable-backgrounding-occluded-windows',
          '--disable-breakpad',
          '--disable-component-extensions-with-background-pages',
          '--disable-features=TranslateUI',
          '--disable-ipc-flooding-protection',
          '--disable-renderer-backgrounding',
          '--disable-sync',
          '--metrics-recording-only',
          '--mute-audio',
          '--no-first-run',
          '--safebrowsing-disable-auto-update',
          '--enable-automation',
          '--password-store=basic',
          '--use-mock-keychain',
          '--disable-hang-monitor',
          '--disable-prompt-on-repost',
          '--disable-domain-reliability',
          '--disable-component-update',
          '--disable-default-apps',
          '--disable-features=AudioServiceOutOfProcess',
          '--disable-software-rasterizer',
          '--disable-gpu-rasterization',
          '--disable-zygote',
          "--disable-proxy-server",
          '--single-process',
          '--disk-cache-size=0',
          '--media-cache-size=0',
          '--disable-application-cache',
          '--disable-background-downloads',
          '--disable-client-side-phishing-detection',
          '--disable-datasaver-prompt',
          '--disable-extensions',
          '--disable-infobars',
          '--disable-notifications',
          '--disable-offline-storage',
          '--disable-plugins',
          '--disable-plugins-discovery',
          '--disable-preconnect',
          '--disable-print-preview',
          '--disable-translate',
          '--disable-web-security',
          '--no-pings',
          '--noerrdialogs',
          '--disable-features=IsolateOrigins,site-per-process'
        ]
      }
    },
    singleRun: true,
    restartOnFileChange: false,
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 10,
    browserNoActivityTimeout: 60000,
    captureTimeout: 60000,
    processKillTimeout: 10000,
    failOnSkippedTests: false,
    failOnEmptyTestSuite: false
  });

  // Custom reporter that exits immediately when tests complete successfully
  var ExitOnSuccessReporter = require('../../../.bin/karma-exit-on-success-reporter');
  ExitOnSuccessReporter.$inject = ['baseReporterDecorator', 'config', 'logger', 'helper', 'formatError'];
  
  config.plugins.push({
    'reporter:exit-on-success': ['type', ExitOnSuccessReporter]
  });
};
