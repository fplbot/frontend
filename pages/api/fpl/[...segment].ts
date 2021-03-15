import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let url = `https://fantasy.premierleague.com${req.url?.replace('/fpl', '')}/`;
  let fplRes = await fetch(url, {
    method: 'GET',
    headers: {
      "Accept": "application/json",
      "User-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36"
    }
  });
  res.status(fplRes.status);
  res.json(await fplRes.text());
}
