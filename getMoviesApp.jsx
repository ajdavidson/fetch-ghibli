// Load Data Fetch and search Component
<DataApi/>

function App() {
  const {useState} = React;
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('Empty Title');
  const [banner, setBanner] = useState('Empty Link');
  const {
    Container,
    Row,
    Col,
    Button,
    Modal,
    Dropdown,
    Image,
    Card,
    ListGroup,
    ListGroupItem,
    Spinner,
    FormControl,
    InputGroup,
    Form
  } = ReactBootstrap;
  // the call to dataAPI
  const [{data, isLoading, isError}, doFetch] = DataApi(
    "https://ghibliapi.herokuapp.com/films/", [], query
  );

  const handleClose = () => setShow(false);

  const handleShow = (title, banner) => {
    setShow(true);

    setTitle(title);
    setBanner(banner);
  }

  return (
    <Container>

      <Button variant="outline-secondary" href="#top" id="toTop" size="lg"><i className="fas fa-angle-double-up fa-lg"/></Button>

      <Row>
        <Col sm={6} lg={6}>
          <Image src="./Studio_Ghibli_logo.png" fluid style={{marginBottom: "10px", width: "365px"}}/>
        </Col>
        <Col sm={6} lg={6}>
          <Image src="./sprites.png" style={{marginBottom: "10px", width: "50%"}} align={"right"}/>
        </Col>
      </Row>

      <Row>
        <Col sm={6} lg={{span: 4, order: 'first'}} align={"left"}>
          <Dropdown drop="end">
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              <i className="fas fa-film fa-2x"/>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {data.map(title => (
                <Dropdown.Item value={title.title} href={'#' + title.id}>{title.title}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col sm={{span: 12, order: 'first'}} lg={4}>
          <Form
            onSubmit={event => {
              doFetch(`https://ghibliapi.herokuapp.com/films`, query);

              event.preventDefault();
            }}
          >
            <InputGroup className="mb-3" style={{margin: "0"}}>
              <InputGroup.Text id="basic-addon1">
                <i className="fas fa-search"/>
              </InputGroup.Text>
              <FormControl
                placeholder="Title"
                value={query}
                onChange={event => setQuery(event.target.value)}
              />
              <Button variant="outline-secondary" type="reset" id="button-addon2" onClick={() => setQuery('')}>
                <i className="fas fa-undo-alt"/>
              </Button>
            </InputGroup>
          </Form>
        </Col>
        <Col sm={6} lg={{span: 2, offset: 2}} align={"right"}>

          {/* PopSearch Component: Advanced Search Tokens Table */}
          <PopSearch/>

        </Col>
      </Row>

      {isError &&
      <Row>
        <Col align={'center'}>
          <Image src="./calcifer.png" style={{width: "75px"}}/><h3>Something went wrong ...</h3>
        </Col>
      </Row>
      }

      {isLoading ? (

        <Row>
          <Col align={'center'}>
            <Spinner className="spinner" size="lg" animation="grow" variant="secondary" role="status"/>
          </Col>
        </Row>

      ) : data.length === 0 && !isError ? (

        <Row>
          <Col align={'center'}>
            <Image src="./no-face.png"/><h3>No matches to your search ...</h3>
          </Col>
        </Row>

      ) : (

        data.map(movie => (

          <React.Fragment>
            {/* target  */}
            <div id={movie.id}/>
            <Card style={{marginBottom: "10px"}}>
              <Card.Header>
                <Card.Title><i className="fas fa-film"/> {movie.title}</Card.Title>
                <Card.Subtitle
                  className="mb-2 text-muted">{movie.original_title} ({movie.original_title_romanised})</Card.Subtitle>
              </Card.Header>
              <Row>
                <Col sm={12} lg={6}>
                  <Card.Body>
                    {movie.description}
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem><i className="fas fa-video"/> Directed by {movie.director}</ListGroupItem>
                    <ListGroupItem><i className="fas fa-ticket-alt"/> {movie.producer} Production</ListGroupItem>
                    <ListGroupItem><i className="fas fa-clock"/> {movie.running_time} min</ListGroupItem>
                    <ListGroupItem><i className="fas fa-calendar-alt"/> {movie.release_date}</ListGroupItem>
                    <ListGroupItem>
                      <Image
                        src={movie.rt_score < 70 ? 'rt-sp.png' : movie.rt_score < 90 ? 'rt-f.png' : 'rt-cf.png'}
                        width="25px"
                      /> {' ' + movie.rt_score}%
                    </ListGroupItem>
                    <ListGroupItem>
                      <Button variant="outline-secondary"
                              x={movie.title}
                              onClick={() => {
                                handleShow(movie.title, movie.movie_banner);
                                console.log('Showing Banner...');
                              }
                              }><i className="fas fa-image fa-lg"/> Movie Banner <i
                        className="fas fa-external-link-square-alt fa-xs"/>
                      </Button>
                    </ListGroupItem>
                  </ListGroup>
                </Col>
                <Col sm={12} lg={{span: 5, offset: 1}}><Card.Img src={movie.image} fluid="true"/></Col>
              </Row>
              <Card.Footer/>
            </Card>
          </React.Fragment>
        ))
      )}
      <Modal show={show} size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><i className="fas fa-film"/> {title}</Modal.Title>
        </Modal.Header>
        <Modal.Body><Card.Img src={banner}/></Modal.Body>
      </Modal>
    </Container>
  );
}

// // ========================================
ReactDOM.render(<App/>, document.getElementById("root"));
