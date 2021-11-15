const useDataApi = (initialUrl, initialData) => {
    const { useState, useEffect, useReducer } = React;

    const [url, setUrl] = useState(initialUrl);
    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: false,
        isError: false,
        data: initialData
    });

    useEffect(() => {
        let didCancel = false;
        const fetchData = async () => {
            dispatch({ type: "FETCH_INIT" });
            try {
                const result = await axios(url);
                if (!didCancel) {
                    console.log(result.status);
                    console.log(result.statusText);
                    console.log(result.headers);
                    console.log(result.config);
                    console.log(result.data);
                    console.log("...Fetching done");
                    dispatch({ type: "FETCH_SUCCESS", payload: result.data });
                }
            } catch (error) {
                if (!didCancel) {
                    dispatch({ type: "FETCH_FAILURE" });
                }
            }
        };
        fetchData();
        return () => {
            didCancel = true;
        };
    }, [url]);
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
    const { useState, useEffect, useReducer } = React;
    const { Fragment, Container, Row, Col, Button, Modal, Dropdown, Image, Card, ListGroup, ListGroupItem, Fade, Spinner, Transition } = ReactBootstrap;
    const [query, setQuery] = useState("Title");
    //const [data, setData] = useState([]);
    //const [url, setUrl] = useState("https://ghibliapi.herokuapp.com/films/");
    const [fetching, setFetching] = useState('grow');
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('Empty Title');
    const [banner, setBanner] = useState('Empty Link');
    // the call to dataAPI
    const [{ data, isLoading, isError }, doFetch] = useDataApi(
        "https://ghibliapi.herokuapp.com/films/", []

    );
    const handleClose = () => setShow(false);

    const handleShow = (title, banner) => {
        setShow(true);

        setTitle(title);
        setBanner(banner);
    }
    // function handleSelect(title) {
    //     setQuery(title)
    //     doFetch(`https://ghibliapi.herokuapp.com/films/?title=${title}`);
    //     alert('Drop Fetch');
    // }
    return (
        <Container>

            <Button variant="outline-secondary" href="#top" id="toTop" size="lg"><i className="fas fa-angle-double-up fa-lg" /></Button>

            <Image src="./Studio_Ghibli_logo.png" width="33%" />

            {/* <Spinner className="spinner" size="sm" animation={fetching} variant="secondary" role="status" />
            <Spinner className="spinner-sm" size="sm" animation={fetching} variant="secondary" role="status" />
            <Spinner className="spinner-sm-2" size="sm" animation={fetching} variant="secondary" role="status" /> */}

            <Row>
                <Col sm={12} lg={8}>
                    <Dropdown drop="end">
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic" >
                            <i className="fas fa-film fa-2x" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {data.map(title => (
                                <Dropdown.Item value={title.title} href={'#' + title.id}
                                //onSelect={handleSelect(title.title)}
                                >{title.title}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col sm={12} lg={4}>
                    <form
                        onSubmit={event => {
                            doFetch(`https://ghibliapi.herokuapp.com/films/?title=${query}`);

                            event.preventDefault();
                        }}
                    >
                        <input
                            type="text"
                            value={query}
                            onChange={event => setQuery(event.target.value)}
                        />
                        <button type="submit">Search</button>
                    </form>
                </Col>
            </Row>




            {isError && <div>Something went wrong ...</div>}

            {isLoading ? (
                <div>Loading ...</div>
            ) : (

                data.map(movie => (

                    <React.Fragment>
                        {/* target  */}
                        <div id={movie.id} />
                        <Card>
                            <Card.Header>
                                <Card.Title><i className="fas fa-film" /> {movie.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{movie.original_title} ({movie.original_title_romanised})</Card.Subtitle>
                            </Card.Header>
                            <Row>
                                <Col sm={12} lg={6}>
                                    <Card.Body>
                                        {movie.description}
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroupItem><i className="fas fa-video" /> Directed by {movie.director}</ListGroupItem>
                                        <ListGroupItem><i className="fas fa-ticket-alt" /> {movie.producer} Production</ListGroupItem>
                                        <ListGroupItem><i className="fas fa-clock" /> {movie.running_time} min</ListGroupItem>
                                        <ListGroupItem><i className="fas fa-calendar-alt" /> {movie.release_date}</ListGroupItem>
                                        <ListGroupItem>
                                            <Image
                                                src={movie.rt_score < 70 ? 'rt-sp.png' : movie.rt_score < 90 ? 'rt-f.png' : 'rt-cf.png'}
                                                width="25px"
                                            /> {' ' + movie.rt_score}%
                                        </ListGroupItem>
                                        <ListGroupItem><Button variant="outline-secondary" x={movie.title}
                                            onClick={() => {
                                                handleShow(movie.title, movie.movie_banner);
                                                //alert('yep');
                                            }
                                            }><i className="fas fa-image fa-lg" /> Movie Banner <i className="fas fa-external-link-square-alt fa-xs" />
                                        </Button></ListGroupItem>
                                    </ListGroup>
                                </Col>
                                <Col sm={12} lg={{ span: 5, offset: 1 }}><Card.Img src={movie.image} fluid="true" /></Col>
                            </Row>
                            <Card.Footer />
                        </Card>
                        <p> </p>
                    </React.Fragment >

                ))

            )}
            <Modal show={show} size="lg" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><i className="fas fa-film" /> {title}</Modal.Title>
                </Modal.Header>
                <Modal.Body><Card.Img src={banner} /></Modal.Body>
            </Modal>
        </Container >

    );
}

// // ========================================
ReactDOM.render(<App />, document.getElementById("root"));