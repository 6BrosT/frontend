import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import MenuIcon from "@mui/icons-material/Menu";
import PreviewIcon from "@mui/icons-material/Preview";
import {
  Box,
  Card,
  Checkbox,
  CssBaseline,
  Divider,
  Drawer,
  FormControlLabel,
  Grid,
  IconButton,
  Toolbar
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import { GridActionsCellItem } from "@mui/x-data-grid/components/cell/GridActionsCellItem";
import { GridColDef } from "@mui/x-data-grid/models/colDef";
import { GridPaginationModel } from "@mui/x-data-grid/models/gridPaginationProps";
import Header from "components/Header";
import CustomDataGrid from "components/common/CustomDataGrid";
import { BtnType } from "components/common/buttons/Button";
import LoadButton from "components/common/buttons/LoadingButton";
import CustomDateTimePicker from "components/common/datetime/CustomDateTimePicker";
import InputTextField from "components/common/inputs/InputTextField";
import MenuPopup from "components/common/menu/MenuPopup";
import BasicSelect from "components/common/select/BasicSelect";
import PreviewEssay from "components/dialog/preview/PreviewEssay";
import PreviewMultipleChoice from "components/dialog/preview/PreviewMultipleChoice";
import PreviewShortAnswer from "components/dialog/preview/PreviewShortAnswer";
import PreviewTrueFalse from "components/dialog/preview/PreviewTrueFalse";
import TextEditor from "components/editor/TextEditor";
import Heading1 from "components/text/Heading1";
import ParagraphSmall from "components/text/ParagraphSmall";
import TextTitle from "components/text/TextTitle";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "routes/routes";
import useWindowDimensions from "hooks/useWindowDimensions";
import QuestionsFeatureBar from "./components/FeatureBar";
import PickQuestionFromQuestionBankDialog from "./components/PickQuestionFromQuestionBankDialog";
import PickQuestionTypeToAddDialog from "./components/PickQuestionTypeToAddDialog";
import classes from "./styles.module.scss";
import { GridRowParams } from "@mui/x-data-grid";
import useBoxDimensions from "hooks/useBoxDimensions";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { ExamCreateRequest, ExamEntity } from "models/courseService/entity/ExamEntity";
import { ExamService } from "services/courseService/ExamService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import {
  QuestionClone,
  QuestionCloneRequest,
  QuestionEntity
} from "models/coreService/entity/QuestionEntity";
import moment, { Moment } from "moment";
import {
  clearExamCreate,
  clearQuestionCreate,
  setExamDescriptionCreate,
  setExamNameCreate,
  setMaxAttemptCreate,
  setMaxScoreCreate,
  setOverdueHandlingCreate,
  setQuestionCreate,
  setQuestionCreateFromBank,
  setTimeCloseCreate,
  setTimeLimitCreate,
  setTimeOpenCreate
} from "reduxes/coreService/questionCreate";
import { QuestionTypeEnum } from "models/coreService/enum/QuestionTypeEnum";
import { setCategories } from "reduxes/courseService/questionBankCategory";
import { QuestionBankCategoryService } from "services/courseService/QuestionBankCategoryService";
import { QuestionService } from "services/coreService/QuestionService";
import { OrganizationEntity } from "models/coreService/entity/OrganizationEntity";
import { AnswerOfQuestion } from "models/coreService/entity/AnswerOfQuestionEntity";
import { UserEntity } from "models/coreService/entity/UserEntity";
import { QuestionDifficultyEnum } from "models/coreService/enum/QuestionDifficultyEnum";
import { useEffect, useState } from "react";
import { setExamDetail } from "reduxes/courseService/exam";
import { di } from "@fullcalendar/core/internal-common";
import qtype from "utils/constant/Qtype";

const drawerWidth = 400;

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

export const OVERDUE_HANDLING = {
  AUTOSUBMIT: "autosubmit",
  GRACEPERIOD: "graceperiod",
  AUTOABANDON: "autoabandon"
};

