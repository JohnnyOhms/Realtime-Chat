import React, { useEffect } from "react";
import GoogleButton from "react-google-button";
import { bindActionCreators } from "redux";
import { signInAPI, onAuthUser } from "../actions";
import { connect } from "react-redux";

const LoginIn = (props) => {
  useEffect(() => {
    props.onAuthUser();
  }, []);

  const handleClick = () => {
    props.signInAPI();
  };

  return (
    <div className="signin-btn">
      <GoogleButton
        onClick={handleClick}
        className="flex justify-items-center"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return bindActionCreators({ signInAPI, onAuthUser }, dispatch);
};

export default connect(mapStateToProps, mapDispatchtoProps)(LoginIn);
