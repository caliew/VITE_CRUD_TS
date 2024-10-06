// ragRouter.js
const express = require('express');
const router = express.Router();
// const ragModel = require('./ragModel');

router.post('/generate', (req, res) => {
  const inputText = req.body.inputText;
  let generatedText = 'RAG MODEL IS UNDER TESTING. ..TO BE READY SOON..';
//   const generatedText = ragModel.generate(inputText);
  res.json({ generatedText });
});

module.exports = router;