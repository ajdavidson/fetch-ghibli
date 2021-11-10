function App() {
  const { useState, useEffect } = React;
  const { Container } = ReactBootstrap;
  const [data, setData] = useState([]);
  const [url, setUrl] = useState("https://ghibliapi.herokuapp.com/films/");
  //const [query, setQuery] = useState("");
  const [rtImg, setRTImg] = useState('rt-cf.png');

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
      {/*<select >*/}
      {/*{data.map(movie => (*/}

      {/*    <option>{movie.title}</option>*/}

      {/*))}*/}
      {/*</select>*/}
      <div className="dropdown">
        <button className="dropbtn">Jump To...</button>
        <div className="dropdown-content">
          {data.map(movie => (

              <a href={'#'+movie.id}>{movie.title}</a>

          ))}
        </div>
      </div>
        {/*{data.map(movie => (*/}

        {/*    <a href={'#'+movie.id}>{movie.title}</a>*/}

        {/*))}*/}

      {data.map(movie => (

        <React.Fragment>
          <div id={movie.id} />
          <div class="row">
            <div class="col">
              <div class="card">
                <div class="row card-body">
                  <div class="col">
                    <div style={{ padding: "5px", backgroundColor: "#a6a6a6" }} class="text-white">
                      <h5 class="card-title"><i class="fas fa-film"></i> {movie.title}</h5>
                      <h6 class="card-subtitle mb-2 text-dark"> {movie.original_title} ({movie.original_title_romanised})</h6>
                    </div>
                    <p class="card-text">{movie.description}</p>
                    <ul class="list-group list-group-flush" style={{ listStyleType: "none" }} key={movie.id}>
                      <li class="list-group-item"><i class="fas fa-video"></i> Directed by {movie.director}</li>
                      <li class="list-group-item"><i class="fas fa-ticket-alt"></i> {movie.producer} Production</li>
                      <li class="list-group-item"><i class="fas fa-clock"></i> {movie.running_time} min</li>
                      <li class="list-group-item"><i class="fas fa-calendar-alt"></i> {movie.release_date}</li>
                      <li class="list-group-item"><img src={movie.rt_score<70 ? 'rt-sp.png': movie.rt_score<90 ? 'rt-f.png': 'rt-cf.png'} width="25px" /> {movie.rt_score}%</li>
                      <li class="list-group-item"><i class="fas fa-image fa-lg"></i> <a href={movie.movie_banner} target="_blank" class="card-link">Movie Banner </a> <i class="fas fa-external-link-alt fa-xs"></i></li>
                    </ul>
                  </div>
                  <img class="card-img-left" src={movie.image} alt="Card image cap" height="500px" />
                </div>
              </div>
            </div>
          </div>
          <p> </p>
        </React.Fragment>

      ))
      }

    </Container >
  );
}
// ========================================
ReactDOM.render(<App />, document.getElementById("root"));

