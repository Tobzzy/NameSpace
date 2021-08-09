import React from "react";
import "antd/dist/antd.css";
import { render } from "react-dom";
import { withScriptjs } from "react-google-maps";
import { Form } from "./components/Form";
import styled from "styled-components";

import { TaskMap } from "./components/TaskMap";
import TaskContext from "./contexts/TaskProvider";
import { TaskList } from "./components/TaskList";

const App = () => {
  const MapLoader = withScriptjs(TaskMap as any);
  return (
    <Main>
      <TaskContext.Provider>
        <MapLoader
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
          loadingElement={<div style={{ height: `100vh`, width: "70%" }} />}
        />
        <Content>
          <Form />
          <TaskList />
        </Content>
      </TaskContext.Provider>
    </Main>
  );
};

const Main = styled.div`
  display: flex;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  flex-basis: 30%;
  padding: 40px 30px;
`;

render(<App />, document.getElementById("root"));
