import logo from "./logo.svg";
import "./App.css";
import { Box, Typography } from "@mui/material";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import OtpInput from "react-otp-input";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { Button } from "@mui/base/Button";
import CircularProgress from "@mui/material/CircularProgress";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "./FireBase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { FaSlack } from "react-icons/fa";

function App() {
  const [opt, setOtp] = useState("");
  const [ph, setPh] = useState("");

  const [loading, setLoading] = useState(false);
  const [showOpt, setShowOpt] = useState(false);
  const [user, setUser] = useState(null);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          'expired-callback': () => {},
        },
        auth
      );
    }
  }
  // console.log(onCaptchVerify, "====>");

  function onSignup() {
    setLoading(true);
    onCaptchVerify();
    console.log(onCaptchVerify(),"====>")

    const appVerifier = window.recaptchaVerifier;

    const formatph = "+" + ph;
    signInWithPhoneNumber(auth, formatph, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOpt(true);
        toast.success("OTP sended sucessfully ");

        // console.log(confirmationResult, )
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOtpVerify(){
    setLoading(true);
    window.confirmationResult.confirm(opt).then((res)=>{
      console.log(res)
      setUser(res.user)
      setLoading(false)


    }).catch((err)=>{
      console.log(err);
      setLoading(false)
    })
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#6eb16e99",
        height: "100vh",
      }}
    >
      <Box>
        <Box
          sx={{
            width: "80",
            display: "flex",
            flexDirection: "column",
            gap: "4",
            borderRadius: "20px",
            padding: "4px",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "white",
              lineHeight: "40px",
              fontSize: "30px",
              textAlign: "center",
              marginBottom: "15px",
            }}
          >
            Welcome To <br /> The Houses Of Developer
          </Typography>

          {showOpt ? (
            <>
              <Typography
                sx={{
                  background: "white",
                  color: "primary.main",
                  width: "fit",
                  mx: "auto",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  borderRadius: "50px",
                  marginBottom: "15px",
                }}
              >
                <BsFillShieldLockFill size={"30"} />
              </Typography>
              <label
                htmlFor="otp"
                style={{
                  fontWeight: "bolder",
                  fontSize: "20px",
                  color: "white",
                  textAlign: "center",
                  lineHeight: "23px",
                  marginBottom: "15px",
                }}
              >
                Enter the OTP
              </label>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "2",
                  padding: "10px",
                  marginBottom: "15px",
                }}
              >
                <OtpInput
                  value={opt}
                  onChange={setOtp}
                  numInputs={6}
                  otpType="number"
                  disabled={false}
                  className="opt-container"
                  autoFocus
                  width={3}
                  size={"30"}
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => <input {...props} />}
                  sx={{ width: "900px" }}
                />
              </Box>
              <Box sx={{ borderRadius: "10px", textAlign: "center" }}>
                <Box>{loading && <CircularProgress size={30} />}</Box>

                <Button variant="outlined" onClick={onOtpVerify}>Verify OPT</Button>
              </Box>
            </>
          ) : (
            <>
              <Typography
                sx={{
                  background: "white",
                  color: "primary.main",
                  width: "fit",
                  mx: "auto",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  borderRadius: "50px",
                  marginBottom: "15px",
                }}
              >
                <BsTelephoneFill size={"30"} />
              </Typography>
              <label
                htmlFor="ph"
                style={{
                  fontWeight: "bolder",
                  fontSize: "20px",
                  color: "white",
                  textAlign: "center",
                  lineHeight: "23px",
                  marginBottom: "15px",
                }}
              >
                Enter Your Phone Number
              </label>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "2",
                  padding: "10px",
                  marginBottom: "15px",
                }}
              >
                <PhoneInput country={"in"} value={ph} onChange={setPh} />
              </Box>
              <Box sx={{ borderRadius: "10px", textAlign: "center" }}>
                <Box>{loading && <CircularProgress size={30} />}</Box>

                <Button variant="outlined" onClick={onSignup}>
                  Send Code via SMS
                </Button>
              </Box>
            </>
          )}
        </Box>
        <Box>
          <Toaster toastOptions={{ duration: 4000 }} />
          <div id="recaptcha-container"></div>
          {user ? (
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                color: "white",
                fontSize: "22px",
                fontWeight: "600",
              }}
            >
              👍 Login Success
            </Typography>
          ) : (
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                color: "white",
                fontSize: "22px",
                fontWeight: "600",
              }}
            ></Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default App;
