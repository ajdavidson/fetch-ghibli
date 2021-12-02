function PopSearch() {

  const {
    Popover,
    Button,
    OverlayTrigger,
    Table
  } = ReactBootstrap;

  return (

    <OverlayTrigger
      trigger="click"
      key="bottom"
      placement="bottom"
      overlay={
        <Popover id={`popover-positioned`}>
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

  )
}