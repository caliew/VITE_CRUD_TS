// ragRouter.js
import express from 'express';
const ragRouter = express.Router();
import ragModel from './ragModel.js';
import { pipeline } from '@xenova/transformers';

// Create a pipeline instance
const pipelineSingleton = {
  instance: null,
  async getInstance() {
    if (!this.instance) {
      this.instance = await pipeline('text-classification', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english');
    }
    return this.instance;
  }
};

// API endpoints for ./api/rag/
ragRouter.post('/generate', (req, res) => {
  const inputText = req.body.inputText;
  let generatedText = 'RAG MODEL IS UNDER TESTING. ..TO BE READY SOON..';
//   const generatedText = ragModel.generate(inputText);
  res.json({ generatedText });
});

ragRouter.post('/classify', async (req, res) => {
  const text = req.body.text;
  const pipelineInstance = await pipelineSingleton.getInstance();
  const output = await pipelineInstance(text);
  res.json({ classification: output });
});

export default ragRouter;