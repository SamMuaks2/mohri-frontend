// import { certifications } from "@/data/certifications";

// export default function CertificationsPage() {
//   return (
//     <section>
//       <h2 className="text-3xl font-bold mb-8 text-yellow-500">Certifications</h2>
//       <div className="grid md:grid-cols-2 gap-6">
//         {certifications.map((cert) => (
//           <div
//             key={cert.title}
//             className="border border-yellow-600/50 bg-zinc-950 p-6 rounded-lg hover:border-yellow-500 transition"
//           >
//             <div className="flex items-start justify-between mb-3">
//               <h3 className="text-xl font-semibold text-white">{cert.title}</h3>
//               {cert.badge && (
//                 <span className="text-2xl" title={cert.title}>
//                   {cert.badge}
//                 </span>
//               )}
//             </div>
//             <p className="text-yellow-500 font-medium">{cert.issuer}</p>
//             <p className="text-sm text-gray-400 mt-1">{cert.date}</p>
//             {cert.credentialId && (
//               <p className="text-xs text-gray-500 mt-2">
//                 ID: {cert.credentialId}
//               </p>
//             )}
//             {cert.skills && cert.skills.length > 0 && (
//               <div className="mt-4 flex flex-wrap gap-2">
//                 {cert.skills.map((skill) => (
//                   <span
//                     key={skill}
//                     className="text-xs bg-yellow-600/20 text-yellow-500 px-2 py-1 rounded"
//                   >
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }





// type Certification = {
//   id: string;
//   title: string;
//   issuer: string;
//   date: string;
//   badge?: string;
//   credentialId?: string;
//   skills?: string[];
// };

// async function getCertifications(): Promise<Certification[]> {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/certifications`,
//     {
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch certifications");
//   }

//   return res.json();
// }

// export default async function CertificationsPage() {
//   const certifications = await getCertifications();

//   return (
//     <section>
//       <h2 className="text-3xl font-bold mb-8 text-yellow-500">
//         Certifications
//       </h2>

//       <div className="grid md:grid-cols-2 gap-6">
//         {certifications.map((cert) => (
//           <div
//             key={cert.id}
//             className="border border-yellow-600/50 bg-zinc-950 p-6 rounded-lg hover:border-yellow-500 transition"
//           >
//             <div className="flex items-start justify-between mb-3">
//               <h3 className="text-xl font-semibold text-white">
//                 {cert.title}
//               </h3>

//               {cert.badge && (
//                 <span className="text-2xl" title={cert.title}>
//                   {cert.badge}
//                 </span>
//               )}
//             </div>

//             <p className="text-yellow-500 font-medium">
//               {cert.issuer}
//             </p>

//             <p className="text-sm text-gray-400 mt-1">
//               {cert.date}
//             </p>

//             {cert.credentialId && (
//               <p className="text-xs text-gray-500 mt-2">
//                 ID: {cert.credentialId}
//               </p>
//             )}

//             {cert.skills && cert.skills.length > 0 && (
//               <div className="mt-4 flex flex-wrap gap-2">
//                 {cert.skills.map((skill) => (
//                   <span
//                     key={skill}
//                     className="text-xs bg-yellow-600/20 text-yellow-500 px-2 py-1 rounded"
//                   >
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }



// "use client";

// import { useState } from "react";

// type Certification = {
//   id: string;
//   title: string;
//   issuer: string;
//   date: string;
//   badge?: string;
//   credentialId?: string;
//   skills?: string[];
// };

// async function getCertifications(): Promise<Certification[]> {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/certifications`,
//     { cache: "no-store" }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch certifications");
//   }

//   return res.json();
// }

// export default async function CertificationsPage() {
//   const certifications = await getCertifications();

//   return (
//     <section>
//       <h2 className="text-3xl font-bold mb-8 text-yellow-500">
//         Certifications
//       </h2>

//       <div className="grid md:grid-cols-2 gap-6">
//         {certifications.map((cert) => (
//           <CertificationCard key={cert.id} certification={cert} />
//         ))}
//       </div>
//     </section>
//   );
// }

// function CertificationCard({
//   certification,
// }: {
//   certification: Certification;
// }) {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <>
//       <div
//         onClick={() => setIsModalOpen(true)}
//         className="border border-yellow-600/50 bg-zinc-950 p-6 rounded-lg hover:border-yellow-500 transition cursor-pointer group"
//       >
//         <div className="flex items-start justify-between mb-3">
//           <h3 className="text-xl font-semibold text-white group-hover:text-yellow-500 transition">
//             {certification.title}
//           </h3>
//           {certification.badge && (
//             <span className="text-2xl" title={certification.title}>
//               {certification.badge}
//             </span>
//           )}
//         </div>

//         <p className="text-yellow-500 font-medium">{certification.issuer}</p>

//         <p className="text-sm text-gray-400 mt-1">{certification.date}</p>

//         {certification.credentialId && (
//           <p className="text-xs text-gray-500 mt-2">
//             ID: {certification.credentialId}
//           </p>
//         )}

//         {certification.skills && certification.skills.length > 0 && (
//           <div className="mt-4 flex flex-wrap gap-2">
//             {certification.skills.slice(0, 3).map((skill) => (
//               <span
//                 key={skill}
//                 className="text-xs bg-yellow-600/20 text-yellow-500 px-2 py-1 rounded"
//               >
//                 {skill}
//               </span>
//             ))}
//             {certification.skills.length > 3 && (
//               <span className="text-xs text-gray-400">
//                 +{certification.skills.length - 3} more
//               </span>
//             )}
//           </div>
//         )}

