import { useState } from "react";
import { architectureComponents } from "../data/architecture";

const diagramGroups = [
  {
    title: "Client Layer",
    description: "Applications and users accessing Supabase.",
    services: ["Client Application"],
  },
  {
    title: "API Gateway",
    description: "Entry point for backend API requests.",
    services: ["API Gateway"],
  },
  {
    title: "Application Services",
    description: "Specialized backend services.",
    services: [
      "PostgREST",
      "Supabase Auth",
      "Supabase Storage",
      "Supabase Realtime",
      "Edge Functions",
    ],
  },
  {
    title: "Data Layer",
    description: "Database and supporting infrastructure.",
    services: ["PostgreSQL", "Supavisor", "postgres-meta"],
  },
];

function ArchitectureDiagram() {
  const [activeService, setActiveService] = useState(null);

  const selectedComponent = architectureComponents.find(
    (component) => component.name === activeService,
  );

  return (
    <section
      className="architecture-section"
      id="architecture"
      aria-labelledby="architecture-title"
    >
      <div className="section-heading">
        <span className="section-label">SYSTEM ARCHITECTURE</span>

        <h2 id="architecture-title">Interactive Architecture Diagram</h2>

        <p>
          Explore the major layers of Supabase. Select a service to learn about
          its responsibilities.
        </p>
      </div>

      <div className="architecture-diagram">
        {diagramGroups.map((group, groupIndex) => (
          <div className="diagram-group" key={group.title}>
            <div className="diagram-layer">
              <h3>{group.title}</h3>
              <p>{group.description}</p>

              <div className="diagram-services">
                {group.services.map((service) => {
                  const isSelected = activeService === service;

                  return (
                    <button
                      key={service}
                      type="button"
                      className={
                        isSelected ? "diagram-node selected" : "diagram-node"
                      }
                      aria-pressed={isSelected}
                      onClick={() => setActiveService(service)}
                    >
                      <span className="node-indicator" />
                      {service}
                    </button>
                  );
                })}
              </div>
            </div>

            {groupIndex < diagramGroups.length - 1 && (
              <div className="diagram-connector" aria-hidden="true">
                <span>↓</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="diagram-details" aria-live="polite">
        {selectedComponent ? (
          <>
            <span className="section-label">SELECTED COMPONENT</span>

            <h3>{selectedComponent.name}</h3>

            <p>{selectedComponent.description}</p>

            <h4>Key Responsibilities</h4>

            <ul>
              {selectedComponent.responsibilities.map((responsibility) => (
                <li key={responsibility}>{responsibility}</li>
              ))}
            </ul>
          </>
        ) : activeService === "Client Application" ? (
          <>
            <h3>Client Application</h3>
            <p>
              Represents a web or mobile application that communicates with
              Supabase services through supported APIs and client libraries.
            </p>
          </>
        ) : (
          <>
            <h3>Select a Component</h3>
            <p>
              Click any service in the diagram to explore its architectural
              role.
            </p>
          </>
        )}
      </div>

      <p className="diagram-note">
        Note: This is a simplified educational diagram. Actual service
        communication depends on the deployment configuration.
      </p>
    </section>
  );
}

export default ArchitectureDiagram;
