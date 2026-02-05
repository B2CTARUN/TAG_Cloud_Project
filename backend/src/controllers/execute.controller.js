const { executeCode } = require('../services/executor.service');

const executeHandler = async (req, res) => {
  const { language, code, input = '' } = req.body || {};

  if (!language || !code) {
    return res.status(400).json({
      error: 'Both language and code are required.'
    });
  }

  try {
    const result = await executeCode({ language, code, input });
    return res.json(result);
  } catch (error) {
    if (error && typeof error === 'object' && 'executionTime' in error) {
      return res.json(error);
    }

    return res.status(400).json({
      error: error.message || 'Execution failed.'
    });
  }
};

module.exports = {
  executeHandler
};
