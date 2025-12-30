import { experience } from "@/data/experience";

export default function ExperiencePage() {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-8">Experience</h2>
      <div className="space-y-6">
        {experience.map((exp) => (
          <div key={exp.role} className="border border-gray-800 p-6 rounded-lg">
            <h3 className="font-semibold text-xl">{exp.role}</h3>
            <p className="text-gray-400">{exp.company}</p>
            <p className="text-sm text-gray-500">{exp.period}</p>
            <p className="mt-4 text-gray-400">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
