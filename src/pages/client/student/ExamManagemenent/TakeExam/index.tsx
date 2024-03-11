import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Card, CssBaseline, Divider, Drawer, Grid, IconButton, Toolbar } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import Header from "components/Header";
import Button, { BtnType } from "components/common/buttons/Button";
import Heading1 from "components/text/Heading1";
import ParagraphBody from "components/text/ParagraphBody";
import ParagraphSmall from "components/text/ParagraphSmall";
import TextTitle from "components/text/TextTitle";
import useWindowDimensions from "hooks/useWindowDimensions";
import * as React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { routes } from "routes/routes";
import qtype from "utils/constant/Qtype";
import EssayExamQuestion from "./components/ExamQuestion/EssayExamQuestion";
import MultipleChoiceExamQuestion from "./components/ExamQuestion/MultipleChoiceExamQuestion";
import ShortAnswerExamQuestion from "./components/ExamQuestion/ShortAnswerExamQuestion";
import TrueFalseExamQuestion from "./components/ExamQuestion/TrueFalseExamQuestion";
import TimeLeftTextField from "./components/TimeLeftTextField";
import classes from "./styles.module.scss";
import useBoxDimensions from "hooks/useBoxDimensions";

const drawerWidth = 350;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  width: `calc(100% - ${drawerWidth}px)`,
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

