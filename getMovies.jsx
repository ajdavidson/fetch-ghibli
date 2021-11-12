function App() {
  const { useState, useEffect } = React;
  const { Container, Row, Col, Button, Modal, Dropdown, Image, Card, ListGroup, ListGroupItem } = ReactBootstrap;
  const [data, setData] = useState([]);
  const [url, setUrl] = useState("https://ghibliapi.herokuapp.com/films/");
  //const [query, setQuery] = useState("");
  const [rtImg, setRTImg] = useState('rt-cf.png');

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('My Title');
  const [banner, setBanner] = useState('My Link');

  const handleClose = () => setShow(false);

  const handleShow = (title, banner) => {
    setShow(true);

    setTitle(title);
    setBanner(banner);
  }

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

      <Button variant="outline-secondary" href="#top" id="toTop"><i
        className="fas fa-angle-double-up"></i></Button>
      <Image src="./Studio_Ghibli_logo.png" width="33%" />

      <p> </p>
      <Dropdown drop="end">
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          <i className="fas fa-film fa-2x"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {data.map(title => (
            <Dropdown.Item href={'#' + title.id}>{title.title}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {data.map(movie => (

        <React.Fragment>
          {/* target  */}
          <div id={movie.id} />
          <Card>
            <Row>

              <Col sm={4} md={6}>
                <Card.Body>
                  <Card.Title><i class="fas fa-film"></i> {movie.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{movie.original_title} ({movie.original_title_romanised})</Card.Subtitle>
                  <Card.Text>
                  </Card.Text>
                </Card.Body>
                <Card.Body>
                  {movie.description}
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem><i class="fas fa-video"></i> Directed by {movie.director}</ListGroupItem>
                  <ListGroupItem><i class="fas fa-video"></i> Directed by {movie.director}</ListGroupItem>
                  <ListGroupItem><i class="fas fa-ticket-alt"></i> {movie.producer} Production</ListGroupItem>
                  <ListGroupItem><i class="fas fa-clock"></i> {movie.running_time} min</ListGroupItem>
                  <ListGroupItem><i class="fas fa-calendar-alt"></i> {movie.release_date}</ListGroupItem>
                  <ListGroupItem><img src={movie.rt_score < 70 ? 'rt-sp.png' : movie.rt_score < 90 ? 'rt-f.png' : 'rt-cf.png'} width="25px" /> {movie.rt_score}%</ListGroupItem>
                  <ListGroupItem><Button variant="outline-secondary" x={movie.title}
                    onClick={() => {
                      handleShow(movie.title, movie.movie_banner);
                      //alert('yep');
                    }
                    }><i className="fas fa-image fa-lg"></i> Movie Banner <i className="fas fa-external-link-alt fa-xs"></i>
                  </Button></ListGroupItem>
                </ListGroup>
              </Col>
              <Col xs={4} md="6" fluid><Card.Img  variant="top" src={movie.image} fluid /></Col>
            </Row>
          </Card>
          {/* <div class="row">
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
                      <li class="list-group-item"><img src={movie.rt_score < 70 ? 'rt-sp.png' : movie.rt_score < 90 ? 'rt-f.png' : 'rt-cf.png'} width="25px" /> {movie.rt_score}%</li>
                      <li className="list-group-item">
                        <Button variant="outline-secondary" x={movie.title}
                          onClick={() => {
                            handleShow(movie.title, movie.movie_banner);
                            //alert('yep');
                          }
                          }><i className="fas fa-image fa-lg"></i> Movie Banner <i className="fas fa-external-link-alt fa-xs"></i>
                        </Button></li>
                    </ul>
                  </div>
                  <img class="card-img-left" src={movie.image} alt="Card image cap" height="500px" />
                </div>
              </div>
            </div>
          </div> */}
          < p > </p>
        </React.Fragment >

      ))
      }
      <Modal show={show} size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><i className="fas fa-film"></i> {title}</Modal.Title>
        </Modal.Header>
        <Modal.Body><img src={banner} width="100%px" /></Modal.Body>
      </Modal>
    </Container >
  );
}
// ========================================
ReactDOM.render(<App />, document.getElementById("root"));

