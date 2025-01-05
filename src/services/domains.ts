import { BusinessProfile } from '@/types/business';

// We'll use Vercel Domains API for domain management
const VERCEL_API = 'https://api.vercel.com/v9/projects/';

export async function addCustomDomain(domain: string, businessId: string) {
  try {
    // Add domain to Vercel project
    const response = await fetch(`${VERCEL_API}${process.env.VERCEL_PROJECT_ID}/domains`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: domain })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error.message);
    }

    // Return verification instructions
    return {
      verified: data.verified,
      nameservers: data.nameservers,
      configuredBy: data.configuredBy,
      txtVerification: data.verification?.find((v: any) => v.type === 'TXT')
    };
  } catch (error) {
    console.error('Domain configuration error:', error);
    throw error;
  }
}

export async function verifyDomain(domain: string) {
  try {
    const response = await fetch(
      `${VERCEL_API}${process.env.VERCEL_PROJECT_ID}/domains/${domain}/verify`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}`,
        },
      }
    );

    const data = await response.json();
    return data.verified;
  } catch (error) {
    console.error('Domain verification error:', error);
    throw error;
  }
}

export async function removeDomain(domain: string) {
  try {
    await fetch(
      `${VERCEL_API}${process.env.VERCEL_PROJECT_ID}/domains/${domain}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}`,
        },
      }
    );
  } catch (error) {
    console.error('Domain removal error:', error);
    throw error;
  }
}