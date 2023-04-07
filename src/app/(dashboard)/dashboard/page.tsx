import React from 'react';

import type { Metadata } from 'next';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Similarity API | Dashboard',
  description: 'Free & Open Source API for text similarity',
};

const page = async () => {
  const user = await getServerSession(authOptions);

  if (!user) return notFound();

  const apikey = await db.apikey.findFirst({
    where: {
      userId: user.user.id,
      enabled: true,
    },
  });
  return (
    <div className="max-w-7xl mx-auto mt-16">
      {apikey ? <ApiDashboard /> : <RequestApikey />}
    </div>
  );
};

export default page;