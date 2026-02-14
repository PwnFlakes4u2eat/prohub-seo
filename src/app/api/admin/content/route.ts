import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import servicesData from '../../../../../data/services.json';
import townsData from '../../../../../data/towns.json';

export async function GET() {
  const items: {
    service: string;
    town: string;
    status: 'pending' | 'live';
    lastUpdated: string;
    title: string;
  }[] = [];

  const services = servicesData.services;
  const towns = townsData.towns;

  // Check each service/town combination
  for (const service of services) {
    for (const town of towns) {
      const liveDir = path.join(process.cwd(), 'data', 'content', 'live', service.slug);
      const pendingDir = path.join(process.cwd(), 'data', 'content', 'pending', service.slug);
      
      const livePath = path.join(liveDir, `${town.slug}.json`);
      const pendingPath = path.join(pendingDir, `${town.slug}.json`);
      
      if (fs.existsSync(livePath)) {
        const content = JSON.parse(fs.readFileSync(livePath, 'utf-8'));
        items.push({
          service: service.slug,
          town: town.slug,
          status: 'live',
          lastUpdated: content.lastUpdated || new Date().toISOString(),
          title: content.title || `${service.namePlural} in ${town.name}`,
        });
      } else if (fs.existsSync(pendingPath)) {
        const content = JSON.parse(fs.readFileSync(pendingPath, 'utf-8'));
        items.push({
          service: service.slug,
          town: town.slug,
          status: 'pending',
          lastUpdated: content.lastUpdated || new Date().toISOString(),
          title: content.title || `${service.namePlural} in ${town.name}`,
        });
      }
    }
  }

  // Sort by status (pending first) then by lastUpdated
  items.sort((a, b) => {
    if (a.status !== b.status) {
      return a.status === 'pending' ? -1 : 1;
    }
    return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
  });

  return NextResponse.json({ items });
}
