import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { architectureComponents } from "./data/architecture";

afterEach(() => {
  cleanup();
});

describe("Supabase Architecture Explorer", () => {
  // Test 1: Dashboard Rendering
  it("renders the dashboard heading", () => {
    render(<App />);

    const heading = screen.getByRole("heading", {
      level: 1,
    });

    expect(heading).toBeInTheDocument();

    expect(heading).toHaveTextContent(
      /explore the architecture of\s*supabase/i,
    );
  });

  // Test 2: Search Functionality
  it("filters components using search", async () => {
    const user = userEvent.setup();

    render(<App />);

    const searchInput = screen.getByRole("searchbox", {
      name: /search components/i,
    });

    await user.type(searchInput, "PostgreSQL");

    const componentSection = document.querySelector(".components-section");

    expect(componentSection).not.toBeNull();

    expect(
      within(componentSection).getByRole("heading", {
        name: "PostgreSQL",
      }),
    ).toBeInTheDocument();

    expect(
      within(componentSection).queryByRole("heading", {
        name: "Supabase Auth",
      }),
    ).not.toBeInTheDocument();
  });

  // Test 3: Category Filtering
  it("filters components by category", async () => {
    const user = userEvent.setup();

    render(<App />);

    const authenticationButton = screen.getByRole("button", {
      name: "Authentication",
      exact: true,
    });

    await user.click(authenticationButton);

    const componentSection = document.querySelector(".components-section");

    expect(componentSection).not.toBeNull();

    expect(
      within(componentSection).getByRole("heading", {
        name: "Supabase Auth",
      }),
    ).toBeInTheDocument();

    expect(
      within(componentSection).queryByRole("heading", {
        name: "PostgreSQL",
      }),
    ).not.toBeInTheDocument();

    expect(authenticationButton).toHaveAttribute("aria-pressed", "true");
  });

  // Test 4: Invalid Search and Reset
  it("shows an empty state for invalid searches", async () => {
    const user = userEvent.setup();

    render(<App />);

    const searchInput = screen.getByRole("searchbox", {
      name: /search components/i,
    });

    await user.type(searchInput, "xyz123456");

    const componentSection = document.querySelector(".components-section");

    expect(componentSection).not.toBeNull();

    expect(
      within(componentSection).getByRole("heading", {
        name: /no components found/i,
      }),
    ).toBeInTheDocument();

    expect(within(componentSection).queryAllByRole("article")).toHaveLength(0);

    await user.click(
      within(componentSection).getByRole("button", {
        name: /clear filters/i,
      }),
    );

    expect(searchInput).toHaveValue("");

    expect(
      within(componentSection).getByText(
        new RegExp(
          `showing ${architectureComponents.length} of ${architectureComponents.length} components`,
          "i",
        ),
      ),
    ).toBeInTheDocument();
  });

  // Test 5: Component Details Modal
  it("opens component details", async () => {
    const user = userEvent.setup();

    render(<App />);

    const componentSection = document.querySelector(".components-section");

    expect(componentSection).not.toBeNull();

    const postgresqlCard = within(componentSection)
      .getByRole("heading", {
        name: "PostgreSQL",
      })
      .closest("article");

    expect(postgresqlCard).not.toBeNull();

    const detailsButton = within(postgresqlCard).getByRole("button", {
      name: /view details for postgresql/i,
    });

    await user.click(detailsButton);

    const dialog = screen.getByRole("dialog");

    expect(dialog).toBeInTheDocument();

    expect(dialog).toHaveAttribute("aria-modal", "true");

    expect(
      within(dialog).getByRole("heading", {
        name: "PostgreSQL",
      }),
    ).toBeInTheDocument();

    expect(
      within(dialog).getByText(/key responsibilities/i),
    ).toBeInTheDocument();
  });

  // Test 6: Close Modal Using Escape
  it("closes the modal using Escape", async () => {
    const user = userEvent.setup();

    render(<App />);

    const componentSection = document.querySelector(".components-section");

    expect(componentSection).not.toBeNull();

    const detailsButton = within(componentSection).getByRole("button", {
      name: /view details for postgresql/i,
    });

    await user.click(detailsButton);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    // Focus should return to the original button.
    expect(detailsButton).toHaveFocus();
  });

  // Test 7: Architecture Diagram
  it("renders the architecture diagram", () => {
    render(<App />);

    const architectureSection = document.querySelector(".architecture-section");

    expect(architectureSection).not.toBeNull();

    expect(
      within(architectureSection).getByRole("heading", {
        name: /interactive architecture diagram/i,
      }),
    ).toBeInTheDocument();

    expect(
      within(architectureSection).getByRole("button", {
        name: "API Gateway",
      }),
    ).toBeInTheDocument();

    expect(
      within(architectureSection).getByRole("button", {
        name: "PostgreSQL",
      }),
    ).toBeInTheDocument();
  });
});