export default function ExamEdit() {
  const { courseId } = useParams();
  const { examId } = useParams<{ examId: string }>();
  const questionCreate = useSelector((state: RootState) => state.questionCreate);
  const questionBankCategoriesState = useSelector((state: RootState) => state.questionBankCategory);
  const dispatch = useDispatch();
  const submitHandler = () => {
    const questionIds = questionCreate.questionCreate.map((item) => ({
      questionId: item.id,
      page: 0
    }));

    const timeLimit = (() => {
      switch (examTimeLimitUnit) {
        case "weeks":
          return questionCreate.timeLimit * 604800;
        case "days":
          return questionCreate.timeLimit * 86400;
        case "hours":
          return questionCreate.timeLimit * 3600;
        case "minutes":
          return questionCreate.timeLimit * 60;
        case "seconds":
          return questionCreate.timeLimit;
        default:
          return 0;
      }
    })();

    const newExam: ExamCreateRequest = {
      courseId: courseId ?? "",
      name: questionCreate.examName,
      intro: questionCreate.examDescription,
      score: questionCreate.maxScore,
      maxScore: questionCreate.maxScore,
      timeOpen: new Date(questionCreate.timeOpen),
      timeClose: new Date(questionCreate.timeClose),
      timeLimit: timeLimit,
      overdueHandling: questionCreate.overdueHandling.toUpperCase(),
      canRedoQuestions: true,
      maxAttempts: questionCreate.maxAttempt,
      shuffleQuestions: questionCreate.shuffleQuestions,
      gradeMethod: "QUIZ_GRADEHIGHEST",
      questionIds: questionIds
    };
    ExamService.editExam(examId ?? "", newExam)
      .then((response) => {
        console.log(response);
        dispatch(clearQuestionCreate());
        dispatch(clearExamCreate());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const [exam, setExam] = useState<ExamEntity>({
  //   id: "",
  //   courseId: "",
  //   name: "",
  //   scores: 0,
  //   maxScores: 0,
  //   timeOpen: new Date(),
  //   timeClose: new Date(),
  //   timeLimit: 0,
  //   intro: "",
  //   overdueHanding: "",
  //   canRedoQuestions: false,
  //   maxAttempts: 0,
  //   shuffleAnswers: false,
  //   gradeMethod: "",
  //   createdAt: new Date(),
  //   updatedAt: new Date()
  // });

  const handleGetExamById = async (id: string) => {
    try {
      const response = await ExamService.getExamById(id);
      // setExam(response);
      // dispatch(setExamDetail(response));
      dispatch(setExamNameCreate(response.name));
      dispatch(setExamDescriptionCreate(response.intro));
      dispatch(setMaxScoreCreate(response.maxScores));
      dispatch(setTimeOpenCreate(response.timeOpen));
      dispatch(setTimeCloseCreate(response.timeClose));
      dispatch(setTimeLimitCreate(response.timeLimit));
      dispatch(setMaxAttemptCreate(response.maxAttempts));
      dispatch(setOverdueHandlingCreate(response.overdueHanding));
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetExamQuestionById = async (id: string) => {
    try {
      const response = await ExamService.getExamQuestionById(id, null);
      dispatch(setQuestionCreateFromBank(response.questions));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ExamService.getExamById(examId ?? "").then((result) => {
      dispatch(setExamNameCreate(result.name));
      dispatch(setExamDescriptionCreate(result.intro));
      dispatch(setMaxScoreCreate(result.maxScores));
      dispatch(setTimeOpenCreate(result.timeOpen));
      dispatch(setTimeCloseCreate(result.timeClose));
      dispatch(setTimeLimitCreate(result.timeLimit));
      dispatch(setMaxAttemptCreate(result.maxAttempts));
      dispatch(setOverdueHandlingCreate(result.overdueHanding));
    });

    ExamService.getExamQuestionById(examId ?? "", null).then((result) => {
      dispatch(setQuestionCreateFromBank(result.questions));
    });
  }, []);

  const handleGetQuestionBankCategories = async ({
    search = "",
    pageNo = 0,
    pageSize = 99
  }: {
    search?: string;
    pageNo?: number;
    pageSize?: number;
  }) => {
    try {
      const getQuestionBankCategoryResponse =
        await QuestionBankCategoryService.getQuestionBankCategories({
          search,
          pageNo,
          pageSize
        });
      dispatch(setCategories(getQuestionBankCategoryResponse));
    } catch (error) {
      console.log(error);
    }
  };

  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [examTimeLimitUnit, setExamTimeLimitUnit] = React.useState("seconds");
  const [examTimeLimitEnabled, setExamTimeLimitEnabled] = React.useState(true);
  const [isAddNewQuestionDialogOpen, setIsAddNewQuestionDialogOpen] = React.useState(false);
  const [isAddQuestionFromBankDialogOpen, setIsAddQuestionFromBankDialogOpen] =
    React.useState(false);
  const [questionType, setQuestionType] = React.useState("essay");
  const [loading, setLoading] = React.useState(false);
  const [assignmentAvailability, setAssignmentAvailability] = React.useState("0");
  const [openPreviewMultipleChoiceDialog, setOpenPreviewMultipleChoiceDialog] =
    React.useState(false);
  const [openPreviewEssay, setOpenPreviewEssay] = React.useState(false);
  const [openPreviewShortAnswer, setOpenPreviewShortAnswer] = React.useState(false);
  const [questionPreview, setQuestionPreview] = React.useState<QuestionEntity>();
  const [openPreviewTrueFalse, setOpenPreviewTrueFalse] = React.useState(false);
  const [previewQuestionId, setPreviewQuestionId] = React.useState<string>("");

  const tableHeading: GridColDef[] = React.useMemo(
    () => [
      { field: "id", headerName: "STT", minWidth: 1 },
      {
        field: "name",
        headerName: t("exam_management_create_question_name"),
        flex: 0.7,
        minWidth: 150
        // renderCell: (params) => <Link href={`${params.row.id}`}>{params.value}</Link> nhớ đổi sang router link
      },
      {
        field: "questionText",
        headerName: t("exam_management_create_question_description"),
        renderCell: (params) => <div dangerouslySetInnerHTML={{ __html: params.value }}></div>,
        flex: 2,
        minWidth: 300
      },
      {
        field: "defaultMark",
        headerName: t("assignment_management_max_score"),
        minWidth: 50
        // renderCell: (params) => (
        //   <InputTextField
        //     type='number'
        //     value={params.value}
        //     onChange={(e) => console.log(e.target.value)}
        //     placeholder={t("exam_management_create_enter_score")}
        //     translation-key='exam_management_create_enter_score'
        //     backgroundColor='white'
        //   />
        // )
      },
      {
        field: "qtypeText",
        headerName: t("exam_management_create_question_type"),
        flex: 2,
        minWidth: 150
        // renderCell: (params) => <ParagraphBody>{params.value.label}</ParagraphBody>
      },
      {
        field: "action",
        headerName: t("common_action"),
        type: "actions",
        flex: 2,
        minWidth: 150,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<EditIcon />}
            label='Edit'
            onClick={() => {
              let navigateString = "";

              if (params.row.qtype === qtype.essay.code) {
                navigateString = routes.lecturer.exam.edit_essay_question;
              } else if (params.row.qtype === qtype.multiple_choice.code) {
                navigateString = routes.lecturer.exam.edit_multi_question;
              } else if (params.row.qtype === qtype.short_answer.code) {
                navigateString = routes.lecturer.exam.edit_short_question;
              } else if (params.row.qtype === qtype.true_false.code) {
                navigateString = routes.lecturer.exam.edit_true_false_question;
              } else if (params.row.qtype === qtype.source_code.code) {
                navigateString = routes.lecturer.exam.edit_code_question;
              }

              navigate(
                `${navigateString
                  .replace(":courseId", courseId ?? "")
                  .replace(":examId", examId ?? "")
                  .replace(":questionId", params.row.id ?? "")}`
              );
            }}
          />,
          <GridActionsCellItem
            onClick={() => {
              setPreviewQuestionId(params.row.id);
              switch (params.row.qtype) {
                case qtype.multiple_choice.code:
                  setOpenPreviewMultipleChoiceDialog(!openPreviewMultipleChoiceDialog);
                  break;
                case qtype.essay.code:
                  setOpenPreviewEssay(!openPreviewEssay);
                  break;
                case qtype.short_answer.code:
                  setQuestionPreview(params.row);
                  setOpenPreviewShortAnswer(!openPreviewShortAnswer);
                  break;
                case qtype.true_false.code:
                  setOpenPreviewTrueFalse(!openPreviewTrueFalse);
                  break;
                case qtype.source_code.code:
                  // setOpenPreviewCodeQuestion(!openPreviewCodeQuestion);
                  break;
              }
            }}
            icon={<PreviewIcon />}
            label='Preview'
          />,
          <GridActionsCellItem icon={<DeleteIcon />} label='Delete' />
        ]
      }
    ],
    [
      openPreviewEssay,
      openPreviewMultipleChoiceDialog,
      openPreviewShortAnswer,
      openPreviewTrueFalse,
      t
    ]
  );
  const visibleColumnList = { id: false, name: true, email: true, role: true, action: true };
  const dataGridToolbar = { enableToolbar: true };
  const rowSelectionHandler = () => {};
  const pageChangeHandler = (model: GridPaginationModel) => {
    console.log(model);
  };

  const rowClickHandler = (params: GridRowParams<any>) => {
    console.log(params);
  };

  function handleClick() {
    setLoading(true);
    submitHandler();
    navigate(routes.lecturer.course.assignment.replace(":courseId", courseId ?? ""));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenAddNewQuestionDialog = () => {
    setIsAddNewQuestionDialogOpen(true);
  };

  const handleCloseAddNewQuestionDialog = () => {
    setIsAddNewQuestionDialogOpen(false);
  };

  const handleOpenAddQuestionFromBankDialog = () => {
    handleGetQuestionBankCategories({});
    setIsAddQuestionFromBankDialogOpen(true);
  };

  const handleCloseAddQuestionFromBankDialog = () => {
    setIsAddQuestionFromBankDialogOpen(false);
  };

  const handleComfirmQuestionFromBankDialog = async (questionIds: QuestionClone[]) => {
    const questions: QuestionCloneRequest = {
      questions: questionIds
    };
    const response = await QuestionService.cloneQuestionByIdIn(questions);

    const questionCreate: QuestionEntity[] = response.questions.map(
      (item: {
        id: string;
        organization: OrganizationEntity;
        difficulty: QuestionDifficultyEnum;
        name: string;
        questionText: string;
        generalFeedback: string;
        defaultMark: number;
        pass?: boolean;
        createdBy: UserEntity;
        updatedBy: UserEntity;
        qtype: QuestionTypeEnum;
        answers: AnswerOfQuestion[];
        createdAt: Date;
        updatedAt: Date;
      }) => ({
        id: item.id,
        organization: item.organization,
        difficulty: item.difficulty,
        name: item.name,
        questionText: item.questionText,
        generalFeedback: item.generalFeedback,
        defaultMark: item.defaultMark,
        createdBy: item.createdBy,
        updatedBy: item.updatedBy,
        qtype: item.qtype,
        answers: item.answers,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      })
    );

    console.log(questionCreate);
    dispatch(setQuestionCreateFromBank(questionCreate));

    handleCloseAddQuestionFromBankDialog();
  };

  const onCreateNewQuestion = async (popupState: any) => {
    handleOpenAddNewQuestionDialog();
    popupState.close();
  };

  const onAddQuestionFromBank = async (popupState: any) => {
    handleOpenAddQuestionFromBankDialog();
    popupState.close();
  };

  const handleChangeQuestionType = (value: string) => {
    setQuestionType(value);
  };

  const onClickConfirmAddNewQuestion = () => {
    switch (questionType) {
      case "essay":
        navigate(routes.lecturer.question.essay.create, { state: { courseId: courseId } });
        break;
      case "multiple-choice":
        navigate(routes.lecturer.question.multiple_choice.create, {
          state: { courseId: courseId }
        });
        break;
      case "short-answer":
        navigate(routes.lecturer.question.short_answer.create, { state: { courseId: courseId } });
        break;
      case "true-false":
        navigate(routes.lecturer.question.true_false.create, { state: { courseId: courseId } });
        break;
      default:
        break;
    }
    handleCloseAddNewQuestionDialog();
  };

  // Auto close drawer when screen width < 1080 and open drawer when screen width > 1080
  React.useEffect(() => {
    if (width < 1080) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [width]);

  const sidebarStatus = useSelector((state: RootState) => state.sidebarStatus);

  const header2Ref = React.useRef<HTMLDivElement>(null);
  const { height: header2Height } = useBoxDimensions({
    ref: header2Ref
  });

  return (
    <>
      <PickQuestionTypeToAddDialog
        open={isAddNewQuestionDialogOpen}
        handleClose={handleCloseAddNewQuestionDialog}
        title={t("exam_management_create_new_question")}
        cancelText={t("common_cancel")}
        confirmText={t("common_add")}
        onHanldeConfirm={onClickConfirmAddNewQuestion}
        onHandleCancel={handleCloseAddNewQuestionDialog}
        questionType={questionType}
        handleChangeQuestionType={handleChangeQuestionType}
        translation-key={["exam_management_create_new_question", "common_cancel", "common_add"]}
      />
      {openPreviewMultipleChoiceDialog && (
        <PreviewMultipleChoice
          open={openPreviewMultipleChoiceDialog}
          setOpen={setOpenPreviewMultipleChoiceDialog}
          aria-labelledby={"customized-dialog-title1"}
          maxWidth='md'
          fullWidth
        />
      )}
      {openPreviewEssay && (
        <PreviewEssay
          open={openPreviewEssay}
          setOpen={setOpenPreviewEssay}
          aria-labelledby={"customized-dialog-title2"}
          maxWidth='md'
          fullWidth
        />
      )}
      {openPreviewShortAnswer && (
        <PreviewShortAnswer
          open={openPreviewShortAnswer}
          questionId={previewQuestionId}
          setOpen={setOpenPreviewShortAnswer}
          aria-labelledby={"customized-dialog-title3"}
          maxWidth='md'
          fullWidth
        />
      )}
      {openPreviewTrueFalse && (
        <PreviewTrueFalse
          open={openPreviewTrueFalse}
          setOpen={setOpenPreviewTrueFalse}
          aria-labelledby={"customized-dialog-title4"}
          maxWidth='md'
          fullWidth
        />
      )}

      <PickQuestionFromQuestionBankDialog
        open={isAddQuestionFromBankDialogOpen}
        handleClose={handleCloseAddQuestionFromBankDialog}
        title={t("exam_management_create_from_bank")}
        cancelText={t("common_cancel")}
        confirmText={t("common_add")}
        onHanldeConfirm={handleComfirmQuestionFromBankDialog}
        onHandleCancel={handleCloseAddQuestionFromBankDialog}
        categoryPickTitle={t("exam_management_create_from_bank_choose_topic")}
        categoryList={questionBankCategoriesState.categories.questionBankCategories.map(
          (item, index) => ({
            value: item.id,
            label: item.name
          })
        )}
        translation-key={[
          "exam_management_create_from_bank",
          "common_cancel",
          "common_add",
          "exam_management_create_from_bank_choose_topic"
        ]}
      />
      <Grid className={classes.root}>
        <Header />
        <Box
          className={classes.container}
          sx={{
            marginTop: `${sidebarStatus.headerHeight}px`
          }}
        >
          <CssBaseline />
          <AppBar
            position='fixed'
            sx={{
              top: `${sidebarStatus.headerHeight + 1}px`,
              backgroundColor: "white",
              boxShadow: "0px 2px 4px #00000026"
            }}
            ref={header2Ref}
            open={open}
          >
            <Toolbar>
              <Box id={classes.breadcumpWrapper}>
                <ParagraphSmall
                  colorname='--blue-500'
                  className={classes.cursorPointer}
                  onClick={() => navigate(routes.lecturer.course.management)}
                  translation-key='common_course_management'
                >
                  {t("common_course_management")}
                </ParagraphSmall>
                <KeyboardDoubleArrowRightIcon id={classes.icArrow} />
                {/* <ParagraphSmall
                  colorname='--blue-500'
                  className={classes.cursorPointer}
                  onClick={() => navigate(routes.lecturer.course.information)}
                >
                  CS202 - Nhập môn lập trình
                </ParagraphSmall> */}
                {/* <KeyboardDoubleArrowRightIcon id={classes.icArrow} /> */}
                <ParagraphSmall
                  colorname='--blue-500'
                  className={classes.cursorPointer}
                  onClick={() =>
                    navigate(routes.lecturer.course.assignment.replace(":courseId", courseId ?? ""))
                  }
                  translation-key='course_detail_assignment_list'
                >
                  {t("course_detail_assignment_list")}
                </ParagraphSmall>
                <KeyboardDoubleArrowRightIcon id={classes.icArrow} />
                <ParagraphSmall
                  colorname='--blue-500'
                  translation-key='course_lecturer_assignment_create_exam'
                >
                  {t("course_lecturer_assignment_create_exam")}
                </ParagraphSmall>
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
          <Main
            open={open}
            className={classes.mainContent}
            sx={{
              height: `calc(100% - ${header2Height}px)`,
              marginTop: `${header2Height}px`
            }}
          >
            <Card>
              <Box component='form' className={classes.formBody} autoComplete='off'>
                <Heading1 fontWeight={"500"} translation-key='course_lecturer_assignment_edit_exam'>
                  {t("course_lecturer_assignment_edit_exam")}
                </Heading1>
                <InputTextField
                  type='text'
                  title={t("common_exam_name")}
                  value={questionCreate.examName}
                  onChange={(e) => {
                    // setExamName(e.target.value);
                    dispatch(setExamNameCreate(e.target.value));
                  }}
                  placeholder={t("exam_management_create_enter_exam_name")}
                  backgroundColor='white'
                  translation-key={["common_exam_name", "exam_management_create_enter_exam_name"]}
                />
                <Grid container spacing={1} columns={12}>
                  <Grid item xs={3}>
                    <TextTitle translation-key='common_exam_description'>
                      {t("common_exam_description")}
                    </TextTitle>
                  </Grid>
                  <Grid item xs={9} className={classes.textEditor}>
                    <TextEditor
                      value={questionCreate.examDescription}
                      onChange={(value) => {
                        // setExamDescription(value);
                        dispatch(setExamDescriptionCreate(value));
                      }}
                    />
                  </Grid>
                </Grid>
                <MenuPopup
                  style={{
                    marginTop: "20px"
                  }}
                  popupId='add-question-popup'
                  triggerButtonText={t("common_add_question")}
                  triggerButtonProps={{
                    width: "150px"
                  }}
                  btnType={BtnType.Outlined}
                  menuItems={[
                    {
                      label: t("exam_management_create_new_question"),
                      onClick: onCreateNewQuestion
                    },
                    {
                      label: t("exam_management_create_from_bank"),
                      onClick: onAddQuestionFromBank
                    }
                  ]}
                  translation-key={[
                    "common_add_question",
                    "exam_management_create_new_question",
                    "exam_management_create_from_bank"
                  ]}
                />
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Heading1
                      fontWeight={"500"}
                      translation-key='exam_management_create_question_list'
                    >
                      {t("exam_management_create_question_list")}
                    </Heading1>
                  </Grid>
                  <Grid item xs={12}>
                    <QuestionsFeatureBar
                      // colSearchLabel='Tìm kiếm theo cột'
                      shuffleQuestionsLabel={t("exam_management_create_question_scramble")}
                      // colItems={[
                      //   { label: "Tên câu hỏi", value: "name" },
                      //   { label: "Kiểu", value: "type" }
                      // ]}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomDataGrid
                      dataList={questionCreate.questionCreate
                        .filter((item) =>
                          item.name
                            .toLowerCase()
                            .includes(questionCreate.searchQuestion.toLowerCase())
                        )
                        .map((item, index) => ({
                          stt: item.id,
                          qtypeText:
                            item.qtype === QuestionTypeEnum.SHORT_ANSWER
                              ? "câu hỏi ngắn"
                              : item.qtype === QuestionTypeEnum.MULTIPLE_CHOICE
                                ? "câu hỏi trắc nghiệm"
                                : item.qtype === QuestionTypeEnum.ESSAY
                                  ? "câu hỏi tự luận"
                                  : item.qtype === QuestionTypeEnum.TRUE_FALSE
                                    ? "câu hỏi đúng/sai"
                                    : item.qtype === QuestionTypeEnum.CODE
                                      ? "câu hỏi code"
                                      : "",
                          ...item
                        }))}
                      tableHeader={tableHeading}
                      onSelectData={rowSelectionHandler}
                      visibleColumn={visibleColumnList}
                      dataGridToolBar={dataGridToolbar}
                      page={1}
                      pageSize={5}
                      totalElement={questionCreate.questionCreate.length}
                      onPaginationModelChange={pageChangeHandler}
                      showVerticalCellBorder={false}
                      onClickRow={rowClickHandler}
                    />
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
                height: `calc(100% - ${sidebarStatus.headerHeight + 1}px)`,
                top: `${sidebarStatus.headerHeight + 1}px`
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
                <TextTitle translation-key='assignment_management_max_score'>
                  {t("assignment_management_max_score")}
                </TextTitle>
                <InputTextField
                  type='number'
                  value={questionCreate.maxScore}
                  onChange={(e) => {
                    // setExamMaximumGrade(parseInt(e.target.value));
                    dispatch(setMaxScoreCreate(parseInt(e.target.value)));
                  }}
                  placeholder={t("exam_management_create_enter_score")}
                  backgroundColor='#D9E2ED'
                  translation-key='exam_management_create_enter_score'
                />
              </Box>
              <Box className={classes.drawerFieldContainer}>
                <TextTitle
                  className={classes.drawerTextTitle}
                  translation-key={["course_assignment_detail_open_time", "course_detail_exam"]}
                >
                  {`${t("course_detail_exam")} ${i18next.format(t("course_assignment_detail_open_time"), "lowercase")}`}
                </TextTitle>
                <CustomDateTimePicker
                  value={moment(questionCreate.timeOpen)}
                  onHandleValueChange={(newValue) => {
                    // setExamOpenTime(newValue);
                    dispatch(
                      setTimeOpenCreate(
                        newValue?.toDate().toISOString() ?? new Date().toISOString()
                      )
                    );
                  }}
                  backgroundColor='#D9E2ED'
                />
              </Box>
              <Box className={classes.drawerFieldContainer}>
                <TextTitle
                  className={classes.drawerTextTitle}
                  translation-key={["course_assignment_detail_close_time", "course_detail_exam"]}
                >
                  {`${t("course_detail_exam")} ${i18next.format(t("course_assignment_detail_close_time"), "lowercase")}`}
                </TextTitle>
                <CustomDateTimePicker
                  value={moment(questionCreate.timeClose)}
                  onHandleValueChange={(newValue) => {
                    // setExamCloseTime(newValue);
                    dispatch(
                      setTimeCloseCreate(
                        newValue?.toDate().toISOString() ?? new Date().toISOString()
                      )
                    );
                  }}
                  backgroundColor='#D9E2ED'
                />
              </Box>
              <Box className={classes.drawerFieldContainer}>
                <TextTitle translation-key='common_do_time'>{t("common_do_time")}</TextTitle>
                <Grid container spacing={1} gap={1} columns={12}>
                  <Grid item xs={4}>
                    <InputTextField
                      type='number'
                      value={questionCreate.timeLimit}
                      onChange={(e) => {
                        dispatch(setTimeLimitCreate(parseInt(e.target.value)));
                      }}
                      placeholder={t("common_enter_quan")}
                      disabled={!examTimeLimitEnabled}
                      backgroundColor='#D9E2ED'
                      translation-key='common_enter_quan'
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <BasicSelect
                      labelId='select-exam-time-limit-unit-label'
                      value={examTimeLimitUnit}
                      onHandleChange={(value) => setExamTimeLimitUnit(value)}
                      style={{ marginTop: "8px" }}
                      items={[
                        {
                          value: "weeks",
                          label: t("contest_detail_feature_week")
                        },
                        {
                          value: "days",
                          label: t("contest_detail_feature_day")
                        },
                        {
                          value: "hours",
                          label: t("contest_detail_feature_hour")
                        },
                        {
                          value: "minutes",
                          label: t("contest_detail_feature_minute")
                        },
                        {
                          value: "seconds",
                          label: t("contest_detail_feature_second")
                        }
                      ]}
                      disabled={!examTimeLimitEnabled}
                      backgroundColor='#D9E2ED'
                      translation-key={[
                        "contest_detail_feature_week",
                        "contest_detail_feature_day",
                        "contest_detail_feature_hour",
                        "contest_detail_feature_minute",
                        "contest_detail_feature_second"
                      ]}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControlLabel
                      style={{ marginTop: "7px" }}
                      control={
                        <Checkbox
                          checked={examTimeLimitEnabled}
                          onChange={(e) => setExamTimeLimitEnabled(e.target.checked)}
                        />
                      }
                      label={t("common_turn_on")}
                      translation-key='common_turn_on'
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box className={classes.drawerFieldContainer}>
                <TextTitle
                  className={classes.drawerTextTitle}
                  translation-key='exam_management_create_when_time_end'
                >
                  {t("exam_management_create_when_time_end")}
                </TextTitle>
                <BasicSelect
                  labelId='select-assignment-overdue-handling-label'
                  value={questionCreate.overdueHandling}
                  onHandleChange={(value) => {
                    // setOverdueHandling(value);
                    dispatch(setOverdueHandlingCreate(value));
                  }}
                  items={[
                    {
                      // value: OVERDUE_HANDLING.AUTOSUBMIT,
                      value: "AUTOSUBMIT",
                      label: t("exam_management_create_when_time_end_auto")
                    },
                    // {
                    //   value: OVERDUE_HANDLING.GRACEPERIOD,
                    //   label: t("exam_management_create_when_time_end_spare")
                    // },
                    {
                      // value: OVERDUE_HANDLING.AUTOABANDON,
                      value: "AUTOABANDON",
                      label: t("exam_management_create_when_time_end_delete")
                    }
                  ]}
                  backgroundColor='#D9E2ED'
                  translation-key={[
                    "exam_management_create_when_time_end",
                    "exam_management_create_when_time_end_delete",
                    "exam_management_create_when_time_end_spare"
                  ]}
                />
              </Box>
              <Box className={classes.drawerFieldContainer}>
                <TextTitle
                  className={classes.drawerTextTitle}
                  translation-key='exam_management_create_retry_num'
                >
                  {t("exam_management_create_retry_num")}
                </TextTitle>
                <BasicSelect
                  labelId='select-assignment-max-attempts-label'
                  value={questionCreate.maxAttempt.toString()}
                  onHandleChange={(value) => {
                    dispatch(setMaxAttemptCreate(parseInt(value)));
                  }}
                  items={[
                    {
                      value: "0",
                      label: t("exam_management_create_retry_num_infinite")
                    },
                    ...Array.from(Array(10).keys()).map((i) => ({
                      value: (i + 1).toString(),
                      label: (i + 1).toString()
                    }))
                  ]}
                  backgroundColor='#D9E2ED'
                  translation-key='exam_management_create_retry_num_infinite'
                />
              </Box>
              <Box className={classes.drawerFieldContainer}>
                <TextTitle
                  className={classes.drawerTextTitle}
                  translation-key='asingment_management_possibility'
                >
                  {t("asingment_management_possibility")}
                </TextTitle>
                <BasicSelect
                  labelId='select-assignment-availability-label'
                  value={assignmentAvailability}
                  onHandleChange={(value) => setAssignmentAvailability(value)}
                  items={[
                    {
                      value: "0",
                      label: t("asingment_management_possibility_show")
                    },
                    {
                      value: "1",
                      label: t("asingment_management_possibility_hind_can_not_access")
                    }
                    // {
                    //   value: "2",
                    //   label: t("asingment_management_possibility_hide_can_access")
                    // }
                  ]}
                  backgroundColor='#D9E2ED'
                  translation-key={[
                    "asingment_management_possibility_hind_can_not_access",
                    "asingment_management_possibility_show",
                    "asingment_management_possibility_hide_can_access"
                  ]}
                />
              </Box>
              {/* <Box className={classes.drawerFieldContainer}>
                <TextTitle
                  className={classes.drawerTextTitle}
                  translation-key='common_filter_topic'
                >
                  {t("common_filter_topic")}
                </TextTitle>
                <BasicSelect
                  labelId='select-assignment-section-label'
                  value={assignmentSection}
                  onHandleChange={(value) => setAssignmentSection(value)}
                  items={[
                    {
                      value: "0",
                      label: "Chủ đề 1"
                    },
                    {
                      value: "1",
                      label: "Chủ đề 2"
                    },
                    {
                      value: "2",
                      label: "Chủ đề 3"
                    }
                  ]}
                  backgroundColor='#D9E2ED'
                />
              </Box> */}
              <LoadButton
                btnType={BtnType.Outlined}
                fullWidth
                style={{ marginTop: "20px" }}
                padding='10px'
                loading={loading}
                onClick={handleClick}
                translation-key='course_lecturer_assignment_edit_exam'
              >
                {t("course_lecturer_assignment_edit_exam")}
              </LoadButton>
            </Box>
          </Drawer>
        </Box>
      </Grid>
    </>
  );
}
