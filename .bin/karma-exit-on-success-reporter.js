// Shared Karma reporter that exits immediately when tests complete successfully
// This prevents Karma from trying to restart browsers after successful completion
module.exports = function(baseReporterDecorator, config, logger, helper, formatError) {
  baseReporterDecorator(this);
  var testComplete = false;
  
  this.onRunComplete = function(browsers, results) {
    if (results.success && results.failed === 0 && !testComplete) {
      testComplete = true;
      // Exit immediately to prevent browser restart attempts
      process.nextTick(function() {
        process.exit(0);
      });
    }
  };
};

