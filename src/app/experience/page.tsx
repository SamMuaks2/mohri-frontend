// import { experience } from "@/data/experience";

// export default function ExperiencePage() {
//   return (
//     <section>
//       <h2 className="text-3xl font-bold mb-8 text-yellow-500">Experience</h2>
//       <div className="space-y-6">
//         {experience.map((exp) => (
//           <div key={exp.role} className="border border-yellow-600/50 bg-zinc-950 p-6 rounded-lg hover:border-yellow-500 transition">
//             <h3 className="font-semibold text-xl text-white">{exp.role}</h3>
//             <p className="text-gray-300">{exp.company}</p>
//             <p className="text-sm text-gray-400">{exp.period}</p>
//             <p className="mt-4 text-gray-300">{exp.description}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }




// type Experience = {
//   id: string;
//   role: string;
//   company: string;
//   period: string;
//   description: string;
// };

// async function getExperience(): Promise<Experience[]> {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/experience`,
//     {
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch experience");
//   }

//   return res.json();
// }

// export default async function ExperiencePage() {
//   const experience = await getExperience();

//   return (
//     <section>
//       <h2 className="text-3xl font-bold mb-8 text-yellow-500">
//         Experience
//       </h2>

//       <div className="space-y-6">
//         {experience.map((exp) => (
//           <div
//             key={exp.id}
//             className="border border-yellow-600/50 bg-zinc-950 p-6 rounded-lg hover:border-yellow-500 transition"
//           >
//             <h3 className="font-semibold text-xl text-white">
//               {exp.role}
//             </h3>

//             <p className="text-gray-300">
//               {exp.company}
//             </p>

//             <p className="text-sm text-gray-400">
//               {exp.period}
//             </p>

//             <p className="mt-4 text-gray-300">
//               {exp.description}
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }




"use client";

import { useState } from "react";

type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
};

async function getExperience(): Promise<Experience[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/experience`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch experience");
  }

  return res.json();
}

export default async function ExperiencePage() {
  const experience = await getExperience();

  return (
    <section>
      <h2 className="text-3xl font-bold mb-8 text-yellow-500">Experience</h2>

      <div className="space-y-6">
        {experience.map((exp) => (
          <ExperienceCard key={exp.id} experience={exp} />
        ))}
      </div>
    </section>
  );
}

function ExperienceCard({ experience }: { experience: Experience }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="border border-yellow-600/50 bg-zinc-950 p-6 rounded-lg hover:border-yellow-500 transition cursor-pointer group"
      >
        <h3 className="font-semibold text-xl text-white group-hover:text-yellow-500 transition">
          {experience.role}
        </h3>

        <p className="text-gray-300">{experience.company}</p>

        <p className="text-sm text-gray-400">{experience.period}</p>

        <p className="mt-4 text-gray-300 line-clamp-2">{experience.description}</p>

        <p className="text-sm text-gray-400 mt-3 group-hover:text-yellow-500">
          Click to read more →
        </p>
      </div>

      {isModalOpen && (
        <ExperienceModal
          experience={experience}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

function ExperienceModal({
  experience,
  onClose,
}: {
  experience: Experience;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-zinc-950 border-2 border-yellow-500 p-8 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-3xl font-bold text-yellow-500 mb-2">
              {experience.role}
            </h3>
            <p className="text-xl text-white font-semibold">
              {experience.company}
            </p>
            <p className="text-sm text-gray-400 mt-1">{experience.period}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold text-white mb-3">
              Role Description
            </h4>
            <p className="text-gray-300 leading-relaxed">
              {experience.description}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}