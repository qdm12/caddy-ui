import React from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: red;
`;

function App(): JSX.Element {
    return <Container>Text</Container>;
}

export default App;
