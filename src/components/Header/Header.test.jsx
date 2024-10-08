import { render, screen } from "@testing-library/react";
import { beforeEach, test, expect } from "vitest";
import { MemoryRouter } from "react-router-dom"; 
import Header from "./Header";

describe("Header component", () => {
    beforeEach(() => {
        render(
            // Render the Header component wrapped in MemoryRouter before each test
            <MemoryRouter> 
                <Header />
            </MemoryRouter>
        );
    });

    test("Header should render correctly", () => {
      
        const headerElement = screen.getByRole('banner');
        expect(headerElement).toBeInTheDocument();
    });

    test("Logo should redirect to the home page", () => {
        const logoLink = screen.getByText(/Webflix/i);
        expect(logoLink).toHaveAttribute('href', '/');
    });

    test("Search component should render with correct width style", () => {
        const searchInput = screen.getByPlaceholderText(/search/i);
        expect(searchInput).toHaveStyle({ width: '800px' });
    });

    test("Navbar should be present in the header", () => {
        const navbarElement = screen.getByRole('navigation'); 
        expect(navbarElement).toBeInTheDocument();
    });
});
