import React from "react";
import ReactLoading from "react-loading";
import Typewriter from 'typewriter-effect';
import {  useNavigate } from "react-router-dom";
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import './loading.css';

const Loading = () => {
  // const userRegister = useSelector((state) => state.userRegister);
  // const { userInfo } = userRegister;

  const navigate = useNavigate();
  // useEffect(() => {
  //   if (userInfo) {
  //     navigate("/login");
  //   }
  // }, [navigate, userInfo]);
  const SubmitHandler = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  return (
    <>
      <div style={{ marginLeft: 660, marginTop: 100 }}>
        {/* <ReactLoading type={"spin"} color={"#40fc00"} height={80} width={80} /> */}
        <CoronavirusIcon className="loading-icon"/>
      </div>
      <div>
        <br/>
        <span style={{display:"inline",marginLeft: 640, fontSize:'18px', }}>Accesing Camera...</span>
        <br/>
        <span style={{fontSize:18,marginLeft: 550}}>Press finish after you see interactive window</span>
        <br/>
        <button
          onClick={SubmitHandler}
          style={{ color:"white", marginLeft: 657, backgroundColor:"teal",borderRadius:2,border:"none",padding:10,paddingLeft:38,paddingRight:38,marginTop: 50, fontWeight:"bold" }}
        >
          Finish
        </button>
      </div>
    </>
  );
};

export default Loading;
