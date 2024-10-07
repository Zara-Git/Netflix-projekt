import "../Movies/MovieList.css";
export default function MovieList({ movies }) {
  return (
    <section className="movie_List_container">
      {movies.length ? (
        movies.map((movie, index) => (
          <section
            className="movie_card"
            key={index}
            style={{ marginBottom: "20px" }}
          >
            {" "}
            <img
              src={movie.thumbnail}
              alt={movie.title}
              style={{ width: "100%", height: "400px", borderRadius: "10px" }}
            />
          </section>
        ))
      ) : (
        <p>No movie found</p>
      )}
    </section>
  );
}
