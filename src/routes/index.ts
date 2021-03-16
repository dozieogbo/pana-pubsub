import axios from 'axios';
import { Router } from 'express';
import { isUrlValid } from '../utils';
import routes from '../constants/routes';
import responses from '../constants/responses';

const router = Router();
const subscriptions: { [key: string]: string[] } = {};

router.get(routes.INDEX, (req, res) => {
  res.send('Welcome to the Panagea Test');
});

router.post(routes.SUBSCRIBE, (req, res) => {
  const { topic } = req.params;
  const { url } = req.body;

  if (!isUrlValid(url)) {
    res.status(400).json({
      message: responses.INVALID_SUBSCRIPTION_URL,
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

router.post(routes.PUBLISH, async (req, res) => {
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
      res.status(500).json({
        message: responses.PUBLISH_FAILED,
      });

      return;
    }
  }

  res.json({
    message: responses.PUBLISHED,
  });
});

export default router;
