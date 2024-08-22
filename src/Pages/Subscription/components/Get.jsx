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
import {
  getCategory,
  deleteCategory,
  createCategory,
  updateCategory,
} from "../../../Components/db/Redux/api/ReduxSlice";
import { getgiftCard } from "../../../Components/db/Redux/api/giftCardSlice";
import {
  createSubscription,
  deleteSubscription,
  getSubscription,
  updateSubscription,
} from "../../../Components/db/Redux/api/subscriptionSlice";

const Get = () => {
  const [id, setId] = useState("");
  const [show, setShow] = useState(null);
  const [image, setImage] = useState("");
  const [data2, setData] = useState("");
  const [duration, setDataDuration] = useState();
  const [dataPrice, setDataPrice] = useState();

  const [durationUpdate, setDurationUpdate] = useState(parseInt());
  const [updateData, setUpdatedata] = useState("");
  const [updatePrice, setUpdatePrice] = useState(parseInt());

  const dispatch = useDispatch();
  const data = useSelector((state) => state.subscription.data.data);
  const status = useSelector((state) => state.subscription.status);
  const error = useSelector((state) => state.subscription.error);
  const meta = useSelector((state) => state.subscription.meta);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getSubscription({ limit: meta.limit, page: meta.page }));
    }
  }, [status, dispatch, meta.page, meta.limit]);
  const handleDelete = (id) => {
    dispatch(deleteSubscription(id));
  };
  const handleCreate = () => {
    const body = {
      duration: Number(duration),
      name: data2,
      price: Number(dataPrice),
    };
    duration != null &&
    duration != "" &&
    data2 != "" &&
    dataPrice != null &&
    dataPrice != ""
      ? dispatch(createSubscription(body))
      : toast.error("Maglumatlary nadogry");
    setData("");
    setDataDuration("");
    setDataPrice("");
  };
  const handleChangeStep = (e, newValues) => {
    setId(newValues.id);
  };
  const handleChangePagination = (event, value) => {
    dispatch(getSubscription({ limit: meta.limit, page: value }));
  };
  const handleUpdate = () => {
    setShow(null);
    const updatedItem = {
      id,
      duration: parseInt(durationUpdate),
      name: updateData,
      price: parseInt(updatePrice),
    };

    durationUpdate != null &&
    durationUpdate != "" &&
    updateData != "" &&
    updatePrice != null &&
    updatePrice != ""
      ? dispatch(updateSubscription(updatedItem))
      : toast.error("Maglumatlary nadogry");

    setUpdatedata("");
  };
  const handleOpen = (id) => {
    setShow(id);
  };

  const handleClose = () => setShow(null);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { lg: 500, md: 500, sm: 500, xs: "100%" },
    height: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 14,
    p: 4,
  };
  return (
    <>
      <Stack direction="row">
        <Stack
          onSubmit={handleCreate}
          style={{
            width: "100%",
            gap: "20px",
            backgroundColor: "#292929 ",
            borderRadius: "20px",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          <Typography color="#fff" fontSize={25}>
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
              placeholder="Add subscription title"
              name="title"
              sx={{
                width: { lg: "30%", md: "30%", sm: "30%", xs: "100%" },

                mb: { lg: "0", md: "0", sm: "0", xs: "20px" },
              }}
              value={data2}
              // ref={inputRef}
              onChange={(e) => setData(e.target.value)}
              focused={data == ""}
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
            <TextField
              type="number"
              id="input-with-icon-textfield"
              placeholder="Add subscription duration"
              name="title"
              sx={{
                width: { lg: "30%", md: "30%", sm: "30%", xs: "100%" },

                mb: { lg: "0", md: "0", sm: "0", xs: "20px" },
              }}
              value={duration}
              onChange={(e) => setDataDuration(e.target.value)}
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
            <TextField
              type="number"
              id="input-with-icon-textfield"
              placeholder="Add subscription price"
              name="title"
              sx={{
                width: { lg: "30%", md: "30%", sm: "30%", xs: "100%" },
                mb: { lg: "0", md: "0", sm: "0", xs: "20px" },
              }}
              value={dataPrice}
              onChange={(e) => setDataPrice(e.target.value)}
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
            {status === "succeeded" && meta.page && (
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
            p="0 20px"
            gap={2}
            flexWrap="wrap"
            justifyContent="center"
            mt={2}
          >
            {data.length == 0 ? (
              <Typography>No Data!</Typography>
            ) : (
              data.map((category) => (
                <CardActionArea
                  key={category.id}
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
                    image={category.icon}
                    title="green iguana"
                    style={{ borderRadius: "10px" }}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      textAlign="center"
                      component="div"
                    >
                      {category.name}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography gutterBottom fontSize={16} component="div">
                        Bahasy:
                      </Typography>

                      <Typography
                        color="green"
                        gutterBottom
                        fontSize={20}
                        component="div"
                      >
                        {category.price} TMT
                      </Typography>
                    </Stack>
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
                    <Button
                      onClick={() => {
                        handleOpen(category.id);
                        setId(category.id);
                      }}
                      sx={{
                        backgroundColor: "blue",
                        color: "#fff",
                        width: "100px",
                        height: "40px",
                        mb: "20px",
                      }}
                    >
                      update
                    </Button>
                    {show == category.id && (
                      <Modal
                        open={show !== null}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Stack alignItems="end" width="100%" mt={-2}>
                            <IconButton
                              sx={{ fontWeight: 600, fontSize: 20 }}
                              onClick={handleClose}
                            >
                              X
                            </IconButton>
                          </Stack>
                          <form
                            onSubmit={handleUpdate}
                            style={{
                              display: "flex",
                              width: "100%",
                              height: "100%",
                              gap: "20px",
                              backgroundColor: "lightgray ",
                              borderRadius: "20px",
                              alignItems: "center",
                              justifyContent: "center",
                              flexDirection: "column",
                              padding: "10px",
                            }}
                          >
                            <Stack
                              direction="row"
                              width="100%"
                              alignItems="center"
                              justifyContent="center"
                              spacing={2}
                            >
                              <Typography color="#000" fontSize={25}>
                                Updating Subscription name:
                              </Typography>
                              <Typography
                                fontSize={25}
                                color="#fff"
                                backgroundColor={
                                  category.name === "" ? "transparent" : "brown"
                                }
                              >
                                {category.name === ""
                                  ? "No title"
                                  : category.name}
                              </Typography>
                            </Stack>
                            <Stack
                              direction="column"
                              width="100%"
                              alignItems="center"
                              spacing={2}
                            >
                              <TextField
                                id="input-with-icon-textfield"
                                placeholder="Update title"
                                name="title"
                                sx={{ width: "90%" }}
                                value={updateData}
                                onChange={(e) => setUpdatedata(e.target.value)}
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
                              <TextField
                                id="input-with-icon-textfield"
                                type="number"
                                placeholder="Update duration"
                                name="title"
                                sx={{ width: "90%" }}
                                value={durationUpdate}
                                onChange={(e) =>
                                  setDurationUpdate(e.target.value)
                                }
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
                              <TextField
                                type="number"
                                id="input-with-icon-textfield"
                                placeholder="Update price"
                                name="title"
                                sx={{ width: "90%" }}
                                value={updatePrice}
                                onChange={(e) => setUpdatePrice(e.target.value)}
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
                              onClick={handleUpdate}
                              sx={{
                                backgroundColor: "green",
                                color: "#fff",
                                width: "100px",
                                height: "50px",
                              }}
                            >
                              Update
                            </Button>
                          </form>
                        </Box>
                      </Modal>
                    )}
                  </Stack>
                </CardActionArea>
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
