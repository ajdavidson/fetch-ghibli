const useDataApi = (initialUrl, initialData, query) => {
  const {useState, useEffect, useReducer} = React;

  const [url, setUrl] = useState(initialUrl);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData
  });

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      dispatch({type: "FETCH_INIT"});
      try {
        const result = await axios(url);
        if (!didCancel) {
          console.log(result.status);
          console.log(result.statusText);
          console.log(result.headers);
          console.log(result.config);
          console.log(result.data);
          console.log("...Fetching done");

          // Fuse it!
          const options = {
            shouldSort: false,
            matchAllTokens: true,
            findAllMatches: true,
            includeScore: true,
            threshold: 0.2,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            useExtendedSearch: true,
            keys: [
              "title"
            ]
          };

          const fuse = new Fuse(result.data, options);
          const resFuse = fuse.search(query);
          console.log(resFuse);
          if (resFuse.length===0) console.log('Empty Search');
          const fuseResults = resFuse.map(t => t.item);
          console.log({fuseResults})
          //////////////////////////////////////////
          if (query) {
            dispatch({type: "FETCH_SUCCESS", payload: fuseResults});
          } else {
            dispatch({type: "FETCH_SUCCESS", payload: result.data});
          }

        }
      } catch (error) {
        if (!didCancel) {
          dispatch({type: "FETCH_FAILURE"});
        }
      }
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [query]);
  return [state, setUrl];
};
const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case "FETCH_SUCCESS":

      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case "FETCH_FAILURE":

      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      throw new Error();
  }
};

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
    Form,
    Popover,
    OverlayTrigger,
    Table
  } = ReactBootstrap;
  // the call to dataAPI
  const [{data, isLoading, isError}, doFetch] = useDataApi(
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
      <Image src="./Studio_Ghibli_logo.png" fluid style={{marginBottom: "10px",width:"365px"}}/>
      </Col>
        <Col sm={6} lg={6} >
          <Image src="./sprites.png" style={{marginBottom: "10px",width:"50%"}} align={"right"}/>
        </Col>
      </Row>

      <Row>
        <Col sm={6} lg={{span: 4 , order: 'first'}} align={"left"}>
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
              <Button variant="outline-secondary" type="reset" id="button-addon2" onClick={()=>setQuery('')}>
                <i className="fas fa-undo-alt"/>
              </Button>
            </InputGroup>
          </Form>
        </Col>
        <Col sm={6} lg={{span: 2, offset: 2}} align={"right"}>
          {/*{['top', 'right', 'bottom', 'left'].map((placement) => (*/}
          {['bottom'].map((placement) => (
            <OverlayTrigger
              trigger="click"
              key={placement}
              placement={placement}
              overlay={
                <Popover id={`popover-positioned-${placement}`}>
                  <Popover.Header align={"center"}><b>Advanced Search Tokens</b></Popover.Header>
                  <Popover.Body>
                    <Table striped bordered hover>
                      <thead>
                      <tr>
                        <th>Token</th>
                        <th>Match type</th>
                        <th>Description</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>entry</td>
                        <td>fuzzy-match</td>
                        <td>Items that fuzzy match entry</td>
                      </tr>
                      <tr>
                        <td>=entry</td>
                        <td>exact-match</td>
                        <td>Items that are entry</td>
                      </tr>
                      <tr>
                        <td>'entry</td>
                        <td>include-match</td>
                        <td>Items that include entry</td>
                      </tr>
                      <tr>
                        <td>!entry</td>
                        <td>inverse-exact-match</td>
                        <td>Items that do not include entry</td>
                      </tr>
                      <tr>
                        <td>^entry</td>
                        <td>prefix-exact-match</td>
                        <td>Items that start with entry</td>
                      </tr>
                      <tr>
                        <td>!^entry</td>
                        <td>inverse-prefix-exact-match</td>
                        <td>Items that do not start with entry</td>
                      </tr>
                      <tr>
                        <td>entry$</td>
                        <td>suffix-exact-match</td>
                        <td>Items that end with entry</td>
                      </tr>
                      <tr>
                        <td>!entry$</td>
                        <td>inverse-suffix-exact-match</td>
                        <td>Items that do not end with entry</td>
                      </tr>
                      </tbody>
                    </Table>
                  </Popover.Body>
                </Popover>
              }
            >
              <Button variant="secondary"><i className="fas fa-info-circle fa-2x"/></Button>
            </OverlayTrigger>
          ))}
        </Col>
      </Row>

      {isError && <div><h3>Something went wrong ...</h3></div>}

      {data.length===0 && <div><h3>No matches to your search ...</h3></div>}

      {isLoading ? (
        <Row>
          <Col align={'center'}>
            <Spinner className="spinner" size="lg" animation="grow" variant="secondary" role="status"/>
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
