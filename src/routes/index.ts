import axios from 'axios';
import { Router } from 'express';

const router = Router();
const subscriptions: { [key: string]: string[] } = {};

router.get('/', (req, res) => {
  res.send('Welcome to the Panagea Test');
});

router.post('/subscribe/:topic', (req, res) => {
  const { topic } = req.params;
  const { url } = req.body;

  if (!isUrlValid(url)) {
    res.status(400).json({
      message: 'Invalid subscription url',
    });

    return;
  }

  const normalizedTopic = topic.toLowerCase();

  if (!subscriptions[normalizedTopic]) {
    subscriptions[normalizedTopic] = [url];
  } else {
    subscriptions[normalizedTopic].push(url);
  }

  res.json({
    url,
    topic,
  });
});

router.post('/publish/:topic', async (req, res) => {
  const { topic } = req.params;

  const normalizedTopic = topic.toLowerCase();

  if (subscriptions[normalizedTopic]) {
    const subscribers = subscriptions[normalizedTopic];

    try {
      await Promise.all(
        subscribers.map(async subscriber => {
          return axios.post(subscriber, {
            topic: normalizedTopic,
            data: req.body,
          });
        }),
      );
    } catch (error) {
      res.status(400).json({
        message: 'Could not publish to subscribers',
      });

      return;
    }
  }

  res.json({
    message: 'Published',
  });
});

const isUrlValid = (text: string) => {
  if (!text) {
    return false;
  }

  if (!text.startsWith('http')) {
    text = 'http://' + text;
  }

  try {
    const url = new URL(text);

    return ['http:', 'https:'].includes(url.protocol);
  } catch (error) {
    return false;
  }
};

export default router;
