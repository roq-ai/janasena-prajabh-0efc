import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { janasenaValidationSchema } from 'validationSchema/janasenas';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getJanasenas();
    case 'POST':
      return createJanasena();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getJanasenas() {
    const data = await prisma.janasena
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'janasena'));
    return res.status(200).json(data);
  }

  async function createJanasena() {
    await janasenaValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.event?.length > 0) {
      const create_event = body.event;
      body.event = {
        create: create_event,
      };
    } else {
      delete body.event;
    }
    if (body?.suggestion?.length > 0) {
      const create_suggestion = body.suggestion;
      body.suggestion = {
        create: create_suggestion,
      };
    } else {
      delete body.suggestion;
    }
    const data = await prisma.janasena.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
