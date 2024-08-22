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
import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategory,
  deleteCategory,
  createCategory,
  updateCategory,
} from "../../../Components/db/Redux/api/ReduxSlice";
import {
  createAuthor,
  deleteAuthor,
  getAuthors,
  updateAuthor,
} from "../../../Components/db/Redux/api/AuthorSlice";
import { debounce } from "lodash";

const Get = () => {
  const [id, setId] = useState("");
  const [show, setShow] = useState(null);
  const [image, setImage] = useState("");
  const [data2, setData] = useState("");
  const [imageUpdate, setImageUpdate] = useState("");
  const [updateData, setUpdatedata] = useState("");
  const Image = (event) => {
    setImage(event.target.files[0]);
  };
  const UpdateImage = (event) => {
    setImageUpdate(event.target.files[0]);
  };
  const dispatch = useDispatch();
  const data = useSelector((state) => state.authors.data.data);
  const status = useSelector((state) => state.authors.status);
  const error = useSelector((state) => state.authors.error);
  const upload = useSelector((state) => state.authors.progress);
  const meta = useSelector((state) => state.authors.meta);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getAuthors({ limit: meta.limit, page: meta.page }));
    }
  }, [status, dispatch, meta.page, meta.limit]);
  const handleDelete = (id) => {
    dispatch(deleteAuthor(id));
  };
  const handleChangePagination = (event, value) => {
    dispatch(getAuthors({ limit: meta.limit, page: value }));
  };
  const handleChange = debounce((e) => {
    setData(e.target.value);
  }, 300);

  const handleCreate = () => {
    const body = new FormData();
    body.append("avatar", image);
    body.append("name", data2);
    dispatch(createAuthor(body));
    setData("");
  };

  const handleUpdate = () => {
    setShow(null);
    const updatedItem = {
      id,
      icon: imageUpdate,
      name: updateData,
    };
    dispatch(updateAuthor(updatedItem));
    setUpdatedata("");
    setImageUpdate("");
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
            justifyContent: "center",
            padding: "10px",
          }}
          direction={{ lg: "row", md: "row", sm: "row", xs: "column" }}
        >
          <Typography color="#fff" fontSize={25}>
            Create Category:
          </Typography>
          <Stack
            direction={{ lg: "row", md: "row", sm: "row", xs: "column" }}
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <TextField
              id="input-with-icon-textfield"
              placeholder="Add category title"
              name="title"
              sx={{
                width: { lg: "50%", md: "50%", sm: "50%", xs: "100%" },
                mb: { lg: "0", md: "0", sm: "0", xs: "20px" },
              }}
              // value={data2}
              // ref={inputRef}
              onChange={handleChange}
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
            <input
              type="file"
              style={{ color: "#fff" }}
              name="image"
              onChange={Image}
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
          {upload ? <Typography color="#000">{upload}%</Typography> : ""}
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
                <Stack
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
                    sx={{ height: "200px", width: "220px" }}
                    image={category.avatar}
                    title="green iguana"
                    style={{ borderRadius: "10px" }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {category.name}
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
                                Updating Category name:
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
                                placeholder="New Category title"
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
                              <input
                                type="file"
                                name="image"
                                onChange={UpdateImage}
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
