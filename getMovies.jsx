function App() {
  const { useState, useEffect } = React;
  const { Container } = ReactBootstrap;
  const [data, setData] = useState([]);
  const [url, setUrl] = useState("https://ghibliapi.herokuapp.com/films/");
  //const [query, setQuery] = useState("");

  console.log("Rendering App");

  useEffect(() => {

    console.log("Fetching data...");
    const fetchData = async () => {
      const result = await axios(url);
      setData(result.data);
      console.log(result.data)
    };

    fetchData();

  }, []);

  return (
    <Container>
      {/* <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <button
        type="button"
        onClick={() => setUrl("https://ghibliapi.herokuapp.com/films/")}
      >
        Search
      </button> */}
      {data.map(movie => (
        // <ul style={{ listStyleType: "none" }} key={movie.id}>
        //   <li>{movie.title}</li>
        //   <li>{movie.original_title} ({movie.original_title_romanised})</li>
        //   <li>{movie.release_date}</li>
        //   <li><img src={movie.image} width="20%" /></li>
        // </ul>
        // <div class="card" style={{ width: "40%" }}>
        //   <img class="card-img-left" src={movie.image} alt="Card image cap" />
        //   <div class="card-body">
        //     <h5 class="card-title">{movie.title}</h5>
        //     <h6 class="card-subtitle mb-2 text-muted">{movie.original_title} ({movie.original_title_romanised})</h6>
        //     <p class="card-text">{movie.description}</p>
        //   </div>
        //   <ul class="list-group list-group-flush">
        //     <li class="list-group-item">Released: {movie.release_date}</li>
        //     <li class="list-group-item">Runtime: {movie.running_time} min</li>
        //     <li class="list-group-item">Rotten Tomato: {movie.rt_score}</li>
        //   </ul>
        //   <div class="card-body">
        //     <a href={movie.movie_banner} target="_blank" class="card-link">Official Banner</a>
        //     {/* <a href="#" class="card-link">Another link</a> */}
        //   </div>
        // </div>
        <React.Fragment>
          <div class="row">
            <div class="col">
              <div class="card">
                <div class="row card-body">
                  <div class="col">
                    <div style={{ padding: "5px" }} class="text-white bg-secondary">
                      <h5 class="card-title"><i class="fas fa-film"></i> {movie.title}</h5>
                      <h6 class="card-subtitle mb-2 text-dark"> {movie.original_title} ({movie.original_title_romanised})</h6>
                    </div>
                    <p class="card-text">{movie.description}</p>
                    <ul class="list-group list-group-flush" style={{ listStyleType: "none" }} key={movie.id}>
                      <li class="list-group-item"><i class="fas fa-video"></i> Directed by {movie.director}</li>
                      <li class="list-group-item"><i class="fas fa-ticket-alt"></i> {movie.producer} Production</li>
                      <li class="list-group-item"><i class="fas fa-calendar-alt"></i> {movie.release_date}</li>
                      <li class="list-group-item"><i class="fas fa-clock"></i> {movie.running_time} min</li>
                      <li class="list-group-item"><img src="./rt-cf.png" width="25px" /> {movie.rt_score}</li>
                      <li class="list-group-item"><i class="fas fa-image fa-lg"></i> <a href={movie.movie_banner} target="_blank" class="card-link">Movie Banner </a> <i class="fas fa-external-link-alt fa-xs"></i></li>
                    </ul>
                  </div>
                  <img class="card-img-left" src={movie.image} alt="Card image cap" height="470px" />
                </div>
              </div>
            </div>
          </div>
          <p></p>
        </React.Fragment>
      ))
      }
    </Container >
  );
}
// ========================================
ReactDOM.render(<App />, document.getElementById("root"));

//  // "https://hn.algolia.com/api/v1/search?query=redux"
