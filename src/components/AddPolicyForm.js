import React, { useState, useEffect, useRef, useContext } from "react";
import { useForm } from "react-hook-form";
import { Steps, Step } from "react-step-builder";
import { Row, Col, Button, Input } from "reactstrap";
import { PreviewAltCard, BlockHead, BlockBetween, BlockHeadContent, BlockTitle, RSelect, Icon } from "./Component";
import { Link } from "react-router-dom";
import { CountryListContext } from "./HealthContext";
import { Icons } from "react-toastify";
import DatePicker from "react-datepicker";
import { setDateForPicker } from "../utils/Utils";


const PlanOptions = [
  { value: "1", label: "Prescriptions" },
  { value: "3", label: "Vision" },
  { value: "4", label: "Dental Services" },
  { value: "5", label: "Dermatology" },
  { value: "6", label: "Radiology" },
  { value: "7", label: "Mental Health Counseling" },
];

const PolicyHolderForm = (props) => {
  const [formData, setFormData] = useState({
    policy_holder: "",
    email_address: "",
    phone_number: "",
    bob: "",
    terms: false,
    country: "",
    service_plans: [],
  });

  const [PlanOptionsList, SetPlanOptionsList] = useState(PlanOptions);
  const [CountryList, SetCountryList] = useContext(CountryListContext);
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = (data) => {
    console.log("Submit click ");
    console.log(formData);
    props.next();
  };

  return (
    <form className="content clearfix" onSubmit={handleSubmit(submitForm)}>
      <Row className="gy-1">
        <Col md="6">
          <div className="form-group row">
            <label className="form-label col-sm-4 text-left text-lg-center" htmlFor="policy-holder">
              Policy Holder
            </label>
            <div className="form-control-wrap col-sm-7">
              <input
                type="text"
                id="policy-holder"
                className="form-control"
                {...register("policy_holder", { required: true })}
                onChange={(e) => onInputChange(e)}
                defaultValue={formData.policy_holder}
              />
              {errors.policy_holder && <span className="invalid">This field is required</span>}
            </div>
          </div>
        </Col>
        <Col md="6">
          <div className="form-group row" id="phone-div">
            <label className="form-label col-sm-4 text-left text-lg-center" htmlFor="phone_number">
              Phone
            </label>
            <div className="form-control-wrap col-sm-7 d-flex">
              {CountryList.length > 0 ? (
                <RSelect options={CountryList} onChange={(e) => setFormData({ ...formData, country: e.value })} />
              ) : (
                ""
              )}

              <input
                type="number"
                id="phone_number"
                className="form-control "
                {...register("phone_number", { required: true })}
                onChange={(e) => onInputChange(e)}
                defaultValue={formData.phone_number}
              />
              {errors.phone_number && <span className="invalid">This field is required</span>}
            </div>
          </div>
        </Col>
        <Col md="6">
          <div className="form-group row">
            <label className="form-label col-sm-4 text-left text-lg-center" htmlFor="email_address">
              Email
            </label>
            <div className="form-control-wrap col-sm-7">
              <input
                type="email"
                id="email_address"
                className="form-control"
                {...register("email_address", { required: true })}
                onChange={(e) => onInputChange(e)}
                defaultValue={formData.email_address}
              />
              {errors.email_address && <span className="invalid">This field is required</span>}
            </div>
          </div>
        </Col>
        <Col md="6">
          <div className="form-group row">
            <label className="form-label col-sm-4 text-left text-lg-center" htmlFor="dob">
              Date of Birth
            </label>
            <div className="form-control-wrap col-sm-7">
              <DatePicker
                 {...register("dob", { required: false })}
                 onChange={(date) => setFormData({ ...formData, dob: setDateForPicker(date)})}
                 defaultValue={formData.dob}
                className="form-control date-picker"
              />
             
              {errors.dob && <span className="invalid">This field is required</span>}
            </div>
          </div>
        </Col>
        <Col md="6" className="plan_option">
          <div className="form-group row">
            <label className="form-label col-sm-4 text-left text-lg-center">Plan Options</label>
            <RSelect
              options={PlanOptionsList}
              isMulti
              onChange={(selectedOptions) => {
                const selectedValues = selectedOptions.map((option) => option.value);
                setFormData({ ...formData, service_plans: selectedValues });
              }}
            />
            {errors.service_plans && <span className="invalid">This field is required</span>}
          </div>
        </Col>
        <Col md="12" className="mx-lg-4">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              onClick={(e) => setFormData({ ...formData, terms: e.target.checked })}
              checked={formData.terms}
              {...register("terms", { required: true })}
              id="fw-policy"
            />
            {errors.terms && <span className="invalid">This field is required</span>}
            <label className="custom-control-label term-policy" htmlFor="fw-policy">
              By checking this box, you confirm reading and Accepting our{" "}
              <Link to="terms-condition" target="_blank">
                {" "}
                Terms & Conditions
              </Link>
            </label>
          </div>
        </Col>
      </Row>
      <div className="actions clearfix">
        <ul>
          <li>
            <Button color="primary" type="submit">
              Next
            </Button>
          </li>
        </ul>
      </div>
    </form>
  );
};

