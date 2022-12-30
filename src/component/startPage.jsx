import React from 'react'
// import { bindActionCreators } from "redux"
import { signInAPI } from "../actions/index"
import { connect } from 'react-redux'

export const StartPage = (props) => {
  console.log(props.user)
  return (
    <div>StartPage jhefjfejk</div>
    
  )
}

// const mapStateToProps = (state) =>{
//   return{
//     user: state.userState.user
//   }
// }

// const mapDispatchtoProps = (dispatch) =>({

//     signup: ()=> dispatch(signInAPI())

  
// })

// export default connect(mapStateToProps, mapDispatchtoProps)(StartPage)

export default StartPage

