import CertificationsClient from "./CertificationsClient";

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  badge?: string;
  credentialId?: string;
  credentialUrl?: string;
  skills?: string[];
  description?: string;
};

async function getCertifications(): Promise<Certification[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/certifications`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch certifications");

  const data = await res.json();

  return data.map((cert: any) => ({
    id: cert._id,
    title: cert.name,
    issuer: cert.issuer,
    date: new Date(cert.issueDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    badge: "🎓",
    credentialId: cert.credentialId,
    credentialUrl: cert.credentialUrl,
    skills: cert.skills || [],
    description: cert.description,
  }));
}

export default async function CertificationsPage() {
  const certifications = await getCertifications();

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <CertificationsClient certifications={certifications} />
    </main>
  );
}
