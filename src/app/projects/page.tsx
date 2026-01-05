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


type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
};

async function getProjects(): Promise<Project[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/projects`,
    { cache: "no-store" } // always fresh
  );

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  return res.json();
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section>
      <h2 className="text-3xl font-bold mb-8 text-yellow-500">Projects</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border border-yellow-600/50 bg-zinc-950 p-6 rounded-lg hover:border-yellow-500 transition"
          >
            <h3 className="text-xl font-semibold text-white">
              {project.title}
            </h3>

            <p className="text-gray-300 mt-2">{project.description}</p>

            <p className="text-sm text-yellow-500 mt-3">
              {project.tech.join(" • ")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
