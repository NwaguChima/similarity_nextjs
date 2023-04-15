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

  return (
    <div className="container flex flex-col gap-6">
      <LargeHeading>Welcome back, {user.user.name}</LargeHeading>
      <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center">
        <Paragraph>Your API key:</Paragraph>
        <Input className="w-fit truncate" readOnly value={activeApiKey.key} />
        <ApiKeyOptions apiKeyKey={activeApiKey.key} />
      </div>

      <Paragraph className="text-center md:text-left mt-4 -mb-4">
        Your API history:
      </Paragraph>

      <Table userRequests={serializableRequests} />
    </div>
  );
};

export default ApiDashboard;
