// import ProjectsClient from "./ProjectsClient";

// export type Project = {
//   id: string;
//   title: string;
//   description: string;
//   tech: string[];
//   createdAt: string;
//   updatedAt: string;
// };

// async function getProjects(): Promise<Project[]> {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/projects`,
//     { cache: "no-store" }
//   );

//   if (!res.ok) throw new Error("Failed to fetch projects");

//   const data = await res.json();

//   return data.map((project: any) => ({
//     id: project._id,
//     title: project.title,
//     description: project.description,
//     tech: project.tech,
//     createdAt: new Date(project.createdAt).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     }),
//     updatedAt: new Date(project.updatedAt).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     }),
//   }));
// }

// export default async function ProjectsPage() {
//   const projects = await getProjects();

//   return (
//     <main className="max-w-6xl mx-auto px-6 py-16">
//       <ProjectsClient projects={projects} />
//     </main>
//   );
// }



// src/app/projects/page.tsx (Public Frontend)
import ProjectsClient from "./ProjectsClient";

export interface ProjectLink {
  label: string;
  url: string;
}

export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  links: ProjectLink[];
  createdAt: string;
  updatedAt: string;
};

async function getProjects(): Promise<Project[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/projects`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch projects");

  const data = await res.json();

  return data.map((project: any) => ({
    id: project._id,
    title: project.title,
    description: project.description,
    tech: project.tech,
    links: project.links || [],
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
    <main className="max-w-6xl mx-auto px-6 py-16">
      <ProjectsClient projects={projects} />
    </main>
  );
}