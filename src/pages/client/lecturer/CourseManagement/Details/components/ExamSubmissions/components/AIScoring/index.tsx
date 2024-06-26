import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Container, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import {
  GridCallbackDetails,
  GridColDef,
  GridPaginationModel,
  GridRowParams,
  GridRowSelectionModel
} from "@mui/x-data-grid";
import CustomDataGrid from "components/common/CustomDataGrid";
import Button, { BtnType } from "components/common/buttons/Button";
import Heading1 from "components/text/Heading1";
import ParagraphBody from "components/text/ParagraphBody";
import { useNavigate } from "react-router-dom";
import { routes } from "routes/routes";
import ExamSubmissionFeatureBar from "../FeatureBar";
import SubmissionBarChart from "../SubmissionChart";
import classes from "./styles.module.scss";
import qtype from "utils/constant/Qtype";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import MenuIcon from "@mui/icons-material/Menu";
import { CssBaseline, IconButton, Toolbar } from "@mui/material";
import Header from "components/Header";
import ParagraphSmall from "components/text/ParagraphSmall";
import useBoxDimensions from "hooks/useBoxDimensions";
import TextTitle from "components/text/TextTitle";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import {
  AssignmentStudent,
  IFeedbackGradedAI,
  QuestionEssay,
  gradingEssayByAI
} from "services/AIService/GradingEssayByAI";
import CircularProgress from "@mui/material/CircularProgress";
import SnackbarAlert, { AlertType } from "components/common/SnackbarAlert";
import { useEffect, useMemo, useRef, useState } from "react";
import { RootState } from "store";
import { useSelector } from "react-redux";
export enum SubmissionStatusSubmitted {
  SUBMITTED = "Đã nộp",
  NOT_SUBMITTED = "Chưa nộp"
}

export enum SubmissionStatusGraded {
  GRADED = "Đã chấm",
  NOT_GRADED = "Chưa chấm"
}

