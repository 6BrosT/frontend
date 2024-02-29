import MenuIcon from "@mui/icons-material/Menu";
import { Box, Card, CssBaseline, Divider, Grid, IconButton, Toolbar } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { ReactComponent as SubmissionLogoSvg } from "assets/img/paper-upload-svgrepo-com.svg";
import Header from "components/Header";
import BasicAccordion from "components/common/accordion/BasicAccordion";
import Button, { BtnType } from "components/common/buttons/Button";
import FileUploader from "components/editor/FileUploader";
import TextEditor from "components/editor/TextEditor";
import Heading1 from "components/text/Heading1";
import ParagraphBody from "components/text/ParagraphBody";
import ParagraphSmall from "components/text/ParagraphSmall";
import TextTitle from "components/text/TextTitle";
import dayjs from "dayjs";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./styles.module.scss";
import CustomFileList from "components/editor/FileUploader/components/CustomFileList";

const drawerWidth = 450;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: 0
  }),
  /**
   * This is necessary to enable the selection of content. In the DOM, the stacking order is determined
   * by the order of appearance. Following this rule, elements appearing later in the markup will overlay
   * those that appear earlier. Since the Drawer comes after the Main content, this adjustment ensures
   * proper interaction with the underlying content.
   */
  position: "relative"
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: drawerWidth
  })
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start"
}));

export default function AssignmentSubmission() {
  const navigate = useNavigate();
  const assignmentOpenTime = dayjs();
  const assignmentCloseTime = dayjs();
  const assignmentDescriptionRawHTML = `
    <div>
    <p>Đây là mô tả bài tập</p>
    </div>
    `;
  const activityInstructionsRawHTML = `
    <div>
    <p>Đây là hướng dẫn bài tập</p>
    </div>
    `;

  return (
    <Grid className={classes.root}>
      <Header />
      <Box className={classes.container}>
        <CssBaseline />
        <AppBar
          position='absolute'
          sx={{
            // margin top to avoid appbar overlap with content
            marginTop: "64px",
            backgroundColor: "white"
          }}
          open={false}
        >
          <Toolbar>
            <Box className={classes.tabWrapper}>
              <ParagraphBody className={classes.linkLevel} colorName='--gray-50' fontWeight={"600"}>
                {/* TODO */}
                <span onClick={() => navigate("/")}>Xem bài tập</span> {"> "}
                <span onClick={() => navigate("/")}>Bài tập 1</span> {"> "}
                <span onClick={() => navigate("/assignments/:assignmentId/submission")}>
                  Nộp bài làm
                </span>
              </ParagraphBody>
            </Box>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='end'
              sx={{ display: "none" }}
            >
              <MenuIcon color='action' />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Main open={true} className={classes.mainContent}>
          <DrawerHeader />
          <Card>
            <Box component='form' className={classes.formBody} autoComplete='off'>
              <Grid container direction='row' alignItems='center' gap={2}>
                <Grid item>
                  <Card
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      padding: "5px",
                      backgroundColor: "primary.main",
                      width: "50px"
                    }}
                  >
                    <SubmissionLogoSvg height='40px' />
                  </Card>
                </Grid>
                <Grid item>
                  <Heading1 fontWeight={"500"}>Nộp file báo cáo. Deadline: 02/02/2024</Heading1>
                </Grid>
              </Grid>
              <Card
                className={classes.pageActivityHeader}
                sx={{
                  padding: "10px",
                  backgroundColor: "#F8F9FA"
                }}
              >
                <Grid container direction='row' alignItems='center' gap={1}>
                  <Grid item>
                    <ParagraphSmall fontWeight={"600"}>Thời gian mở:</ParagraphSmall>
                  </Grid>
                  <Grid item>
                    <ParagraphBody>
                      {assignmentOpenTime
                        ?.toDate()
                        .toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })}
                    </ParagraphBody>
                  </Grid>
                </Grid>
                <Grid container direction='row' alignItems='center' gap={1}>
                  <Grid item>
                    <ParagraphSmall fontWeight={"600"}>Thời gian đóng:</ParagraphSmall>
                  </Grid>
                  <Grid item>
                    <ParagraphBody>
                      {assignmentCloseTime
                        ?.toDate()
                        .toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })}
                    </ParagraphBody>
                  </Grid>
                </Grid>
                <Divider
                  style={{
                    marginTop: "10px",
                    marginBottom: "10px"
                  }}
                />
                <Box className={classes.assignmentDescription}>
                  <div dangerouslySetInnerHTML={{ __html: assignmentDescriptionRawHTML }}></div>
                  <div
                    style={{
                      marginBottom: "10px"
                    }}
                    dangerouslySetInnerHTML={{ __html: activityInstructionsRawHTML }}
                  ></div>
                  <CustomFileList
                    files={[
                      {
                        id: "1",
                        name: "test1.jpg",
                        size: 1024,
                        type: "image/jpg",
                        uploadStatus: "success",
                        downloadUrl:
                          "https://res.cloudinary.com/doofq4jvp/image/upload/v1707044303/ulvrbytveqv8injpzliy.jpg"
                      },
                      {
                        id: "2",
                        name: "dummy.pdf",
                        size: 1024,
                        type: "application/pdf",
                        uploadStatus: "success",
                        downloadUrl:
                          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                      }
                    ]}
                  />
                </Box>
              </Card>
              <BasicAccordion title='Thêm bài nộp'>
                <Box className={classes.formBody}>
                  <Grid container spacing={1} columns={12}>
                    <Grid item xs={3}>
                      <TextTitle>Tự luận</TextTitle>
                    </Grid>
                    <Grid item xs={9} className={classes.textEditor}>
                      <TextEditor value={""} onChange={(e) => console.log(e)} />
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} columns={12}>
                    <Grid item xs={3}>
                      <TextTitle>Tệp bài nộp</TextTitle>
                    </Grid>
                    <Grid item xs={9}>
                      <FileUploader />
                    </Grid>
                  </Grid>
                </Box>
              </BasicAccordion>
              <Divider />
              <Grid container direction='row' justifyContent='center' gap={1}>
                <Grid item>
                  <Button btnType={BtnType.Primary}>Lưu thay đổi</Button>
                </Grid>
                <Grid item>
                  <Button btnType={BtnType.Outlined}>Huỷ bỏ</Button>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Main>
      </Box>
    </Grid>
  );
}