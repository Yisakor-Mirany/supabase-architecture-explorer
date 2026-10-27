import { useEffect, useRef, useState } from "react";
import { architectureComponents } from "./data/architecture";
import ArchitectureDiagram from "./components/ArchitectureDiagram";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedComponent, setSelectedComponent] = useState(null);

  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  const categories = [
    "All",
    ...new Set(architectureComponents.map((component) => component.category)),
  ];

  const filteredComponents = architectureComponents.filter((component) => {
    const query = searchQuery.trim().toLowerCase();

    const matchesSearch =
      component.name.toLowerCase().includes(query) ||
      component.description.toLowerCase().includes(query) ||
      component.technology.toLowerCase().includes(query);

    const matchesCategory =
      selectedCategory === "All" || component.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  function resetFilters() {
    setSearchQuery("");
    setSelectedCategory("All");
  }

  function openComponentDetails(component) {
    previousFocusRef.current = document.activeElement;
    setSelectedComponent(component);
  }

  function closeComponentDetails() {
    setSelectedComponent(null);
  }

  useEffect(() => {
    if (!selectedComponent) return;

    const modal = modalRef.current;
    const previousFocus = previousFocusRef.current;
    const originalOverflow = document.body.style.overflow;

    // Disable background scrolling
    document.body.style.overflow = "hidden";

    // Focus the modal's close button
    const closeButton = modal.querySelector(".close-button");
    closeButton?.focus();

    const getFocusableElements = () =>
      Array.from(
        modal.querySelectorAll(
          "button:not([disabled]), a[href], input:not([disabled]), " +
            "select:not([disabled]), textarea:not([disabled]), " +
            '[tabindex]:not([tabindex="-1"])',
        ),
      );

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        setSelectedComponent(null);
        return;
      }

      if (event.key !== "Tab") return;

      const elements = getFocusableElements();

      if (elements.length === 0) {
        event.preventDefault();
        modal.focus();
        return;
      }

      const first = elements[0];
      const last = elements[elements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (!modal.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      }
    }

    function handleFocusIn(event) {
      if (!modal.contains(event.target)) {
        const elements = getFocusableElements();
        (elements[0] || modal).focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", handleFocusIn);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleFocusIn);

      document.body.style.overflow = originalOverflow;
      previousFocus?.focus();
    };
  }, [selectedComponent]);

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="brand">
            <span className="brand-icon" aria-hidden="true">
              ◆
            </span>
            <span>Architecture Explorer</span>
          </div>

          <nav aria-label="Main navigation">
            <a href="#overview">Overview</a>
            <a href="#architecture">Architecture</a>
            <a href="#components">Components</a>
            <a
              href="https://supabase.com/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="overview">
          <div className="hero-content">
            <div className="badge">SOFTWARE ARCHITECTURE EXPLORER</div>

            <h1>
              Explore the Architecture of
              <span className="highlight"> Supabase</span>
            </h1>

            <p className="hero-description">
              Discover how Supabase combines PostgreSQL, authentication, APIs,
              real-time communication, and infrastructure services into a modern
              backend platform.
            </p>

            <div className="hero-actions">
              <a href="#components" className="primary-button">
                Explore Components
              </a>

              <a
                href="https://github.com/supabase/supabase"
                className="secondary-button"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Source Code
              </a>
            </div>
          </div>
        </section>

        <section className="stats-section" aria-label="Architecture summary">
          <div className="stat-card">
            <span className="stat-value">{architectureComponents.length}</span>
            <span className="stat-label">Components</span>
          </div>

          <div className="stat-card">
            <span className="stat-value">{categories.length - 1}</span>
            <span className="stat-label">Categories</span>
          </div>

          <div className="stat-card">
            <span className="stat-value">PostgreSQL</span>
            <span className="stat-label">Primary Database</span>
          </div>

          <div className="stat-card">
            <span className="stat-value">Service-Oriented</span>
            <span className="stat-label">Architecture Style</span>
          </div>
        </section>

        <ArchitectureDiagram />

        <section className="components-section" id="components">
          <div className="section-heading">
            <div>
              <span className="section-label">SYSTEM COMPONENTS</span>
              <h2>Explore the Components</h2>
              <p>
                Search, filter, and select components to understand their
                responsibilities.
              </p>
            </div>
          </div>

          <div className="filters">
            <label htmlFor="component-search">Search components</label>

            <input
              id="component-search"
              type="search"
              placeholder="Search by name, technology, or description..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              maxLength={150}
            />

            <div className="category-filters" aria-label="Filter by category">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={
                    selectedCategory === category
                      ? "filter-button active"
                      : "filter-button"
                  }
                  aria-pressed={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <p className="results-count" role="status">
            Showing {filteredComponents.length} of{" "}
            {architectureComponents.length} components
          </p>

          {filteredComponents.length > 0 ? (
            <div className="component-grid">
              {filteredComponents.map((component) => (
                <article className="component-card" key={component.id}>
                  <div className="card-top">
                    <span className="component-category">
                      {component.category}
                    </span>

                    <span className="component-id">
                      #{String(component.id).padStart(2, "0")}
                    </span>
                  </div>

                  <h3>{component.name}</h3>

                  <p className="component-description">
                    {component.description}
                  </p>

                  <div className="card-bottom">
                    <span className="technology">{component.technology}</span>

                    <button
                      type="button"
                      className="details-button"
                      onClick={() => openComponentDetails(component)}
                      aria-label={`View details for ${component.name}`}
                    >
                      View Details →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No components found</h3>

              <p>No components match your current search and category.</p>

              <button
                type="button"
                className="primary-button"
                onClick={resetFilters}
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>
      </main>

      {selectedComponent && (
        <div className="modal-overlay" onClick={closeComponentDetails}>
          <section
            ref={modalRef}
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            tabIndex={-1}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <span className="component-category">
                {selectedComponent.category}
              </span>

              <button
                type="button"
                className="close-button"
                aria-label="Close component details"
                onClick={closeComponentDetails}
              >
                ×
              </button>
            </div>

            <h2 id="modal-title">{selectedComponent.name}</h2>

            <p id="modal-description">{selectedComponent.description}</p>

            <h3>Technology</h3>
            <p>{selectedComponent.technology}</p>

            <h3>Key Responsibilities</h3>

            <ul>
              {selectedComponent.responsibilities.map((responsibility) => (
                <li key={responsibility}>{responsibility}</li>
              ))}
            </ul>

            <button
              type="button"
              className="primary-button"
              onClick={closeComponentDetails}
            >
              Close Details
            </button>
          </section>
        </div>
      )}

      <footer className="footer">
        <p>
          Supabase Architecture Explorer — An educational software architecture
          project.
        </p>

        <p>Independent educational project. Not affiliated with Supabase.</p>
      </footer>
    </div>
  );
}

export default App;
