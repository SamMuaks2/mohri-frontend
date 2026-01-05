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


type Certification = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  badge?: string;
  credentialId?: string;
  skills?: string[];
};

async function getCertifications(): Promise<Certification[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/certifications`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch certifications");
  }

  return res.json();
}

export default async function CertificationsPage() {
  const certifications = await getCertifications();

  return (
    <section>
      <h2 className="text-3xl font-bold mb-8 text-yellow-500">
        Certifications
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="border border-yellow-600/50 bg-zinc-950 p-6 rounded-lg hover:border-yellow-500 transition"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-semibold text-white">
                {cert.title}
              </h3>

              {cert.badge && (
                <span className="text-2xl" title={cert.title}>
                  {cert.badge}
                </span>
              )}
            </div>

            <p className="text-yellow-500 font-medium">
              {cert.issuer}
            </p>

            <p className="text-sm text-gray-400 mt-1">
              {cert.date}
            </p>

            {cert.credentialId && (
              <p className="text-xs text-gray-500 mt-2">
                ID: {cert.credentialId}
              </p>
            )}

            {cert.skills && cert.skills.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs bg-yellow-600/20 text-yellow-500 px-2 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
