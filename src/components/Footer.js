
import React from "react";
import moment from "moment-timezone";
import { Row, Col, Card, OverlayTrigger, Tooltip, Image, Button } from 'react-bootstrap';

export default (props) => {
  const currentYear = moment().get("year");

  return (
    <div>
      <footer className="bg-white rounded shadow p-5 mb-4 mt-4">
        <Row>
          <Col xs={12} md={4} xl={6} className="mb-4 mb-md-0">
            <p className="mb-0 text-center text-lg-start">
              © 2019-{`${currentYear} `}
              <Card.Link href="https://themesberg.com" target="_blank" className="text-primary fw-normal">
                Rota
              </Card.Link>
            </p>
          </Col>
          <Col xs={12} md={8} xl={6} className="text-center text-lg-start">
            <ul className="list-inline list-group-flush list-group-borderless text-md-end mb-0">
              <li className="list-inline-item px-0 px-sm-2">
                <Card.Link href="https://themesberg.com/about" target="_blank">
                  About
                </Card.Link>
              </li>
              <li className="list-inline-item px-0 px-sm-2">
                <Card.Link href="https://themesberg.com/themes" target="_blank">
                  Themes
                </Card.Link>
              </li>
              <li className="list-inline-item px-0 px-sm-2">
                <Card.Link href="https://themesberg.com/blog" target="_blank">
                  Blog
                </Card.Link>
              </li>
              <li className="list-inline-item px-0 px-sm-2">
                <Card.Link href="https://themesberg.com/contact" target="_blank">
                  Contact
                </Card.Link>
              </li>
            </ul>
          </Col>
        </Row>
      </footer>
    </div>
  );
};
