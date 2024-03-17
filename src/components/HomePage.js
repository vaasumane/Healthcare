import React, { useState, useContext, useEffect } from "react";
import Content from "../layout/content/Content";
import Head from "../layout/head/Head";
import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardLink, Button } from "reactstrap";
import PolicyPlan from "./PolicyPlan";
import { selectedPlanContext,CountryListContext } from "./HealthContext";
import AddPolicyForm from "./AddPolicyForm";
import { countryOptions } from "../pages/pre-built/UserData";
import { MakeApiCall } from "../utils/Utils";

const HomePage = () => {
  const [showPlan, setShowPlan] = useState(false);
  const [selectedPlan, setselectedPlan] = useState("");
  const [CountryList, SetCountryList] = useState([]);

  useEffect(() => {
    if (showPlan) {
      const element = document.getElementById("plan-health");
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [showPlan]);
  useEffect(() => {
    getCountry();
  }, []);
  const getCountry = async () => {
    try {
    const data = await MakeApiCall(`${process.env.REACT_APP_SILOCLOUD_URL}api/v1/public/countries`);
      const countryArr = data?.data?.countries;
      const countryOptions = countryArr.map((country, index) => {
        return {
          value: country.phonecode + "@" + country.id,
          label: "(+"+country.phonecode +")" +country.shortname,
        };
      });
      SetCountryList(countryOptions);
    } catch (error) {
      console.log("Error fetching countries:", error);
    }
  };
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
      <Head title="Add Policy" />
      <div className="silo-health-policy">
        <section className="section-1">
          <div style={section1} className="bg-health-image">
            <div className="full-box m-0 position-realtive row">
              <div className="">
                <div className="text-center">
                  <img src="../assets/silohealth-logo.png" alt="silohealth-logo" />
                  <h4 className="pt-3">Getting Started! </h4>
                </div>
                <div className="position-relative">
                  <div className="row justify-content-center m-0 py-3">
                    <div className="col-lg-3 col-md-6">
                      <Card className="card-bordered app-section bg-theme-primary" inverse>
                        <CardBody className="card-inner">
                          <CardText className="">
                            Upgrade your employee benefits with a new low cost program for you, your employees, and the
                            members of their household. All while saving time and money as you boost morale and increase
                            your company’s retention!
                          </CardText>
                        </CardBody>
                      </Card>
                      <div className="py-3 text-center">
                        <Button className="btn btn-silohealth" onClick={() => setShowPlan(true)}>
                          Add Policy
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {showPlan ? (
          <Content>
            <selectedPlanContext.Provider value={[selectedPlan, setselectedPlan]}>
              <CountryListContext.Provider value={[CountryList, SetCountryList]}>
                <PolicyPlan />
                <AddPolicyForm />
              </CountryListContext.Provider>
            </selectedPlanContext.Provider>
          </Content>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default HomePage;
