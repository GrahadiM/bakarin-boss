import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

// Initialize the cors middleware
const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add the HTTP methods you need
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export { cors, runMiddleware };
