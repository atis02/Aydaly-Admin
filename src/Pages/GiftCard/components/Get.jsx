import {
  Autocomplete,
  Box,
  Button,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Pagination,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategory,
  deleteCategory,
  createCategory,
  updateCategory,
} from "../../../Components/db/Redux/api/ReduxSlice";
import {
  createGiftCard,
  deleteGiftCard,
  getgiftCard,
} from "../../../Components/db/Redux/api/giftCardSlice";
import { getSubscription } from "../../../Components/db/Redux/api/subscriptionSlice";

const Get = () => {
  const [amount, setAmount] = useState("");
  const [subscription, setSubscription] = useState("");

  const handleChange = (event) => {
    setSubscription(event.target.value);
  };

  const dispatch = useDispatch();
  const data = useSelector((state) => state.giftCard.data.data);
  const status = useSelector((state) => state.giftCard.status);
  const error = useSelector((state) => state.giftCard.error);
  const subscriptions = useSelector((state) => state.subscription.data.data);
  const statusSubs = useSelector((state) => state.subscription.status);
  const errorSubs = useSelector((state) => state.subscription.error);
  const meta = useSelector((state) => state.giftCard.meta);
  const metaw = useSelector((state) => state.subscription.meta);

  useEffect(() => {
    if (statusSubs === "idle") {
      dispatch(getSubscription({ limit: metaw.limit, page: metaw.page }));
    }
  }, [statusSubs, dispatch, metaw.page, metaw.limit]);
  useEffect(() => {
    if (status === "idle") {
      dispatch(getgiftCard({ limit: meta.limit, page: meta.page }));
    }
  }, [status, dispatch, meta.page, meta.limit]);
  const handleDelete = (id) => {
    dispatch(deleteGiftCard(id));
  };
  const handleChangePagination = (event, value) => {
    dispatch(getgiftCard({ limit: meta.limit, page: value }));
  };
  const handleCreate = () => {
    const body = {
      amount: Number(amount),
      subscriptionId: subscription,
    };
    dispatch(createGiftCard(body));
    setAmount("");
    setSubscription("");
  };

  return (
    <>
      <Stack direction="row" justifyContent="center">
        <Stack
          style={{
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
          <Typography
            color="#fff"
            width={{ lg: "20%", md: "100%", sm: "200px", xs: "200px" }}
            fontSize={25}
          >
            Create Gift Card:
          </Typography>
          <Stack
            direction={{ lg: "row", md: "row", sm: "row", xs: "column" }}
            alignItems="center"
            justifyContent="space-between"
            width={{ lg: "60%", xs: "100%" }}
            spacing={1}
          >
            <FormControl sx={{ width: { lg: "30%", md: "30%", xs: "90%" } }}>
              <InputLabel sx={{ color: "#00997B" }} id="select-label">
                Select Subscriptions
              </InputLabel>
              <Select
                labelId="select-label"
                value={subscription}
                onChange={handleChange}
                label="Select Option"
                sx={{
                  backgroundColor: "#333",
                  color: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#00997B", // Border color of the outline
                  },
                  "& .MuiSelect-icon": {
                    color: "#00997B", // Icon color
                  },
                }}
              >
                {statusSubs === "loading..." ? (
                  <Stack
                    direction="column"
                    height="100%"
                    alignItems="center"
                    sx={{ gap: "10px", mt: "20px" }}
                  >
                    <CircularProgress />
                    Loading...
                  </Stack>
                ) : statusSubs === "failed" ? (
                  toast.error(errorSubs)
                ) : statusSubs === "succeeded" ? (
                  subscriptions.map((elem) => (
                    <MenuItem key={elem.id} value={elem.id}>
                      {elem.name}
                    </MenuItem>
                  ))
                ) : (
                  ""
                )}
              </Select>
            </FormControl>
            <TextField
              type="number"
              id="input-with-icon-textfield"
              placeholder="Add amount of gift cards"
              name="title"
              sx={{
                width: { lg: "50%", md: "50%", sm: "50%", xs: "90%" },
                mb: { lg: "0", md: "0", sm: "0", xs: "20px" },
              }}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
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
              width: "100px",
              height: "50px",
            }}
          >
            Create
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
          <Stack m={2} alignItems="center">
            {meta.page && (
              <Pagination
                count={meta.pageCount}
                page={meta.page}
                onChange={handleChangePagination}
                variant="outlined"
                color="primary"
                shape="rounded"
              />
            )}
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            // p="0 20px"
            gap={2}
            flexWrap="wrap"
            justifyContent="center"
            mt={2}
          >
            {data.length == 0 ? (
              <Typography>No Data!</Typography>
            ) : (
              data.map((category) => (
                <Stack
                  key={category.id}
                  sx={{
                    width: { lg: "250px", xs: "175px" },
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
                    image={category.icon}
                    title="green iguana"
                    style={{ borderRadius: "10px" }}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      textAlign="center"
                      fontSize={{ lg: 25, xs: 15 }}
                      component="div"
                    >
                      Kody:
                      <span
                        style={{
                          color: "gray",
                          fontSize: 18,
                          paddingLeft: "8px",
                        }}
                      >
                        {category.code}
                      </span>
                    </Typography>
                    <Typography
                      gutterBottom
                      fontSize={{ lg: 20, xs: 13 }}
                      component="div"
                    >
                      Ýagdaýy:
                      {category.isUsed == false ? "Ulanylmadyk" : "Ulanylan"}
                    </Typography>
                  </CardContent>
                  <Stack direction="row" spacing={2}>
                    <Button
                      onClick={() => {
                        handleDelete(category.id);
                      }}
                      sx={{
                        backgroundColor: "red",
                        color: "#fff",
                        width: "100px",
                        height: "40px",
                        mb: "20px",
                      }}
                    >
                      delete
                    </Button>
                  </Stack>
                </Stack>
              ))
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
