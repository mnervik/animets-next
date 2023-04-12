import { NextApiRequest, NextApiResponse } from 'next/types'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.json({ name: 'John Doe' })
  } else if (req.method === 'POST') {
    res.end()
  }

  res.status(400)
}
