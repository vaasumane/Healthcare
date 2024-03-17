import React from "react";
import { useState, useContext  } from "react";
import { PreviewAltCard, Icon } from "./Component";
import { Card } from "reactstrap";
import { selectedPlanContext } from "./HealthContext";


const PolicyPlan = () => {
  const planArr = [
    {
      id: "151",
      name: "Silo Health - Bronze",
      price: "$8.95",
      validity: "7 Days",
    },
    {
      id: "150",
      name: "Silo Health - Silver",
      price: "$29.95",
      validity: "30 Days",
    },
    {
      id: "152",
      name: "Silo Health - Gold",
      price: "$249.95",
      validity: "12 Months",
    },
  ];
  const [planList, setPlanList] = useState(planArr);
  const [activePlan, setActivePlan] = useState("151");
  const [selectedPlan, setselectedPlan] = useContext(selectedPlanContext);
  const SetPlansPlan = (plan_id) => {
    setActivePlan(plan_id);
    setselectedPlan(plan_id);
  };
  return (
    <>
      <section className="section-2 section-spacer" id="plan-health">
        <div className="container">
          <div className="text-center header-text position-relative">
            <h2>Choose Silo Health Plan</h2>
            <img src="../assets/silo-health-head.png" alt="silohealth-text-logo" />
            <p>Silo Plans</p>
          </div>
          <div className="row row-cols-1 row-cols-md-3 g-5 my-3">
            {planArr &&
              planArr.map((plans) => (
                <div className="col position-relative" key={plans.id}>
                  <Card
                    className={`nk-wg-card card-bordered bg-transparents h-100 ${
                      activePlan === plans.id ? "active" : ""
                    }`}
                    onClick={(e) => SetPlansPlan(plans.id)}
                  >
                    <div className="circle  m-0 align-items-center justify-content-center ">
                      <p className="m-0">
                        <Icon name="check" />
                      </p>
                    </div>
                    <h5 className="card-title mx-4 text-center mt-4 bg-light py-2 rounded-3">{plans.name}</h5>
                    <div className="price fw-bold d-flex align-items-center justify-content-center">{plans.price}</div>
                    <p className="card-text text-light"></p>
                    <div className="entry-content">
                      <ul className="list-unstyled text-center">
                        <li>
                          <strong>VALIDITY: {plans.validity.toUpperCase()} </strong>
                        </li>
                        <li>
                          <strong>24/7 access by online video call</strong>
                        </li>
                        <li>
                          <strong>15 minutes average doctor response time</strong>
                        </li>
                        <li>
                          <strong>Visits for all ages - from children to seniors</strong>
                        </li>
                      </ul>
                    </div>
                  </Card>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PolicyPlan;
