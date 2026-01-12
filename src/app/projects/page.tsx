// import { projects } from "@/data/projects";

// export default function ProjectsPage() {
//   return (
//     <section>
//       <h2 className="text-3xl font-bold mb-8 text-yellow-500">Projects</h2>
//       <div className="grid md:grid-cols-2 gap-6">
//         {projects.map((project) => (
//           <div key={project.title} className="border border-yellow-600/50 bg-zinc-950 p-6 rounded-lg hover:border-yellow-500 transition">
//             <h3 className="text-xl font-semibold text-white">{project.title}</h3>
//             <p className="text-gray-300 mt-2">{project.description}</p>
//             <p className="text-sm text-yellow-500 mt-3">
//               {project.tech.join(" • ")}
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }


// type Project = {
//   id: string;
//   title: string;
//   description: string;
//   tech: string[];
// };

// async function getProjects(): Promise<Project[]> {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/projects`,
//     { cache: "no-store" }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch projects");
//   }

//   return res.json();
// }

// export default async function ProjectsPage() {
//   const projects = await getProjects();

//   return (
//     <section>
//       <h2 className="text-3xl font-bold mb-8 text-yellow-500">Projects</h2>

//       <div className="grid md:grid-cols-2 gap-6">
//         {projects.map((project) => (
//           <div
//             key={project.id}
//             className="border border-yellow-600/50 bg-zinc-950 p-6 rounded-lg hover:border-yellow-500 transition"
//           >
//             <h3 className="text-xl font-semibold text-white">
//               {project.title}
//             </h3>

//             <p className="text-gray-300 mt-2">{project.description}</p>

//             <p className="text-sm text-yellow-500 mt-3">
//               {project.tech.join(" • ")}
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }




// "use client";

// import { useState } from "react";

// type Project = {
//   id: string;
//   title: string;
//   description: string;
//   tech: string[];
// };

// async function getProjects(): Promise<Project[]> {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/projects`,
//     { cache: "no-store" }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch projects");
//   }

//   return res.json();
// }

// export default async function ProjectsPage() {
//   const projects = await getProjects();

//   return (
//     <section>
//       <h2 className="text-3xl font-bold mb-8 text-yellow-500">Projects</h2>

//       <div className="grid md:grid-cols-2 gap-6">
//         {projects.map((project) => (
//           <ProjectCard key={project.id} project={project} />
//         ))}
//       </div>
//     </section>
//   );
// }

// function ProjectCard({ project }: { project: Project }) {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <>
//       <div
//         onClick={() => setIsModalOpen(true)}
//         className="border border-yellow-600/50 bg-zinc-950 p-6 rounded-lg hover:border-yellow-500 transition cursor-pointer group"
//       >
//         <h3 className="text-xl font-semibold text-white group-hover:text-yellow-500 transition">
//           {project.title}
//         </h3>

//         <p className="text-gray-300 mt-2 line-clamp-2">{project.description}</p>

//         <p className="text-sm text-yellow-500 mt-3">
//           {project.tech.join(" • ")}
//         </p>

//         <p className="text-sm text-gray-400 mt-3 group-hover:text-yellow-500">
//           Click to read more →
//         </p>
//       </div>

//       {isModalOpen && (
//         <ProjectModal
//           project={project}
//           onClose={() => setIsModalOpen(false)}
//         />
//       )}
//     </>
//   );
// }

// function ProjectModal({
//   project,
//   onClose,
// }: {
//   project: Project;
//   onClose: () => void;
// }) {
//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
//       onClick={onClose}
//     >
//       <div
//         className="bg-zinc-950 border-2 border-yellow-500 p-8 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex justify-between items-start mb-6">
//           <h3 className="text-3xl font-bold text-yellow-500">
//             {project.title}
//           </h3>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-white text-2xl"
//           >
//             ×
//           </button>
//         </div>

//         <div className="space-y-6">
//           <div>
//             <h4 className="text-xl font-semibold text-white mb-3">
//               Description
//             </h4>
//             <p className="text-gray-300 leading-relaxed">
//               {project.description}
//             </p>
//           </div>

//           <div>
//             <h4 className="text-xl font-semibold text-white mb-3">
//               Technologies Used
//             </h4>
//             <div className="flex flex-wrap gap-2">
//               {project.tech.map((tech) => (
//                 <span
//                   key={tech}
//                   className="bg-yellow-600/20 text-yellow-500 px-4 py-2 rounded-lg text-sm font-semibold"
//                 >
//                   {tech}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>

//         <button
//           onClick={onClose}
//           className="mt-8 w-full bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }




"use client";

import { useState } from "react";

type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  createdAt: string;
  updatedAt: string;
};

async function getProjects(): Promise<Project[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/projects`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  const data = await res.json();

  // Map API response to frontend type
  return data.map((project: any) => ({
    id: project._id,
    title: project.title,
    description: project.description,
    tech: project.tech,
    createdAt: new Date(project.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    updatedAt: new Date(project.updatedAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  }));
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section className="p-6">
      <h2 className="text-3xl font-bold mb-8 text-yellow-500">Projects</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="border border-yellow-600/50 bg-zinc-950 p-6 rounded-lg hover:border-yellow-500 transition cursor-pointer group"
      >
        <h3 className="text-xl font-semibold text-white group-hover:text-yellow-500 transition">
          {project.title}
        </h3>

        <p className="text-gray-300 mt-2 line-clamp-2">{project.description}</p>

        <p className="text-sm text-yellow-500 mt-3">
          {project.tech.join(" • ")}
        </p>

        <p className="text-xs text-gray-400 mt-1">
          Created: {project.createdAt}
        </p>

        <p className="text-sm text-gray-400 mt-3 group-hover:text-yellow-500">
          Click to read more →
        </p>
      </div>

      {isModalOpen && (
        <ProjectModal project={project} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
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
          <h3 className="text-3xl font-bold text-yellow-500">{project.title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold text-white mb-3">Description</h4>
            <p className="text-gray-300 leading-relaxed">{project.description}</p>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-white mb-3">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="bg-yellow-600/20 text-yellow-500 px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="text-xs text-gray-400 mt-2">
            Created: {project.createdAt} • Updated: {project.updatedAt}
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
