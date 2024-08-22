import React, { useState, useEffect } from "react";
import {
  Badge,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import {
  MenuItem,
  Menu,
  Sidebar,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EmailIcon from "@mui/icons-material/Email";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CategoryIcon from "@mui/icons-material/Category";
import GroupIcon from "@mui/icons-material/Group";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import SmsIcon from "@mui/icons-material/Sms";
import { dbDoc } from "../Components/db/dbDocuments.mjs";
import axios from "axios";
import { logout } from "../Components/db/Redux/reducers/ReduxSlice";
import { ToastContainer, toast } from "react-toastify";
import { getAuthors } from "../Components/db/Redux/api/AuthorSlice";

export default function SidebarNav() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  // const stateDocs = useSelector((state) => state.sendedDocs);
  // const DeletedDocs = JSON.parse(localStorage.getItem("deletedDocs")) || [];
  // const navigate = useNavigate();
  // const isLoggedIn = useSelector((state) => state.auth.user);

  // const Logout = async () => {
  //   const response = await axios
  //     .post("https://alemhasap.alemtilsimat.com/api/auth/signout")
  //     .then(
  //       (res) => console.log(res),
  //       localStorage.removeItem("token"),

  //       dispatch(logout()),
  //       setTimeout(() => navigate("/login"), 1000),
  //       toast.success("Succesfully Logout!")
  //     );
  // };
  // const dispatch = useDispatch();

  // const handleLogout = () => {
  //   dispatch(logout()); // Dispatch the logout action
  // };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: "#0B57D0",
            color: "#F3F3F4",
            maxHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
        className="sidebar"
        style={{
          minHeight: "100vh",
          ...(open
            ? {
                minWidth: "250px",

                width: { ...(isMobile ? "150px" : "250px") },
              }
            : {
                width: "80px",
                minWidth: "80px",
              }),
          ...(isMobile ? { display: "none" } : { display: "flex" }),
          border: "none",
        }}
      >
        <Stack>
          <Stack
            sx={{ ...(open ? "" : { flexDirection: "column" }) }}
            height="54px"
            direction="row"
            alignItems="center"
            justifyContent="center"
            m="20px 30px"
          >
            <Link style={{ textDecoration: "none" }} to="/">
              <ToastContainer />
              <Typography
                color="#F3F3F4"
                fontWeight="700"
                sx={{ ...(open ? { fontSize: "30px" } : { fontSize: "18px" }) }}
                textAlign="center"
                fontFamily="Montserrat"
              >
                Aydaly Admin
              </Typography>
            </Link>
            <IconButton
              sx={{
                color: "#F3F3F4",
                ...(open
                  ? ""
                  : {
                      width: "30px",
                      height: "30px",
                      backgroundColor: "#5C9FE3",
                    }),
              }}
              onClick={handleOpen}
            >
              {" "}
              <MenuOpenIcon />
            </IconButton>
          </Stack>
          <Menu
            menuItemStyles={{
              button: {
                "&:hover": { backgroundColor: "#1976d2" },
              },
            }}
          >
            <MenuItem
              component={<NavLink className="sideNav" to="/" />}
              icon={<HomeIcon />}
            >
              {open ? "Baş sahypa" : ""}
            </MenuItem>
            <MenuItem
              component={<NavLink className="sideNav" to="/dashboard" />}
              icon={<DashboardIcon />}
            >
              {open ? "Dolandyryş" : ""}
            </MenuItem>
            <MenuItem
              component={<NavLink className="sideNav" to="/authors" />}
              icon={<GroupIcon />}
            >
              {open ? "Awtorlar" : ""}
            </MenuItem>
            <MenuItem
              component={<NavLink className="sideNav" to="/category" />}
              icon={<CategoryIcon />}
            >
              {open ? "Kategoriýa" : ""}
            </MenuItem>
            <MenuItem
              component={<NavLink className="sideNav" to="/sms" />}
              icon={<SmsIcon />}
            >
              {open ? "Sms" : ""}
            </MenuItem>
            <MenuItem
              component={<NavLink className="sideNav" to="/video" />}
              icon={<YouTubeIcon />}
            >
              {open ? "Video" : ""}
            </MenuItem>
            <MenuItem
              component={<NavLink className="sideNav" to="/gift-cards" />}
              icon={<CardGiftcardIcon />}
            >
              {open ? "Sowgat Kartlary" : ""}
            </MenuItem>
            <MenuItem
              component={<NavLink className="sideNav" to="/subscription" />}
              icon={<CardGiftcardIcon />}
            >
              {open ? "Abuna" : ""}
            </MenuItem>
            <MenuItem
              component={<NavLink className="sideNav" to="/account" />}
              icon={<AccountCircleIcon />}
            >
              {open ? "Profil" : ""}
            </MenuItem>
          </Menu>
        </Stack>
        <Stack>
          <Button
            sx={{
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              gap: "1px",
              fontSize: "12px",
              fontFamily: "Montserrat",
            }}
          >
            <HelpOutlineIcon sx={{ width: 30, height: 30 }} />
            Kömek
          </Button>
          <Button
            // onClick={Logout}
            sx={{
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              fontFamily: "Montserrat",
              fontSize: "11px",
            }}
          >
            <PowerSettingsNewIcon sx={{ width: 30, height: 30 }} />
            Çykmak
          </Button>
        </Stack>
      </Sidebar>
    </>
  );
}