//         <p className="text-sm text-gray-400 mt-3 group-hover:text-yellow-500">
//           Click to read more →
//         </p>
//       </div>

//       {isModalOpen && (
//         <CertificationModal
//           certification={certification}
//           onClose={() => setIsModalOpen(false)}
//         />
//       )}
//     </>
//   );
// }

// function CertificationModal({
//   certification,
//   onClose,
// }: {
//   certification: Certification;
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
//           <div className="flex items-start gap-4">
//             {certification.badge && (
//               <span className="text-5xl">{certification.badge}</span>
//             )}
//             <div>
//               <h3 className="text-3xl font-bold text-yellow-500 mb-2">
//                 {certification.title}
//               </h3>
//               <p className="text-xl text-white font-semibold">
//                 {certification.issuer}
//               </p>
//               <p className="text-sm text-gray-400 mt-1">
//                 Issued: {certification.date}
//               </p>
//             </div>
//           </div>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-white text-2xl"
//           >
//             ×
//           </button>
//         </div>

//         <div className="space-y-6">
//           {certification.credentialId && (
//             <div>
//               <h4 className="text-xl font-semibold text-white mb-3">
//                 Credential Information
//               </h4>
//               <p className="text-gray-300">
//                 <span className="text-yellow-500 font-semibold">
//                   Credential ID:
//                 </span>{" "}
//                 {certification.credentialId}
//               </p>
//             </div>
//           )}

//           {certification.skills && certification.skills.length > 0 && (
//             <div>
//               <h4 className="text-xl font-semibold text-white mb-3">
//                 Skills Covered
//               </h4>
//               <div className="flex flex-wrap gap-2">
//                 {certification.skills.map((skill) => (
//                   <span
//                     key={skill}
//                     className="bg-yellow-600/20 text-yellow-500 px-4 py-2 rounded-lg text-sm font-semibold"
//                   >
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}
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

type Certification = {
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

  if (!res.ok) {
    throw new Error("Failed to fetch certifications");
  }

  const data = await res.json();

  // Map API response to frontend type
  return data.map((cert: any) => ({
    id: cert._id,
    title: cert.name,
    issuer: cert.issuer,
    date: new Date(cert.issueDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    badge: "🎓", // optional placeholder
    credentialId: cert.credentialId,
    credentialUrl: cert.credentialUrl,
    skills: [], // optional, populate if API provides skills
    description: cert.description,
  }));
}

export default async function CertificationsPage() {
  const certifications = await getCertifications();

  return (
    <section className="p-6">
      <h2 className="text-3xl font-bold mb-8 text-yellow-500">
        Certifications
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {certifications.map((cert) => (
          <CertificationCard key={cert.id} certification={cert} />
        ))}
      </div>
    </section>
  );
}

function CertificationCard({ certification }: { certification: Certification }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="border border-yellow-600/50 bg-zinc-950 p-6 rounded-lg hover:border-yellow-500 transition cursor-pointer group"
      >
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-white group-hover:text-yellow-500 transition">
            {certification.title}
          </h3>
          {certification.badge && (
            <span className="text-2xl" title={certification.title}>
              {certification.badge}
            </span>
          )}
        </div>

        <p className="text-yellow-500 font-medium">{certification.issuer}</p>

        <p className="text-sm text-gray-400 mt-1">{certification.date}</p>

        {certification.credentialId && (
          <p className="text-xs text-gray-500 mt-2">
            ID: {certification.credentialId}
          </p>
        )}

        <p className="text-sm text-gray-400 mt-3 group-hover:text-yellow-500">
          Click to read more →
        </p>
      </div>

      {isModalOpen && (
        <CertificationModal
          certification={certification}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

function CertificationModal({
  certification,
  onClose,
}: {
  certification: Certification;
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
          <div className="flex items-start gap-4">
            {certification.badge && (
              <span className="text-5xl">{certification.badge}</span>
            )}
            <div>
              <h3 className="text-3xl font-bold text-yellow-500 mb-2">
                {certification.title}
              </h3>
              <p className="text-xl text-white font-semibold">
                {certification.issuer}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Issued: {certification.date}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          {certification.description && (
            <div>
              <h4 className="text-xl font-semibold text-white mb-3">
                Description
              </h4>
              <p className="text-gray-300">{certification.description}</p>
            </div>
          )}

          {certification.credentialId && (
            <div>
              <h4 className="text-xl font-semibold text-white mb-3">
                Credential Information
              </h4>
              <p className="text-gray-300">
                <span className="text-yellow-500 font-semibold">
                  Credential ID:
                </span>{" "}
                {certification.credentialId}
              </p>
              {certification.credentialUrl && (
                <p className="text-gray-300 mt-1">
                  <a
                    href={certification.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-500 underline"
                  >
                    View Credential
                  </a>
                </p>
              )}
            </div>
          )}

          {certification.skills && certification.skills.length > 0 && (
            <div>
              <h4 className="text-xl font-semibold text-white mb-3">
                Skills Covered
              </h4>
              <div className="flex flex-wrap gap-2">
                {certification.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-yellow-600/20 text-yellow-500 px-4 py-2 rounded-lg text-sm font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
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
