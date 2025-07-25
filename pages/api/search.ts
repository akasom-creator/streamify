// pages/api/search.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q } = req.query;

  if (!q || typeof q !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid query parameter' });
  }

  try {
    const response = await fetch(`https://api.deezer.com/search?q=${q}`);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error('Deezer fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch from Deezer' });
  }
}
