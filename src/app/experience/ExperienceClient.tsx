"use client";

import { Experience } from "./page";

type Props = {
  experience: Experience[];
};

export default function ExperienceClient({ experience }: Props) {
  return (
    <section className="space-y-8">
      <h2 className="text-3xl font-bold mb-8 text-yellow-500">Experience</h2>
      
      {experience.map((item) => (
        <div
          key={item.id}
          className="border border-yellow-600/40 bg-zinc-950 rounded-xl p-6 hover:border-yellow-500 transition"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3">
            <div>
              <h3 className="text-xl font-semibold text-white">{item.role}</h3>
              <p className="text-yellow-500 font-medium">{item.company}</p>
            </div>

            <p className="text-sm text-gray-400 mt-2 md:mt-0">
              {item.period}
            </p>
          </div>

          <p className="text-gray-300 whitespace-pre-line mb-4 leading-relaxed">
            {item.description}
          </p>

          {item.responsibilities && item.responsibilities.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-white mb-2">Responsibilities</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                {item.responsibilities.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}

          {item.technologies && item.technologies.length > 0 && (
            <div>
              <h4 className="font-semibold text-white mb-2">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}