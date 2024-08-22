import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../Components/db/Redux/reducers/ReduxSlice";

import axios from "axios";
// import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [data, setData] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email.trim().length <= 0 || password.trim().length <= 0) {
        toast.error("Dogry maglumatyňyzy giriziň!");
      } else {
        setLoading(true);
        const response = await AxiosInstance.post(`${BASE_URL}/auth/signin`, {
          email,
          password,
        });

        const user = response.data.user.email;
        const token = response.data.token;

        dispatch(loginSuccess({ user, token }));
        if (response.status === 200) {
          localStorage.setItem("token", JSON.stringify(response.data));
          toast.success("Successfully logged in!");
          setTimeout(() => navigate("/"), 1000);
        }
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };
  return (
    <Box>
      <ToastContainer />
      <Stack direction="row">
        <Stack width="40%" maxHeight="100vh" backgroundColor="#3763f5">
          <img
            src="/images/login (2).png"
            style={{
              width: "100%",

              height: "50%",
            }}
            alt=""
          />
          <Typography
            textAlign="center"
            color="#fff"
            fontWeight="400"
            fontSize={55}
            position="absolute"
            top="50%"
            right="71%"
            fontFamily="Montserrat"
          >
            ÄLEM DOC
          </Typography>
          <img
            src="/images/login (1).png"
            style={{
              width: "100%",
              height: "50%",
            }}
            alt=""
          />
        </Stack>
        <Stack
          direction="column"
          alignItems="center"
          height="100vh"
          justifyContent="center"
          width="60%"
        >
          <Stack
            width={550}
            height={500}
            boxShadow="0px 0px 22px 3px rgba(168,168,168,1)"
            justifyContent="center"
          >
            <Typography
              mb="10px"
              color="#474747"
              fontSize="30px"
              fontFamily="Montserrat"
              fontWeight="600"
              textAlign="start"
              ml={3}
            >
              Log in
            </Typography>
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: "40px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Email ýada Adyňyz"
                type="text"
                variant="outlined"
                name="username"
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  borderRadius: "50px",
                  fontFamily: "Montserrat",
                  width: "500px",
                }}
              />

              <TextField
                id="outlined-basic"
                label="Açar söz"
                type="text"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                sx={{
                  borderRadius: "50px",
                  width: "500px",
                  fontFamily: "Montserrat",
                }}
              />
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
              >
                <Stack direction="row" spacing={2}>
                  <Link
                    to="/"
                    style={{
                      color: "#00159D",
                      fontSize: 15,
                      fontFamily: "Montserrat",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    Forgot Password?
                  </Link>
                  <Link
                    to="/"
                    style={{
                      color: "#00159D",
                      fontSize: 15,
                      fontFamily: "Montserrat",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    Registration
                  </Link>
                </Stack>
                <Button
                  type="submit"
                  sx={{
                    backgroundColor: "blue",
                    color: "#fff",
                    "&:hover": { background: "black" },
                    fontFamily: "Montserrat",
                    height: "55px",
                    width: "160px",
                    borderRadius: "100px",
                  }}
                >
                  {loading ? (
                    <Stack alignItems="center">
                      <CircularProgress sx={{ color: "#fff" }} />
                    </Stack>
                  ) : (
                    "Girmek"
                  )}
                </Button>
              </Stack>
            </form>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Login;
