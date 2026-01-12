"use client";

import { useState } from "react";
import { Certification } from "./page";

export default function CertificationsClient({
  certifications,
}: {
  certifications: Certification[];
}) {
  return (
    <section>
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="group border border-yellow-600/40 bg-zinc-950 p-6 rounded-xl cursor-pointer hover:border-yellow-500 transition"
      >
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-white group-hover:text-yellow-500">
            {certification.title}
          </h3>
          {certification.badge && (
            <span className="text-2xl">{certification.badge}</span>
          )}
        </div>

        <p className="text-yellow-500 font-medium">
          {certification.issuer}
        </p>
        <p className="text-sm text-gray-400 mt-1">
          {certification.date}
        </p>

        {certification.credentialId && (
          <p className="text-xs text-gray-500 mt-2">
            ID: {certification.credentialId}
          </p>
        )}
      </div>

      {isOpen && (
        <CertificationModal
          certification={certification}
          onClose={() => setIsOpen(false)}
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
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-zinc-950 border border-yellow-500 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8"
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-start gap-4">
            {certification.badge && (
              <span className="text-5xl">{certification.badge}</span>
            )}
            <div>
              <h2 className="text-3xl font-bold text-yellow-500">
                {certification.title}
              </h2>
              <p className="text-xl text-white font-semibold mt-2">
                {certification.issuer}
              </p>
              <p className="text-gray-400 mt-1">
                {certification.date}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-3xl"
          >
            ×
          </button>
        </div>

        {certification.description && (
          <p className="text-gray-300 leading-relaxed mb-6">
            {certification.description}
          </p>
        )}

        {certification.credentialId && (
          <div className="mb-6">
            <p className="text-gray-300">
              <span className="text-yellow-500 font-semibold">
                Credential ID:
              </span>{" "}
              {certification.credentialId}
            </p>

            {certification.credentialUrl && (
              <a
                href={certification.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-yellow-500 underline"
              >
                View Credential →
              </a>
            )}
          </div>
        )}

        {certification.skills?.length ? (
          <div className="flex flex-wrap gap-2">
            {certification.skills.map((skill) => (
              <span
                key={skill}
                className="text-xs bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
