import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Logo from "@/components/Logo";

describe("Logo", () => {
  it("renders the app name", () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );

    expect(screen.getByText("PLEXSTREAM")).toBeInTheDocument();
  });
});
