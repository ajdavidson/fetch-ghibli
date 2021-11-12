function App() {
  const { useState, useEffect } = React;
  const { Container, Row, Col, Button, Modal, Dropdown, Image, Card, ListGroup, ListGroupItem, Fade } = ReactBootstrap;
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

      <Fade in={true} appear={true} timeout={3000}>
      <Image src="./Studio_Ghibli_logo.png" width="33%" />
      </Fade>

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
              <Card.Header>
                  <Card.Title><i class="fas fa-film"></i> {movie.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{movie.original_title} ({movie.original_title_romanised})</Card.Subtitle>
              </Card.Header>
            <Row>

              <Col sm={4} md={6} lg={8}>
                {/*<Card.Body>*/}
                {/*  /!*<Card.Title><i class="fas fa-film"></i> {movie.title}</Card.Title>*!/*/}
                {/*  /!*<Card.Subtitle className="mb-2 text-muted">{movie.original_title} ({movie.original_title_romanised})</Card.Subtitle>*!/*/}
                {/*  /!*<Card.Text>*!/*/}
                {/*  /!*</Card.Text>*!/*/}
                {/*</Card.Body>*/}
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
              <Col xs={2} md={4} lg={4}><Card.Img  variant="top" src={movie.image} /></Col>
            </Row>
              <Card.Footer></Card.Footer>
          </Card>
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

