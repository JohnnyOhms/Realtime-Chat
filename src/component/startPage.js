import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { signInAPI, onAuthUser } from "../actions";
import { connect } from "react-redux";
import GoogleButton from "react-google-button";

export const StartPage = (props) => {
  useEffect(() => {
    props.onAuthUser();
  }, []);

  const handleClick = () => {
    props.signInAPI();
  };

  return (
    <div>
      <GoogleButton onClick={handleClick} />
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

export default connect(mapStateToProps, mapDispatchtoProps)(StartPage);
