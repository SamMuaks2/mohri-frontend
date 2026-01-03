import { experience } from "@/data/experience";

export default function ExperiencePage() {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-8 text-yellow-500">Experience</h2>
      <div className="space-y-6">
        {experience.map((exp) => (
          <div key={exp.role} className="border border-yellow-600/50 bg-zinc-950 p-6 rounded-lg hover:border-yellow-500 transition">
            <h3 className="font-semibold text-xl text-white">{exp.role}</h3>
            <p className="text-gray-300">{exp.company}</p>
            <p className="text-sm text-gray-400">{exp.period}</p>
            <p className="mt-4 text-gray-300">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}