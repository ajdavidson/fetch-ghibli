const DataApi = (initialUrl, initialData, query) => {
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
          if (resFuse.length === 0) console.log('Empty Search');
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
          console.log(error)
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