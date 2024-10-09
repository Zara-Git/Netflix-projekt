import FilmView from "./FilmView";
import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("Filmview", () => {
  //Kollar så all filminformation visas
  test("renders without crashing", () => {
    render(
      <MemoryRouter initialEntries={["/movie/The Shawshank Redemption"]}>
        <Routes>
          <Route path="/movie/:title" element={<FilmView />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("The Shawshank Redemption")).toBeInTheDocument();
    expect(screen.getByText("1994")).toBeInTheDocument();
    expect(screen.getByText("R")).toBeInTheDocument();
    expect(
      screen.getByText("Tim Robbins, Morgan Freeman, Bob Gunton")
    ).toBeInTheDocument();
    expect(screen.getByText("Drama")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion."
      )
    ).toBeInTheDocument();

    const img = screen.getByAltText("The Shawshank Redemption");
    expect(img).toHaveAttribute(
      "src",
      "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_QL75_UX380_CR0,4,380,562_.jpg"
    );
  });

  // Kollar så att alla knappar visas
  test("renders all buttons", () => {
    render(
      <MemoryRouter initialEntries={["/movie/The Shawshank Redemption"]}>
        <Routes>
          <Route path="/movie/:title" element={<FilmView />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Play")).toBeInTheDocument();
    expect(screen.getByText("Add to Bookmark")).toBeInTheDocument();
    expect(screen.getByText("Go back")).toBeInTheDocument();
  });

  //Testar så att bookmark-knappen fungerar
  test("Allows to add and remove bookmark", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/movie/The Shawshank Redemption"]}>
        <Routes>
          <Route path="/movie/:title" element={<FilmView />} />
        </Routes>
      </MemoryRouter>
    );

    const bookmarkButton = screen.getByText("Add to Bookmark");
    expect(bookmarkButton).toBeInTheDocument();

    await user.click(bookmarkButton);

    expect(screen.getByText("Remove Bookmark")).toBeInTheDocument();

    await user.click(screen.getByText("Remove Bookmark"));
    expect(screen.getByText("Add to Bookmark")).toBeInTheDocument();
  });

  //Testar så att tillbaka-knappen fungerar
  test("navigates back on go back-button", async () => {
    const user = userEvent.setup();
    render(
      //Simulerar navigation från startsida (-1) till filmview (1).
      <MemoryRouter
        initialEntries={["/", "/movie/The Shawshank Redemption"]}
        initialIndex={1}
      >
        {/* router med en simulerad sida och filmview-sidan */}
        <Routes>
          <Route path="/movie/:title" element={<FilmView />} />
          <Route path="/" element={<div>My bookmarks</div>} />
        </Routes>
      </MemoryRouter>
    );

    //Kollar att vi är på rätt sida(1), väljer knapp och trycker på knapp
    expect(screen.getByText("The Shawshank Redemption")).toBeInTheDocument();

    const backButton = screen.getByText("Go back");
    await user.click(backButton);

    //kollar så man hamnar på den simulerade sidan(-1)
    expect(screen.getByText("My bookmarks")).toBeInTheDocument();
  });
});
