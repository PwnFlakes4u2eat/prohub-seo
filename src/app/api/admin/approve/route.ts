import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { service, town } = await request.json();
    
    if (!service || !town) {
      return NextResponse.json({ error: 'Missing service or town' }, { status: 400 });
    }

    const pendingDir = path.join(process.cwd(), 'data', 'content', 'pending', service);
    const liveDir = path.join(process.cwd(), 'data', 'content', 'live', service);
    
    const pendingPath = path.join(pendingDir, `${town}.json`);
    const livePath = path.join(liveDir, `${town}.json`);
    
    // Check if pending file exists
    if (!fs.existsSync(pendingPath)) {
      return NextResponse.json({ error: 'Content not found in pending' }, { status: 404 });
    }

    // Ensure live directory exists
    if (!fs.existsSync(liveDir)) {
      fs.mkdirSync(liveDir, { recursive: true });
    }

    // Read pending content
    const content = JSON.parse(fs.readFileSync(pendingPath, 'utf-8'));
    
    // Update status and timestamp
    content.status = 'live';
    content.approvedAt = new Date().toISOString();
    
    // Write to live directory
    fs.writeFileSync(livePath, JSON.stringify(content, null, 2));
    
    // Remove from pending
    fs.unlinkSync(pendingPath);
    
    // Clean up empty pending directory
    const pendingFiles = fs.readdirSync(pendingDir);
    if (pendingFiles.length === 0) {
      fs.rmdirSync(pendingDir);
    }

    return NextResponse.json({ success: true, message: `Approved ${service}/${town}` });
  } catch (error) {
    console.error('Error approving content:', error);
    return NextResponse.json({ error: 'Failed to approve content' }, { status: 500 });
  }
}
