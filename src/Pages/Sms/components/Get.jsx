import {
  Autocomplete,
  Box,
  Button,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  Modal,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { createSms, getSms } from "../../../Components/db/Redux/api/smsSlice";

const Get = () => {
  const [data2, setData] = useState("+993 ");

  const dispatch = useDispatch();
  const data = useSelector((state) => state.sms.data);
  const status = useSelector((state) => state.sms.status);
  const error = useSelector((state) => state.sms.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getSms());
    }
  }, [status, dispatch]);

  const handleCreate = () => {
    const body = {
      phoneNumber: data2,
    };
    data2 != ""
      ? dispatch(createSms(body))
      : toast.error("Maglumatlary nadogry");
    setData("");
  };

  return (
    <>
      <Stack direction="row">
        <Stack
          sx={{
            width: "95%",
            gap: "20px",
            backgroundColor: "#292929 ",
            borderRadius: "20px",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            padding: "10px",
          }}
          direction={{ lg: "row", xs: "column" }}
        >
          <Typography color="#fff" width="30%" fontSize={25}>
            Create Subscription:
          </Typography>
          <Stack
            direction={{ lg: "row", md: "row", sm: "row", xs: "column" }}
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            spacing={2}
          >
            <TextField
              id="input-with-icon-textfield"
              placeholder="Change phone number"
              name="title"
              sx={{
                width: { lg: "90%", md: "30%", sm: "30%", xs: "100%" },

                mb: { lg: "0", md: "0", sm: "0", xs: "20px" },
              }}
              value={data2}
              onChange={(e) => setData(e.target.value)}
              InputProps={{
                sx: {
                  borderRadius: "35px",
                  backgroundColor: "#333",
                  border: "1px solid  #00997B",
                  fontSize: "20px",
                  fontWeight: "500",
                  color: "#fff",
                },
              }}
              variant="outlined"
            />
          </Stack>

          <Button
            onClick={handleCreate}
            sx={{
              backgroundColor: "blue",
              color: "#fff",
              minWidth: "120px",
              height: "50px",
            }}
          >
            Change
          </Button>
        </Stack>
      </Stack>
      {status === "loading..." ? (
        <Stack
          direction="column"
          height="100%"
          alignItems="center"
          sx={{ gap: "10px", mt: "20px" }}
        >
          <CircularProgress />
          Loading...
        </Stack>
      ) : status === "failed" ? (
        toast.error(error)
      ) : status === "succeeded" ? (
        <Box>
          <Stack
            direction="row"
            alignItems="center"
            p="0 20px"
            gap={2}
            flexWrap="wrap"
            justifyContent="center"
            mt={2}
          >
            {data.length == 0 ? (
              <Typography>No Data!</Typography>
            ) : (
              <CardActionArea
                key={data.id}
                sx={{
                  width: "250px",
                  p: "10px",
                  color: "#fff",
                  backgroundColor: "#1E1E1E",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <CardMedia
                  sx={{ height: "20px", width: "220px" }}
                  image="/"
                  title="green iguana"
                  style={{ borderRadius: "10px" }}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    textAlign="center"
                    component="div"
                    color="#fff"
                  >
                    {data.phoneNumber}
                  </Typography>
                </CardContent>
              </CardActionArea>
            )}
          </Stack>
        </Box>
      ) : (
        ""
      )}
    </>
  );
};

export default Get;