const AddMembers = (props) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    email_address: "",
    image: "",
    imageUrl: "./assets/add-plus.png",
  });

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onInputChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({
          ...formData,
          image: file,
          imageUrl: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const submitForm = (data) => {
    props.next();
  };

  return (
    <form className="content clearfix" onSubmit={handleSubmit(submitForm)}>
      <h4 className="text-center my-3">Add Policy Member(s)</h4>
      <p class="text-center my-3">
        <Icon name="info-fill"></Icon> You will need to pay $50 for each member who accepts the request!
      </p>
      <Row className="gy-4">
        <Col md="6">
          <div className="form-group row mb-2">
            <label className="form-label col-sm-4 text-left text-lg-center" htmlFor="first_name">
              First Name
            </label>
            <div className="form-control-wrap col-sm-7">
              <input
                type="text"
                id="first_name"
                className="form-control"
                {...register("first_name", { required: true })}
                onChange={(e) => onInputChange(e)}
                defaultValue={formData.first_name}
              />
              {errors.first_name && <span className="invalid">This field is required</span>}
            </div>
          </div>
          <div className="form-group row mb-2">
            <label className="form-label col-sm-4 text-left text-lg-center" htmlFor="last_name">
              Last Name
            </label>
            <div className="form-control-wrap col-sm-7">
              <input
                type="text"
                id="last_name"
                className="form-control"
                {...register("last_name", { required: true })}
                onChange={(e) => onInputChange(e)}
                defaultValue={formData.last_name}
              />
              {errors.last_name && <span className="invalid">This field is required</span>}
            </div>
          </div>
          <div className="form-group row mb-2">
            <label className="form-label col-sm-4 text-left text-lg-center" htmlFor="email_address">
              Email
            </label>
            <div className="form-control-wrap col-sm-7">
              <input
                type="email"
                id="email_address"
                className="form-control"
                {...register("email_address", { required: true })}
                onChange={(e) => onInputChange(e)}
                defaultValue={formData.email_address}
              />
              {errors.email_address && <span className="invalid">This field is required</span>}
            </div>
          </div>
          <div className="form-group row mb-2">
            <label className="form-label col-sm-4 text-left text-lg-center" htmlFor="dob">
              Date of Birth
            </label>
            <div className="form-control-wrap col-sm-7">
              <input
                type="date"
                id="dob"
                className="form-control"
                {...register("dob", { required: true })}
                onChange={(e) => onInputChange(e)}
                defaultValue={formData.dob}
              />
              {errors.dob && <span className="invalid">This field is required</span>}
            </div>
          </div>
        </Col>
        <Col md="6" className="my-auto">
          <Row className="justify-content-center">
            <Col md="5">
              <div className="member-image-container mx-auto">
                <img src={formData.imageUrl} className="img-fluid" alt="" />
                <Input type="file" id="member_profile" onChange={(e) => onInputChangeImage(e)} />
              </div>
            </Col>
            <Col md="6">
              <Button className="btn btn-primary">Add Member</Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="actions clearfix">
        <ul>
          <li>
            <Button color="primary" type="submit">
              Next
            </Button>
          </li>
          <li>
            <Button color="primary" onClick={props.prev}>
              Previous
            </Button>
          </li>
        </ul>
      </div>
    </form>
  );
};

const PaymentInfo = (props) => {
  const [formData, setFormData] = useState({
    tokenAddress: "",
    contribute: "",
    telegram: "",
  });

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = (data) => {
    //window.location.reload();
    props.next();
  };

  return (
    <form className="content clearfix" onSubmit={handleSubmit(submitForm)}>
      <Row className="gy-3">
        <Col md="12">
          <div className="form-group">
            <label className="form-label" htmlFor="fw-token-address">
              Token Address
            </label>
            <div className="form-control-wrap">
              <input
                type="text"
                className="form-control"
                id="fw-token-address"
                {...register("tokenAddress", { required: true })}
                onChange={(e) => onInputChange(e)}
              />
              {errors.tokenAddress && <span className="invalid">This field is required</span>}
            </div>
          </div>
        </Col>
        <Col md="12">
          <label className="form-label">I want to contribute</label>
          <ul className="d-flex flex-wrap g-2">
            <li>
              <div className="custom-control custom-radio">
                <input
                  type="radio"
                  className="custom-control-input"
                  {...register("ethRadio", { required: true })}
                  id="fw-lt1eth"
                  checked={formData.contribute === "leEth" ? true : false}
                  onChange={() => setFormData({ ...formData, contribute: "leEth" })}
                />
                {errors.ethRadio && <span className="invalid">This field is required</span>}
                <label className="custom-control-label" htmlFor="fw-lt1eth">
                  Less than 1 ETH
                </label>
              </div>
            </li>
            <li>
              <div className="custom-control custom-radio">
                <input
                  type="radio"
                  className="custom-control-input"
                  {...register("ethRadio", { required: true })}
                  id="fw-ov1eth"
                  checked={formData.contribute === "ovEth" ? true : false}
                  onChange={() => setFormData({ ...formData, contribute: "ovEth" })}
                />
                <label className="custom-control-label" htmlFor="fw-ov1eth">
                  Over than 1 ETH
                </label>
              </div>
            </li>
          </ul>
        </Col>
        <Col md="6">
          <div className="form-group">
            <label className="form-label" htmlFor="fw-telegram-username">
              Telegram Username
            </label>
            <div className="form-control-wrap">
              <input
                type="text"
                className="form-control required"
                id="fw-telegram-username"
                {...register("telegram", { required: true })}
                onChange={(e) => onInputChange(e)}
              />
              {errors.telegram && <span className="invalid">This field is required</span>}
            </div>
          </div>
        </Col>
      </Row>
      <div className="actions clearfix">
        <ul>
          <li>
            <Button color="primary" type="submit">
              Submit
            </Button>
          </li>
          <li>
            <Button color="primary" onClick={props.prev}>
              Previous
            </Button>
          </li>
        </ul>
      </div>
    </form>
  );
};

const Header = (props) => {
  return (
    <div className="steps clearfix">
      <ul>
        <li className={props.current >= 1 ? "first done" : "first"}>
          <a href="#wizard-01-h-0" onClick={(ev) => ev.preventDefault()}>
            <span className="number">01</span> <h5 className="d-none d-md-block">Policy Holder Information</h5>
          </a>
        </li>
        <li className={props.current >= 2 ? "done" : ""}>
          <a href="#wizard-01-h-1" onClick={(ev) => ev.preventDefault()}>
            <span className="number">02</span> <h5 className="d-none d-md-block">Finish</h5>
          </a>
        </li>
      </ul>
    </div>
  );
};

const Success = (props) => {
  return (
    <>
    <div className="d-flex justify-content-center align-items-center p-3">
      <div>
      <img src="./success-image.png" className="h-225px"/>
      </div>
    </div>
      <BlockTitle tag="h6" className="text-center">
        Thank you for submitting form
      </BlockTitle>
      </>
  );
};

const config = {
  before: Header,
};
const AddPolicyForm = () => {
  return (
    <>
      <section className="section-3 section-spacer row">
        <div className="container col-md-10">
          <div className="text-center header-text position-relative">
            <h2>Add Information</h2>
            <img src="../assets/silo-health-head.png" alt="silohealth-text-logo" />
            <p>Silo Policy</p>
          </div>
          <div className="wizard-form-section my-4 p-4">
            <PreviewAltCard>
              <div className="nk-wizard nk-wizard-simple is-alter wizard clearfix">
                <Steps config={config}>
                  <Step component={PolicyHolderForm} />
                  {/* <Step component={AddMembers} /> */}
                  {/* <Step component={PaymentInfo} /> */}
                  <Step component={Success} />
                </Steps>
              </div>
            </PreviewAltCard>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddPolicyForm;
