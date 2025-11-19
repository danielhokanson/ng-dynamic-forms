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
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage/ng-dynamic-forms'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        executable: process.env.CHROME_BIN || require('path').join(__dirname, '../.bin/chrome-headless-wrapper.sh'),
        flags: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--headless=new',
          '--disable-gpu',
          '--remote-debugging-port=9232',
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
          '--disable-features=IsolateOrigins,site-per-process',
          '--disable-proxy-server'
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
};
