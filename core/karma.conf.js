// Karma configuration
// Generated on Sun May 03 2020 00:02:43 GMT+0100 (British Summer Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'esm'],

    plugins: [
      // load plugin
      require.resolve('@open-wc/karma-esm'),
  
      // fallback: resolve any karma- plugins
      'karma-*',
    ],

    esm: {
      // if you are using 'bare module imports' you will need this option
      nodeResolve: true,
    },

    // list of files / patterns to load in the browser
    files: [
      { 
        pattern: "dist/**/*.test.js", 
        watched: false, 
        type: "module" 
      },
      {
        pattern: 'dist/**/*.js.map',
        included: false
      } 
    ],

    preprocessors: {
      'dist/**/*.js': ['sourcemap']
    },


    // list of files / patterns to exclude
    exclude: [
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["progress", 'kjhtml'],

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
