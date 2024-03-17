import React from "react";
import { PreviewAltCard, BlockHead, BlockBetween, BlockHeadContent, BlockTitle } from "./Component";
import Content from "../layout/content/Content";
import Head from "../layout/head/Head";
import { Col, Row } from "reactstrap";

const TermCondition = () => {
  const section1 = {
    backgroundImage: "url('../assets/main-bg.jpg')",
    height: "100vh",
    backgroundSize: "cover",
    backgroundRepeat: " no-repeat",
    backgroundPosition: "inherit",
    position: "relative",
  };
  return (
    <>
      <div className="bg-image-div">
      <Head title="Terms & Conditions" />

        <img class="video-bg-health" src="../assets/health.jpg" />
        <Content className="content-silo">
          <BlockHead size="sm">
            <BlockTitle page className="text-center">
              Terms & Conditions
            </BlockTitle>
          </BlockHead>
          <Row className="justify-center">
            <Col lg="10">
              <PreviewAltCard>
                <div className="content-page">
                  <h4>Interpretation and Definitions</h4>
                  <p>
                    <b>Interpretation</b>
                  </p>
                  <p>
                    The words of which the initial letter is capitalized have meanings defined under the following
                    conditions. The following definitions shall have the same meaning regardless of whether they appear
                    in singular or in plural.
                  </p>
                  <p>
                    <b>Disclosures:</b>
                  </p>
                  <p>
                    This plan is NOT insurance. The plan is not insurance coverage and does not meet the minimum
                    creditable coverage requirements under the Affordable Care Act or Massachusets M.G.L. c 111M and 956
                    CMR 5.00. It contains a 30 day cancellation period, provides discounts only at the offices of
                    contracted health care providers, and each member is obligated to pay the discounted medical charges
                    in full at the point of service. The range of discounts for medical or ancillary services provided
                    under the plan will vary depending on the type of provider and medical or ancillary service
                    received.
                  </p>
                </div>
              </PreviewAltCard>
            </Col>
          </Row>
        </Content>
      </div>
    </>
  );
};

export default TermCondition;
