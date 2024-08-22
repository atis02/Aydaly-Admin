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
  createVideo,
  deleteVideo,
  getVideo,
  updateVideo,
} from "../../../Components/db/Redux/api/reduxVideo";
import { getCategory } from "../../../Components/db/Redux/api/ReduxSlice";
import { NavLink } from "react-router-dom";
import { getAuthors } from "../../../Components/db/Redux/api/AuthorSlice";
// import { getCategory } from "../../../Components/db/Redux/api/ReduxSlice";
const Data = () => {
  const [id, setId] = useState(null);
  const [idUpdate, setIdUpdate] = useState("");
  const [id2, setId2] = useState("");
  const [show, setShow] = useState(null);
  const [originalVideo, setOriginalVideo] = useState(null);
  const [karaokeVideo, setKaraokeVideo] = useState(null);
  const [nameVideo, setNameVideo] = useState("");
  const [authorId, setAuthorId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [add, setAdd] = useState();
  const [data2, setData] = useState("");
  const [imageUpdate, setImageUpdate] = useState("");
  const [updateData, setUpdatedata] = useState("");
  const [originalVideoName, setOriginalVideoName] = useState("");
  const handleVideo = (event) => {
    setOriginalVideo(event.target.files[0]);
  };
  const handleKaraokeVideo = (event) => {
    setKaraokeVideo(event.target.files[0]);
  };

  const handleChange = (event) => {
    setAdd(event.target.value);
  };

  const dispatch = useDispatch();

  const data = useSelector((state) => state.video.video.data);
  const status = useSelector((state) => state.video.status);
  const error = useSelector((state) => state.video.error);
  const upload = useSelector((state) => state.video.progress);

  const meta = useSelector((state) => state.video.meta);
  const meta2 = useSelector((state) => state.authors.meta);
  const meta3 = useSelector((state) => state.data.meta);

  const statusCategory = useSelector((state) => state.data.status);
  const errorCategory = useSelector((state) => state.data.error);
  const category = useSelector((state) => state.data.data.data);

  const statusAuthor = useSelector((state) => state.data.status);
  const AuthorData = useSelector((state) => state.authors.data.data);

  useEffect(() => {
    if (statusAuthor === "idle") {
      dispatch(getAuthors({ limit: meta2.limit, page: meta2.page }));
    }
  }, [statusAuthor, dispatch, meta2.page, meta2.limit]);

  useEffect(() => {
    if (statusCategory === "idle") {
      dispatch(getCategory({ limit: meta3.limit, page: meta3.page }));
    }
  }, [statusCategory, dispatch, meta3.page, meta3.limit]);

  useEffect(() => {
    if (status === "idlee") {
      dispatch(getVideo({ limit: meta.limit, page: meta.page }));
    }
  }, [status, dispatch, meta.page, meta.limit]);
  const handleChangePagination = (event, value) => {
    dispatch(getVideo({ limit: meta.limit, page: value }));
  };
  const handleCreate = () => {
    const body = new FormData();
    body.append("authorId", authorId);
    body.append("categories", id);
    body.append("karaokeVideo", karaokeVideo);
    body.append("name", nameVideo);
    body.append("originalVideo", originalVideo);
    dispatch(createVideo(body));
    setNameVideo(" ");
    setId(null);
    setAuthorId(null);
    setKaraokeVideo(null);
    setOriginalVideo(null);
  };
  const handleDelete = (id) => {
    dispatch(deleteVideo(id));
  };
  const handleChangeStep = (e, newValues) => {
    setId(newValues.id);
  };
  const handleChangeCategory = (e, newValues) => {
    setIdUpdate(newValues.id);
  };
  const handleChangeAuthor = (e, newValues) => {
    setAuthorId(newValues.id);
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
  const handleUpdate = () => {
    setShow(null);
    const updatedItem = {
      id2,
      body: {
        categories: idUpdate,
        karaokeVideo: imageUpdate,
        name: updateData,
        originalVideo: originalVideoName,
      },
    };
    dispatch(updateVideo(updatedItem));
    setUpdatedata("");
    setImageUpdate("");
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
            Create Video:
          </Typography>
          <Stack
            direction={{ lg: "row", md: "row", sm: "row", xs: "column" }}
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            spacing={1}
          >
            <Stack>
              <Autocomplete
                multiple={false}
                fullWidth
                value={id}
                disableClearable
                id="combo-box-demo"
                options={
                  statusCategory === "loading..." ? (
                    <Stack
                      direction="column"
                      height="100%"
                      alignItems="center"
                      sx={{ gap: "10px", mt: "20px" }}
                    >
                      <CircularProgress />
                      Loading...
                    </Stack>
                  ) : statusCategory === "failed" ? (
                    toast.error(error)
                  ) : statusCategory === "succeeded" ? (
                    category
                  ) : (
                    ""
                  )
                }
                filterSelectedOptions
                getOptionLabel={(option) => option.name}
                onChange={handleChangeStep}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    name="user_name"
                    focused
                    id="outlined-basic"
                    sx={{
                      backgroundColor: "lightgray",
                      width: 230, // Set width
                      "& .MuiInputBase-root": {
                        color: "blue", // Set text color
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#333", // Set border color
                      },
                      "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#00997B", // Set border color when focused
                      },
                      "& .MuiAutocomplete-option": {
                        color: "#fff !important", // Default color for options
                      },
                    }}
                    autoComplete="off"
                    label="Kategoriyalar "
                    variant="outlined"
                  />
                )}
              />
            </Stack>
            <Autocomplete
              fullWidth
              disableClearable
              id="combo-box-demo"
              value={authorId}
              options={
                statusAuthor === "loading..." ? (
                  <Stack
                    direction="column"
                    height="100%"
                    alignItems="center"
                    sx={{ gap: "10px", mt: "20px" }}
                  >
                    <CircularProgress />
                    Loading...
                  </Stack>
                ) : statusAuthor === "failed" ? (
                  toast.error(error)
                ) : statusAuthor === "succeeded" ? (
                  AuthorData
                ) : (
                  ""
                )
              }
              filterSelectedOptions
              getOptionLabel={(option) => option.name}
              onChange={handleChangeAuthor}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  name="user_name"
                  focused
                  id="outlined-basic"
                  sx={{
                    backgroundColor: "lightgray",
                    width: 230, // Set width
                    "& .MuiInputBase-root": {
                      color: "blue", // Set text color
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#333", // Set border color
                    },
                    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#00997B", // Set border color when focused
                    },
                    "& .MuiAutocomplete-option": {
                      color: "#fff !important", // Default color for options
                    },
                  }}
                  autoComplete="off"
                  label="Awtory Saylan "
                  variant="outlined"
                />
              )}
            />
            <TextField
              fullWidth
              id="input-with-icon-textfield"
              placeholder="Add Video name"
              value={nameVideo}
              name="title"
              sx={{
                width: { lg: "70%", md: "50%", sm: "50%", xs: "100%" },
                mb: { lg: "0", md: "0", sm: "0", xs: "20px" },
              }}
              //   value={video.name}
              onChange={(e) => setNameVideo(e.target.value)}
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

            <label for="file" style={{ color: "#fff" }}>
              Karaoke video
            </label>
            <input
              type="file"
              style={{ color: "#fff", width: "200px" }}
              name="originalVideo"
              onChange={handleKaraokeVideo}
            />

            <label style={{ color: "#fff" }} for="file">
              Original video
            </label>
            <input
              type="file"
              style={{ color: "#fff", width: "200px" }}
              name="karaokeVideo"
              onChange={handleVideo}
            />
            <Button
              onClick={handleCreate}
              sx={{
                backgroundColor: "blue",
                color: "#fff",
                minWidth: "160px",
                height: "50px",
              }}
            >
              Create
            </Button>
          </Stack>
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
              <Typography>No Video!</Typography>
            ) : (
              data.map((video, index) => (
                <Stack key={video.id}>
                  <NavLink
                    to={`/videos/${video.id}`}
                    style={{
                      flexDirection: "column",
                      textDecoration: "none",
                      justifyContent: "center",
                      color: "#000",
                      fontWeight: 600,
                      minHeight: 250,
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "12px",
                    }}
                    className="videoLink"
                  >
                    <Typography
                      gutterBottom
                      variant="h5"
                      textAlign="center"
                      component="div"
                      width="90%"
                      height="70px"
                      color="#fff"
                    >
                      {index + 1}. {video.name}
                    </Typography>
                    <Typography
                      gutterBottom
                      sx={{ fontSize: "15px", color: "lightgray" }}
                      width="250px"
                      textAlign="center"
                      component="div"
                    >
                      Awtor:{""}
                      {video.author.name}
                    </Typography>

                    {video.categories.length > 0 ? (
                      <Typography
                        gutterBottom
                        sx={{ fontSize: "15px", color: "lightgray" }}
                        component="div"
                      >
                        Kategoriýa Ady:{""}
                        {video.categories.map((elem) => elem.name)}
                      </Typography>
                    ) : (
                      " Kategoriýasy ýok"
                    )}
                  </NavLink>
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="space-around"
                  >
                    <Button
                      onClick={() => {
                        handleDelete(video.id);
                      }}
                      sx={{
                        backgroundColor: "red",
                        color: "#fff",
                        width: "100px",
                        height: "40px",
                        "&:hover": { backgroundColor: "red" },
                      }}
                    >
                      delete
                    </Button>
                    <Button
                      onClick={() => {
                        handleOpen(video.id);
                        setId2(video.id);
                      }}
                      sx={{
                        backgroundColor: "gray",
                        color: "#fff",
                        "&:hover": { backgroundColor: "gray" },
                        width: "100px",
                        height: "40px",
                      }}
                    >
                      update
                    </Button>
                  </Stack>
                  {show == video.id && (
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
                              Updating video name:
                            </Typography>
                            <Typography
                              fontSize={25}
                              color="#fff"
                              backgroundColor={
                                video.name === "" ? "transparent" : "brown"
                              }
                            >
                              {video.name === "" ? "No title" : video.name}
                            </Typography>
                          </Stack>
                          <Stack
                            direction="column"
                            width="100%"
                            alignItems="center"
                            spacing={2}
                          >
                            <Autocomplete
                              multiple={false}
                              fullWidth
                              disableClearable
                              id="combo-box-demo"
                              options={
                                statusCategory === "loading..." ? (
                                  <Stack
                                    direction="column"
                                    height="100%"
                                    alignItems="center"
                                    sx={{ gap: "10px", mt: "20px" }}
                                  >
                                    <CircularProgress />
                                    Loading...
                                  </Stack>
                                ) : statusCategory === "failed" ? (
                                  toast.error(error)
                                ) : statusCategory === "succeeded" ? (
                                  category
                                ) : (
                                  ""
                                )
                              }
                              filterSelectedOptions
                              getOptionLabel={(option) => option.name}
                              onChange={handleChangeCategory}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  fullWidth
                                  name="user_name"
                                  focused
                                  id="outlined-basic"
                                  sx={{
                                    backgroundColor: "lightgray",
                                    width: 230, // Set width
                                    "& .MuiInputBase-root": {
                                      color: "blue", // Set text color
                                    },
                                    "& .MuiOutlinedInput-notchedOutline": {
                                      borderColor: "#333", // Set border color
                                    },
                                    "& .Mui-focused .MuiOutlinedInput-notchedOutline":
                                      {
                                        borderColor: "#00997B", // Set border color when focused
                                      },
                                    "& .MuiAutocomplete-option": {
                                      color: "#fff !important", // Default color for options
                                    },
                                  }}
                                  autoComplete="off"
                                  label="Kategoriyalar "
                                  variant="outlined"
                                />
                              )}
                            />
                            <TextField
                              id="input-with-icon-textfield"
                              placeholder="New video title"
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
                              placeholder="New video title"
                              name="title"
                              sx={{ width: "90%" }}
                              value={imageUpdate}
                              onChange={(e) => setImageUpdate(e.target.value)}
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
                              placeholder="New video title"
                              name="title"
                              sx={{ width: "90%" }}
                              value={originalVideoName}
                              onChange={(e) =>
                                setOriginalVideoName(e.target.value)
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

export default Data;
