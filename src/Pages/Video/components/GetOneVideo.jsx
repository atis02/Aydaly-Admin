import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneVideo } from "../../../Components/db/Redux/api/reduxVideo";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AxiosInstance from "../../../Components/db/Redux/api/AxiosHelper";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
const GetOneVideo = () => {
  const { id } = useParams();
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const getVideo = async () => {
      setLoading(true);
      const response = await AxiosInstance.get(`/videos/${id}`)
        .then((response) => {
          setVideo(response.data);
          console.log(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    };
    getVideo();
  }, []);
  return (
    <Box p="10px" height="100vh" overflow="scroll" width="100%">
      {error ? (
        <Typography>{error}</Typography>
      ) : loading ? (
        <Stack
          direction="column"
          height="100%"
          alignItems="center"
          sx={{ gap: "10px", mt: "20px" }}
        >
          <CircularProgress />
          Loading...
        </Stack>
      ) : (
        <Stack direction={{ lg: "row", md: "row", sm: "row", xs: "column" }}>
          <Card sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
            <video
              controls
              src={video.karaokeVideo}
              style={{ width: "100%", height: "auto" }}
            />
            <CardContent>
              <Typography
                color="gray"
                textAlign="center"
                fontWeight={600}
                fontSize={24}
              >
                KaraokeVideo
              </Typography>

              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography fontWeight={600} fontSize={24}>
                  Ady:
                </Typography>

                <Typography fontWeight={600} fontSize={24}>
                  {" "}
                  {video.name}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography>Awtory:</Typography>
                <Typography fontWeight={600} fontSize={24}>
                  {video.author && video.author.name}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <RemoveRedEyeIcon />
                <Typography fontWeight={600} fontSize={24}>
                  {video.views}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
          <Card sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
            <video
              controls
              src={video.karaokeVideo}
              style={{ width: "100%", height: "auto" }}
            />
            <CardContent>
              <Typography
                color="gray"
                textAlign="center"
                fontWeight={600}
                fontSize={24}
              >
                Original Video
              </Typography>

              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography fontWeight={600} fontSize={24}>
                  Ady:
                </Typography>

                <Typography fontWeight={600} fontSize={24}>
                  {" "}
                  {video.name}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography>Awtory:</Typography>
                <Typography fontWeight={600} fontSize={24}>
                  {video.author && video.author.name}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <RemoveRedEyeIcon />
                <Typography fontWeight={600} fontSize={24}>
                  {video.views}
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography>Kategoriyalary:</Typography>
                {video.categories && video.categories.length > 0
                  ? video.categories.map((elem) => (
                      <Typography key={elem.id} fontWeight={600} fontSize={16}>
                        {elem.name},
                      </Typography>
                    ))
                  : "kategoriya tapylmady"}
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      )}
    </Box>
  );
};

export default GetOneVideo;
