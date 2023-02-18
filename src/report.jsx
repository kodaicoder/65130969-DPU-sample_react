import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Common from "./common";
const BASE_URL = Common.API_URL;

export default class report extends Component {
  state = {
    zipcode: 12000,
    amphur_code: 0,
    amphur_name: "",
    province_code: 0,
    province_name: "",
    district: [],
  };
  name = "65130969 ณัชพล เมฆลาย"

  getData = async () => {
    
    if(this.state.zipcode.length < 5){
      this.setState({
        district: [],
      });
      return false;
    }
    
    try {
      console.log('Axios run !!!');
      await axios
        .get(`${BASE_URL}/${this.state.zipcode}`)
        .then((response) => {
          let res = response.data;

          if (res.district === undefined) {
            this.setState({
              district: [],
            });
          }
          this.setState({
            amphur_name: res.amphur_name,
            province_name: res.province_name,
            district: res.district,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  filter = (e) => {
    this.setState({
      zipcode: e.target.value,
    });
    this.getData();
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const { district } = this.state;
    return (
      <div>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand href="#">ค้นหาเลขไปรษณีย์สิจ๊ะ~~</Navbar.Brand>
            <div style={{display:"flex",alignItems:"center"}}>
              <img style={{border:"solid white 5px",borderRadius:"300px",marginRight:"25px"}} 
                src="https://avatars.githubusercontent.com/u/110652592?s=400&u=6b0771e8c2636d2b5fadea007fec6120f2f7dfd8&v=4" 
                alt="avatar" width={100} height={100} />
              <h5 style={{color:"white", margin:"0"}}>{this.name}</h5>
            </div>
          </Container>
        </Navbar>
        <Container>
          <div style={{ paddingTop: "50px" }}>
            <Row>
              <Col lg="9">
                <div align="left">
                  <h3>
                    อำเภอ <u>{this.state.amphur_name}</u> จังหวัด{" "}
                    <u>
                      {this.state.province_name} {this.state.zipcode}
                    </u>
                  </h3>
                </div>
              </Col>
              <Col lg="3">
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="ระบุเลขไปรษณีย์ 5 หลัก"
                    onChange={this.filter}
                    onKeyUp={this.filter}
                    maxLength="5"
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
          <div style={{ paddingTop: "15px" }}>
            <Card>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>รหัสตำบล</th>
                      <th>ตำบล</th>
                    </tr>
                  </thead>
                  <tbody>
                    {district?.map((rs, index) => (
                      <tr key={index}>
                        <td align="center">{index + 1}</td>
                        <td>{rs.district_code}</td>
                        <td>{rs.district_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </div>
    );
  }
}