const AIScoring = () => {
  const drawerWidth = 450;

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

  const navigate = useNavigate();
  const totalSubmissionCount = 20;
  const totalStudent = 30;
  const visibleColumnList = { id: false, name: true, email: true, role: true, action: true };
  const dataGridToolbar = { enableToolbar: true };
  const rowSelectionHandler = (
    selectedRowId: GridRowSelectionModel,
    details: GridCallbackDetails<any>
  ) => {};
  const pageChangeHandler = (model: GridPaginationModel, details: GridCallbackDetails<any>) => {};

  const sidebarStatus = useSelector((state: RootState) => state.sidebarStatus);

  const page = 0;
  const pageSize = 5;
  const totalElement = 100;

  const [feedback, setFeedback] = useState<IFeedbackGradedAI[]>([]);

  const examData = {
    id: 1,
    max_grade: 10,
    questions: [
      {
        id: 1,
        question: "Câu hỏi 1",
        answer: "Đáp án 1",
        max_grade: 10,
        type: qtype.source_code,
        plagiarism_detection: {
          is_checked: true,
          result: {
            is_plagiarism: true,
            plagiarism_rate: 0.5
          }
        }
      }
    ]
  };

  const submissionList = [
    {
      id: 1,
      student_name: "Nguyễn Đinh Quang Khánh",
      student_email: "khanhndq2002@gmail.com",
      status: {
        submission_status_submitted: SubmissionStatusSubmitted.SUBMITTED,
        late_submission: {
          is_late: false,
          late_duration: "1 ngày 2 giờ"
        }
      },
      current_final_grade: feedback?.length !== 0 ? 5 : 0,

      feedback: feedback?.length !== 0 ? feedback[0]?.feedback : ""
    },
    {
      id: 2,
      student_name: "Nguyễn Quốc Tuấn",
      student_email: "tuannguyen@gmail.com",
      status: {
        submission_status_submitted: SubmissionStatusSubmitted.NOT_SUBMITTED,
        late_submission: {
          is_late: false,
          late_duration: "1 ngày 2 giờ"
        }
      },
      current_final_grade: feedback?.length !== 0 ? 5 : 0,
      feedback: feedback?.length !== 0 ? feedback[1]?.feedback : ""
    }
  ];

  const tableHeading: GridColDef[] = [
    { field: "student_name", headerName: "Tên sinh viên", width: 200 },
    { field: "student_email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 250,
      renderCell: (params) => {
        return (
          <Box padding='5px' width='100%'>
            <Box
              sx={{
                padding: "5px",
                backgroundColor:
                  params.value.submission_status_submitted === SubmissionStatusSubmitted.SUBMITTED
                    ? "var(--green-300)"
                    : "#f5f5f5",
                fontSize: "17px"
              }}
            >
              {params.value.submission_status_submitted === SubmissionStatusSubmitted.SUBMITTED
                ? "Đã nộp"
                : "Chưa nộp"}
            </Box>
            <Box
              sx={{
                padding: "5px",
                backgroundColor: "#EFCFCF",
                fontSize: "17px",
                display: params.value.late_submission.is_late ? "block" : "none"
              }}
            >
              {"Quá hạn "}
              {params.value.late_submission.late_duration}
            </Box>
            <Box
              sx={{
                padding: "5px",
                backgroundColor:
                  params.value.submission_status_submitted === SubmissionStatusSubmitted.SUBMITTED
                    ? "var(--green-300)"
                    : "#f5f5f5",
                fontSize: "17px",
                display:
                  params.value.grade_status === SubmissionStatusGraded.GRADED ? "block" : "none"
              }}
            >
              {params.value.grade_status === SubmissionStatusGraded.GRADED
                ? "Đã chấm"
                : "Chưa chấm"}
            </Box>
          </Box>
        );
      }
    },
    {
      field: "current_final_grade",
      headerName: "Điểm tổng kết",
      width: 200,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              padding: "10px 0"
            }}
          >
            <TextTitle>
              {params.value} / {examData.max_grade}
            </TextTitle>
          </Box>
        );
      }
    },
    {
      field: "feedback",
      headerName: "Phản hồi",
      width: 200,
      renderCell: (params) => {
        const feedbackTemp: string = params.value;
        if (!feedbackTemp) {
          return "";
        }

        const feedback = feedbackTemp;
        return (
          <Box
            sx={{
              padding: "10px 0"
            }}
          >
            <Box className={classes.textLimit}>
              <ParagraphBody>{feedback}</ParagraphBody>
            </Box>
          </Box>
        );
      }
    }
  ];

  const submissionDataset = [
    {
      student: 59,
      range: "0.00 - 5.00"
    },
    {
      student: 50,
      range: "5.00 - 6.00"
    },
    {
      student: 47,
      range: "6.00 - 7.00"
    },
    {
      student: 54,
      range: "7.00 - 8.00"
    },
    {
      student: 57,
      range: "8.00 - 9.00"
    },
    {
      student: 60,
      range: "9.00 - 10.00"
    },
    {
      student: 59,
      range: "10.00 - 11.00"
    },
    {
      student: 65,
      range: "11.00 - 12.00"
    },
    {
      student: 51,
      range: "12.00 - 13.00"
    },
    {
      student: 60,
      range: "13.00 - 14.00"
    },
    {
      student: 67,
      range: "14.00 - 15.00"
    },
    {
      student: 61,
      range: "15.00 - 16.00"
    }
  ];

  const rowClickHandler = (params: GridRowParams<any>) => {
    const url = routes.lecturer.exam.ai_scroring_detail;
    localStorage.setItem("feedback", JSON.stringify(params.row));
    localStorage.setItem("answer", JSON.stringify(data[params.row.id - 1]?.studentAnswer));
    localStorage.setItem("question", JSON.stringify(question));
    window.open("/frontend#" + url);
  };

  const [loading, setLoading] = useState(false);
  const [openSnackbarAlert, setOpenSnackbarAlert] = useState(false);
  const [alertContent, setAlertContent] = useState<string>("");
  const [alertType, setAlertType] = useState<AlertType>(AlertType.Success);
  const rubicData = {
    criteria: [
      {
        criteriaName: "Content",
        criteriaGrade: "80",
        criteriaDescription: "",
        scaleDescription: [
          {
            scaleDescription: "",
            scale0:
              "The essay is incomplete, inaccurate, illogical, and uses sources inappropriately"
          },
          {
            scaleDescription: "",
            scale1:
              "The essay is complete, accurate, but lacks logic, and uses sources somewhat appropriately"
          },
          {
            scaleDescription: "",
            scale2: "The essay is complete, accurate, and logical, and uses sources appropriately"
          },
          {
            scaleDescription: "",
            scale3:
              "The essay is complete, accurate, logical, creative, and uses sources appropriately"
          }
        ]
      },
      {
        criteriaName: "Form",
        criteriaGrade: "10",
        criteriaDescription: "",
        scaleDescription: [
          {
            scaleDescription: "",
            scale0:
              "The essay has many errors in grammar, spelling, or punctuation, uses limited vocabulary, and has an unclear layout."
          },
          {
            scaleDescription: "",
            scale1:
              "The essay has several errors in grammar, spelling, or punctuation, uses somewhat varied and rich vocabulary, and has a somewhat clear layout."
          },
          {
            scaleDescription: "",
            scale2:
              "The essay has few errors in grammar, spelling, or punctuation, uses varied, rich, and appropriate vocabulary, and has a relatively clear layout."
          },
          {
            scaleDescription: "",
            scale3:
              "The essay has no errors in grammar, spelling, or punctuation, and uses varied, rich, and appropriate vocabulary with a clear layout"
          }
        ]
      },
      {
        criteriaName: "Style",
        criteriaGrade: "10",
        criteriaDescription: "",
        scaleDescription: [
          {
            scaleDescription: "",
            scale0:
              "The essay is unclear, not engaging, and not appropriate for the topic, purpose, and audience."
          },
          {
            scaleDescription: "",
            scale1:
              "The essay is unclear, lacks engagement, and is somewhat appropriate for the topic, purpose, and audience."
          },
          {
            scaleDescription: "",
            scale2:
              "The essay is relatively clear, engaging, and appropriate for the topic, purpose, and audience."
          },
          {
            scaleDescription: "",
            scale3:
              "The essay is clear, engaging, and appropriate for the topic, purpose, and audience."
          }
        ]
      }
    ],
    name: "Rubic"
  };

  function formatAndDisplay(data: any) {
    let formattedData = "";
    data.criteria.forEach((criteria: any) => {
      const length = criteria.scaleDescription.length;
      formattedData += `- Criteria: ${criteria.criteriaName} (Total score: ${criteria.criteriaGrade}%)\n`;
      criteria.scaleDescription.forEach((scale: any, index: any) => {
        formattedData += `  * Score ${index + 1}/${length}: ${scale[`scale${index}`]}\n`;
      });
    });
    return formattedData;
  }
  const question: QuestionEssay = useMemo(
    () => ({
      content: "Cách Chuyển Tất Cả Các Số Không Của Mảng Về Cuối",
      answer: `
			Di chuyển tất cả các số không trong một mảng số nguyên đến cuối. Câu trả lời nên tránh sử dụng không gian không đổi và bảo toàn thứ tự tương đối của các thành phần của mảng.

			Đầu vào: {1,2,3,0,8,0,4,7}

			Đầu ra sẽ là {1,2,3,8,4,7,0,0}

			Đặt phần tử ở vị trí có sẵn sau đây trong mảng nếu phần tử hiện tại không phải là số không. Điền vào tất cả các chỉ số còn lại bằng 0 khi tất cả các mục của mảng đã được xử lý.

			Giải pháp trước có độ phức tạp thời gian O (n), trong đó n là kích thước của đầu vào.
			`,
      rubics: formatAndDisplay(rubicData),
      maxScore: 10
    }),
    []
  );

  const data: AssignmentStudent[] = useMemo(
    () => [
      {
        id: 1,
        studentAnswer: "Mảng động là con trỏ"
      },
      {
        id: 2,
        studentAnswer: `
				Đầu vào: {1,2,3,0,8,0,4,7}

				Đầu ra sẽ là {1,2,3,8,4,7,0,0}
				
				Đặt phần tử ở vị trí có sẵn sau đây trong mảng nếu phần tử hiện tại không phải là số không. Điền vào tất cả các chỉ số còn lại bằng 0 khi tất cả các mục của mảng đã được xử lý.				
				`
      }
    ],
    []
  );

  const handleGradingEssayByAI = async () => {
    await gradingEssayByAI(data, question)
      .then((results) => {
        if (results) {
          setFeedback(results);
          setOpenSnackbarAlert(true);
          setAlertContent("Chấm điểm thành công");
          setAlertType(AlertType.Success);
        } else {
          throw new Error("Internal server error");
        }
      })
      .catch((err) => {
        console.error("Error generating content:", err);
        setOpenSnackbarAlert(true);
        setAlertContent("Chấm điểm thất bại, hãy thử lại lần nữa");
        setAlertType(AlertType.Error);
      })
      .finally(() => {});
  };

  return (
    <>
      {loading === true ? (
        <Box className={classes.loading}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid className={classes.root}>
          <Header />
          <Box
            className={classes.container}
            sx={{
              marginTop: `${sidebarStatus.headerHeight + 80}px`
            }}
          >
            <CssBaseline />
            <AppBar
              position='fixed'
              sx={{
                // margin top to avoid appbar overlap with content
                marginTop: "64px",
                backgroundColor: "white"
              }}
              open={false}
            >
              <Toolbar>
                <Box id={classes.breadcumpWrapper}>
                  <ParagraphSmall
                    colorname='--blue-500'
                    className={classes.cursorPointer}
                    onClick={() => navigate(routes.lecturer.course.management)}
                  >
                    Quản lý khoá học
                  </ParagraphSmall>
                  <KeyboardDoubleArrowRightIcon id={classes.icArrow} />
                  <ParagraphSmall
                    colorname='--blue-500'
                    className={classes.cursorPointer}
                    onClick={() => navigate(routes.lecturer.course.information)}
                  >
                    CS202 - Nhập môn lập trình
                  </ParagraphSmall>
                  <KeyboardDoubleArrowRightIcon id={classes.icArrow} />
                  <ParagraphSmall
                    colorname='--blue-500'
                    className={classes.cursorPointer}
                    onClick={() => navigate(routes.lecturer.course.assignment)}
                  >
                    Danh sách bài tập
                  </ParagraphSmall>
                  <KeyboardDoubleArrowRightIcon id={classes.icArrow} />
                  <ParagraphSmall
                    colorname='--blue-500'
                    className={classes.cursorPointer}
                    onClick={() => navigate(routes.lecturer.exam.detail)}
                  >
                    Bài kiểm tra cuối kỳ
                  </ParagraphSmall>
                  <KeyboardDoubleArrowRightIcon id={classes.icArrow} />
                  <ParagraphSmall
                    colorname='--blue-500'
                    className={classes.cursorPointer}
                    onClick={() => navigate(routes.lecturer.exam.submissions)}
                  >
                    Danh sách bài nộp
                  </ParagraphSmall>
                  <KeyboardDoubleArrowRightIcon id={classes.icArrow} />
                  <ParagraphSmall colorname='--blue-500'>Chấm điểm AI</ParagraphSmall>
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
          </Box>
          <Container className={classes.examBody}>
            <Button
              btnType={BtnType.Primary}
              onClick={() => {
                navigate(routes.lecturer.exam.detail);
              }}
              startIcon={
                <ChevronLeftIcon
                  sx={{
                    color: "white"
                  }}
                />
              }
              width='fit-content'
              className={classes.backButton}
            >
              <ParagraphBody>Quay lại</ParagraphBody>
            </Button>
            <Heading1>Bài kiểm tra cuối kỳ</Heading1>
            <ParagraphBody>
              Số sinh viên nộp: {totalSubmissionCount}/{totalStudent}
            </ParagraphBody>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <SubmissionBarChart
                dataset={submissionDataset}
                xAxis={[{ scaleType: "band", dataKey: "range" }]}
                width={1000}
                height={500}
              />
            </Box>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Heading1>Danh sách bài làm</Heading1>
              </Grid>
              <Grid item xs={12}>
                <ExamSubmissionFeatureBar />
              </Grid>
              <Button btnType={BtnType.Primary} onClick={handleGradingEssayByAI}>
                Grading
              </Button>
              <Grid item xs={12}>
                <CustomDataGrid
                  dataList={submissionList}
                  tableHeader={tableHeading}
                  onSelectData={rowSelectionHandler}
                  visibleColumn={visibleColumnList}
                  dataGridToolBar={dataGridToolbar}
                  page={page}
                  pageSize={pageSize}
                  totalElement={totalElement}
                  onPaginationModelChange={pageChangeHandler}
                  showVerticalCellBorder={true}
                  getRowHeight={() => "auto"}
                  onClickRow={rowClickHandler}
                />
              </Grid>
            </Grid>
          </Container>
          <SnackbarAlert
            open={openSnackbarAlert}
            setOpen={setOpenSnackbarAlert}
            type={alertType}
            content={alertContent}
          />
        </Grid>
      )}
    </>
  );
};

export default AIScoring;
