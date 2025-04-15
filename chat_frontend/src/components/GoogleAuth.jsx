import { googleLogin } from "@/redux/userFunctions";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function GoogleAuth(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential;
    googleLogin(idToken, dispatch, navigate);
  };

  const txt = props.text;
  const rem = "2vw";
  const width = `${parseFloat(rem) * 190}`;

  return (
    <div className="w-full flex justify-center">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log("Login Failed")}
        useOneTap={false}
        theme="filled_black"
        text={txt == "signin" ? "signin_with" : "signup_with"}
        shape="rectangular"
        size="large"
        width = {width}
        locale="en"
        context="signin"
        type="standard"
        logo_alignment="left"
      />
    </div>
    
  );
}
