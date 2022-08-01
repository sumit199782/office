const { setHeadlessWhen } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'https://paypal05-tech-prtnr-na06-dw.demandware.net/on/demandware.store/Sites-RefArchPP-Site',
      show: true,
      windowSize: '1920x1080',
      chrome: {
        args: [ '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process'
        ],
    },
    }
  },
  include: {
    I: './steps_file.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'acceptance',
  plugins: {
    retryFailedStep: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    }
  }
}