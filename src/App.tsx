// import InputTaskComponent from "./components/InputTaskComponent/InputTaskComponent";
import TaskListComponent from "./components/TaskListComponent/TaskListComponent";
import FilterComponent from "./components/FilterComponent/FilterComponent";
// import SortComponent from "./components/SortComponent/SortComponent";
// import PagesComponent from "./components/PagesComponent/PagesComponent";
// import styles from "./styles/App.module.scss";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { Col, Layout, Row } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import InputComponent from "./components/InputComponent/InputComponent";
import SortComponent from "./components/SortComponent/SortComponent";

function App() {
  return (
    <Layout>
      <InputComponent />
      <Row>
        <Col>
          <FilterComponent />
        </Col>
        <Col>
          <SortComponent />
        </Col>
      </Row>
      <TaskListComponent />
    </Layout>
  );
}

export default App;
