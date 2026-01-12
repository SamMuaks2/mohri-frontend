import ExperienceClient from "./ExperienceClient";

export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  responsibilities?: string[];
  technologies?: string[];
};

async function getExperience(): Promise<Experience[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/experience`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch experience");

  const data = await res.json();

  return data.map((exp: any) => {
    const start = new Date(exp.startDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });

    const end = exp.current
      ? "Present"
      : new Date(exp.endDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        });

    return {
      id: exp._id,
      role: exp.position,
      company: exp.company,
      period: `${start} - ${end}`,
      description: exp.description,
      responsibilities: exp.responsibilities,
      technologies: exp.technologies,
    };
  });
}

export default async function ExperiencePage() {
  const experience = await getExperience();

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <ExperienceClient experience={experience} />
    </main>
  );
}
