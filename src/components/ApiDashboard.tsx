import React from 'react';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { formatDistance } from 'date-fns';

// main dashboard page
const ApiDashboard = async () => {
  const user = await getServerSession(authOptions);

  if (!user) notFound();

  const apiKeys = await db.apikey.findMany({
    where: {
      userId: user.user.id,
    },
  });

  const activeApiKeys = apiKeys.find((key) => key.enabled);

  if (!activeApiKeys) notFound();

  const userRequests = await db.apiRequest.findMany({
    where: {
      apiKeyId: {
        in: apiKeys.map((key) => key.id),
      },
    },
  });

  const serializedRequests = userRequests.map((request) => ({
    ...request,
    timestamp: formatDistance(new Date(request.timestamp), new Date()),
  }));

  return <div>ApiDashboard</div>;
};

export default ApiDashboard;
