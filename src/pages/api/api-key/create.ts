import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { CreateApiData } from '@/types/api';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CreateApiData>
) => {
  try {
    const user = await getServerSession(req, res, authOptions).then(
      (res) => res?.user
    );

    if (!user) {
      res.status(401).json({
        error: 'Unauthorized to perform this action.',
        createdApiKey: null,
      });
    }

    const existingApiKey = await db.apikey.findFirst({
      where: {
        userId: user?.id,
        enabled: true,
      },
    });

    if (existingApiKey) {
      return res.status(400).json({
        error: 'You already have an active API key.',
        createdApiKey: null,
      });
    }
  } catch (error) {}
};

export default handler;