export default function TakeExam() {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const theme = useTheme();
  const questionPageIndex = parseInt(searchParams.get("page") || "0");
  const [open, setOpen] = React.useState(true);
  const [isShowTimeLeft, setIsShowTimeLeft] = React.useState(true);
  const [questions, setQuestions] = React.useState([
    {
      id: "0",
      type: qtype.essay
    },
    {
      id: "1",
      type: qtype.short_answer
    },
    {
      id: "2",
      type: qtype.multiple_choice
    },
    {
      id: "3",
      type: qtype.true_false
    },
    {
      id: "4",
      type: qtype.true_false
    },
    {
      id: "5",
      type: qtype.multiple_choice
    }
  ]);

  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);

  const [timeLimit, setTimeLimit] = React.useState(new Date().getTime() + 3600000 * 10);

  const getTime = React.useCallback(() => {
    const now = new Date().getTime();
    const distance = timeLimit - now;

    if (distance > 0) {
      setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
    }
  }, [timeLimit]);

  React.useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);

    return () => clearInterval(interval);
  }, [getTime, hours, minutes, seconds, timeLimit]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Auto close drawer when screen width < 1080 and open drawer when screen width > 1080
  React.useEffect(() => {
    if (width < 1080) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [width]);

  const headerRef = React.useRef<HTMLDivElement>(null);
  const { height: headerHeight } = useBoxDimensions({
    ref: headerRef
  });

  return (
    <Grid className={classes.root}>
      <Header ref={headerRef} />
      <Box className={classes.container} style={{ marginTop: `${headerHeight}px` }}>
        <CssBaseline />
        <AppBar
          position='fixed'
          sx={{
            // margin top to avoid appbar overlap with content
            marginTop: "64px",
            backgroundColor: "white"
          }}
          open={open}
        >
          <Toolbar>
            <Box id={classes.breadcumpWrapper}>
              <ParagraphSmall
                colorname='--blue-500'
                className={classes.cursorPointer}
                onClick={() => navigate(routes.student.course.management)}
              >
                Quản lý khoá học
              </ParagraphSmall>
              <KeyboardDoubleArrowRightIcon id={classes.icArrow} />
              <ParagraphSmall
                colorname='--blue-500'
                className={classes.cursorPointer}
                onClick={() => navigate(routes.student.course.information)}
              >
                CS202 - Nhập môn lập trình
              </ParagraphSmall>
              <KeyboardDoubleArrowRightIcon id={classes.icArrow} />
              <ParagraphSmall
                colorname='--blue-500'
                className={classes.cursorPointer}
                onClick={() => navigate(routes.student.course.assignment)}
              >
                Danh sách bài tập
              </ParagraphSmall>
              <KeyboardDoubleArrowRightIcon id={classes.icArrow} />
              <ParagraphSmall
                colorname='--blue-500'
                className={classes.cursorPointer}
                onClick={() => navigate(routes.student.exam.detail)}
              >
                Bài kiểm tra 1
              </ParagraphSmall>
              <KeyboardDoubleArrowRightIcon id={classes.icArrow} />
              <ParagraphSmall colorname='--blue-500'>Xem trước</ParagraphSmall>
            </Box>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='end'
              onClick={handleDrawerOpen}
              sx={{ ...(open && { display: "none" }) }}
            >
              <MenuIcon color='action' />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Main open={open} className={classes.mainContent}>
          <DrawerHeader />
          <Card>
            <Box component='form' className={classes.formBody} autoComplete='off'>
              <Heading1 fontWeight={"500"}>Bài kiểm tra Cuối Kì</Heading1>
              <Button
                btnType={BtnType.Primary}
                onClick={() => {
                  navigate(routes.student.exam.detail);
                }}
                startIcon={
                  <ChevronLeftIcon
                    sx={{
                      color: "white"
                    }}
                  />
                }
                width='fit-content'
              >
                <ParagraphBody>Quay lại</ParagraphBody>
              </Button>
              <Grid container spacing={1}>
                <Grid item xs={6}></Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center"
                  }}
                >
                  <TimeLeftTextField
                    value={`${
                      isShowTimeLeft
                        ? `Còn lại: ${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${
                            seconds < 10 ? `0${seconds}` : seconds
                          }`
                        : `Thời gian còn lại`
                    }`}
                    readOnly
                  />
                  <Button
                    btnType={BtnType.Primary}
                    onClick={() => {
                      setIsShowTimeLeft(!isShowTimeLeft);
                    }}
                    width='fit-content'
                    height='fit-content'
                    margin='8px 0 0 3px'
                  >
                    <ParagraphBody>{isShowTimeLeft ? "Ẩn" : "Hiện"}</ParagraphBody>
                  </Button>
                </Grid>
              </Grid>
              {questions[questionPageIndex].type === qtype.essay ? (
                <EssayExamQuestion />
              ) : questions[questionPageIndex].type === qtype.short_answer ? (
                <ShortAnswerExamQuestion />
              ) : questions[questionPageIndex].type === qtype.multiple_choice ? (
                <MultipleChoiceExamQuestion />
              ) : questions[questionPageIndex].type === qtype.true_false ? (
                <TrueFalseExamQuestion />
              ) : null}
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  {questionPageIndex !== 0 && (
                    <Link
                      to={{
                        pathname: routes.student.exam.take,
                        search: `?page=${questionPageIndex - 1}`
                      }}
                    >
                      Trang trước
                    </Link>
                  )}
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end"
                  }}
                >
                  {questionPageIndex !== questions.length - 1 ? (
                    <Link
                      to={{
                        pathname: routes.student.exam.take,
                        search: `?page=${questionPageIndex + 1}`
                      }}
                    >
                      Trang sau
                    </Link>
                  ) : (
                    <Button btnType={BtnType.Text} onClick={() => {}} padding='0'>
                      <ParagraphBody>Kết thúc bài làm...</ParagraphBody>
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Main>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              position: "fixed",
              top: "64px"
            }
          }}
          variant='persistent'
          anchor='right'
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <Box className={classes.drawerBody}>
            <Box className={classes.drawerFieldContainer}>
              <TextTitle className={classes.drawerTextTitle}>Chuyển hướng câu hỏi</TextTitle>
              <Grid container spacing={1}>
                {questions.map((question, index) => (
                  <Grid item key={index}>
                    <Button
                      btnType={BtnType.Outlined}
                      onClick={() => {
                        navigate(`${routes.student.exam.take}?page=${index}`, {
                          replace: true
                        });
                      }}
                    >
                      <ParagraphBody>{index + 1}</ParagraphBody>
                    </Button>
                  </Grid>
                ))}
              </Grid>
              <Button btnType={BtnType.Text} onClick={() => {}} padding='10px 0'>
                <ParagraphBody>Kết thúc bài làm...</ParagraphBody>
              </Button>
            </Box>
          </Box>
        </Drawer>
      </Box>
    </Grid>
  );
}
