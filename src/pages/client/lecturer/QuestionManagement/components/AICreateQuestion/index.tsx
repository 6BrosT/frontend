import { Box, Container, Grid, IconButton, MenuItem, Select } from "@mui/material";
import Header from "components/Header";
import InputTextField from "components/common/inputs/InputTextField";
import Heading1 from "components/text/Heading1";
import ParagraphBody from "components/text/ParagraphBody";
import TextTitle from "components/text/TextTitle";
import { memo, useCallback, useRef, useState } from "react";
import { useMatches, useNavigate, useParams } from "react-router-dom";
import classes from "./styles.module.scss";
// import Button from "@mui/joy/Button";
import Button, { BtnType } from "components/common/buttons/Button";
import { routes } from "routes/routes";
import useBoxDimensions from "hooks/useBoxDimensions";
import { Textarea } from "@mui/joy";
import Heading6 from "components/text/Heading6";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Heading4 from "components/text/Heading4";
import Delete from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import SnackbarAlert from "components/common/SnackbarAlert";
import CreateQuestionByAI, {
  IFormatQuestion,
  IQuestion
} from "services/AIService/CreateQuestionByAI";
import MDEditor from "@uiw/react-md-editor";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { useSelector } from "react-redux";
import { RootState } from "store";
interface Props {
  insideCrumb?: boolean;
}
export enum AlertType {
  Success = "success",
  INFO = "info",
  Warning = "warning",
  Error = "error"
}
export enum EQType {
  Essay = 1,
  MultipleChoice = 2,
  ShortAnswer = 3,
  TrueFalse = 4
}
export enum EQuestionLevel {
  Easy = 1,
  Medium = 2,
  Hard = 3
}
export enum ELanguage {
  Vietnamese = 1,
  English = 2
}
export enum EAmountAnswer {
  Three = 3,
  Four = 4,
  Five = 5
}
const AICreationQuestion = (props: Props) => {
  const navigate = useNavigate();
  const matches = useMatches();

  const sidebarStatus = useSelector((state: RootState) => state.sidebarStatus);
  const [headerHeight, setHeaderHeight] = useState<number>(sidebarStatus.headerHeight);
  if (props.insideCrumb) setHeaderHeight(0);

  const [modeEdit, setModeEdit] = useState(false);
  const { t } = useTranslation();
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [lengthQuestion, setLengthQuestion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("");
  const [desciption, setDesciption] = useState("");
  const [number_question, setNumberQuestion] = useState(5);
  const [level, setLevel] = useState<EQuestionLevel>(EQuestionLevel.Easy);
  const [qtype, setQtype] = useState<EQType>(EQType.MultipleChoice);
  const [qamountAnswer, setQamountAnswer] = useState<EAmountAnswer>(EAmountAnswer.Three);
  const [openSnackbarAlert, setOpenSnackbarAlert] = useState(false);
  const [alertContent, setAlertContent] = useState<string>("");
  const [alertType, setAlertType] = useState<AlertType>(AlertType.Success);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((q) => {
        if (q.id === index) {
          return { ...q, correctAnswer: parseInt(event.target.value) };
        } else {
          return q;
        }
      });
    });
  };
  const handleDelete = (index: number) => {
    setQuestions((prevQuestions) => {
      return prevQuestions.filter((q) => q.id !== index);
    });
  };
  function isResponseFormatQuestion(obj: any): obj is IFormatQuestion {
    return typeof obj.qtypeId === "number" && typeof obj.questions === "object";
  }

  const handleGenerate = async () => {
    setLoading(true);
    setQuestions([]);
    try {
      for await (const chunk of CreateQuestionByAI(
        topic,
        desciption,
        qtype,
        qamountAnswer,
        number_question,
        level
      )) {
        if (chunk && isResponseFormatQuestion(chunk)) {
          const questionsTemp = chunk?.questions;
          setQuestions(questionsTemp);
          setLengthQuestion(questionsTemp.length);
        }
      }
    } catch (error) {
      console.error("Error generating text:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    setModeEdit(!modeEdit);
  };
  const urlParams = useParams();

  return (
    <Grid className={classes.root}>
      <Header />
      <Container style={{ marginTop: `${headerHeight}px` }} className={classes.container}>
        <Box className={classes.tabWrapper}>
          <ParagraphBody className={classes.breadCump} colorname='--gray-50' fontWeight={"600"}>
            <span
              onClick={() => navigate("/lecturer/question-bank-management")}
              translation-key='common_question_bank'
            >
              {i18next.format(t("common_question_bank"), "firstUppercase")}
            </span>{" "}
            {"> "}
            <span
              onClick={() =>
                navigate(`/lecturer/question-bank-management/${urlParams["categoryId"]}`)
              }
            >
              Học OOP
            </span>{" "}
            {"> "}
            <span>Tạo câu hỏi</span>
          </ParagraphBody>
        </Box>
        <Grid container spacing={1} columns={12}>
          <Grid item xs={6}>
            <Box component='form' className={classes.formBody} autoComplete='off'>
              <Heading1 fontWeight={"500"} translation-key='common_add_question'>
                {t("common_add_question")}
              </Heading1>
              <Grid container spacing={1} columns={12}>
                <Grid item xs={12} md={3}>
                  <TextTitle>Danh mục</TextTitle>
                </Grid>
                <Grid item xs={12} md={9}>
                  <Select value={1} fullWidth={true} size='small' required>
                    <MenuItem value={1}>Ten</MenuItem>
                    <MenuItem value={2}>Twenty</MenuItem>
                    <MenuItem value={3}>Thirty</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextTitle>Chủ đề</TextTitle>
                </Grid>
                <Grid item xs={12} md={9}>
                  <InputTextField
                    onChange={(e: any) => setTopic(e.target.value)}
                    value={topic}
                    placeholder='Nhập chủ đề'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextTitle>Mô tả</TextTitle>
                </Grid>
                <Grid item xs={12} md={9}>
                  <Textarea
                    onChange={(e: any) => setDesciption(e.target.value)}
                    value={desciption}
                    placeholder='Nhập mô tả'
                    minRows={6}
                    maxRows={6}
                    size='lg'
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextTitle>Loại câu hỏi</TextTitle>
                </Grid>
                <Grid item xs={12} md={9}>
                  <Select
                    value={qtype}
                    onChange={(e: any) => setQtype(e.target.value)}
                    fullWidth={true}
                    size='small'
                    required
                  >
                    <MenuItem value={EQType.Essay}>Tự luận</MenuItem>
                    <MenuItem value={EQType.MultipleChoice}>Trắc nghiệm</MenuItem>
                    <MenuItem value={EQType.ShortAnswer}>Trả lời ngắn</MenuItem>
                    <MenuItem value={EQType.TrueFalse}>Đúng sai</MenuItem>
                  </Select>
                </Grid>
                {qtype === EQType.MultipleChoice && (
                  <>
                    <Grid item xs={12} md={3}>
                      <TextTitle>Số lượng đáp án</TextTitle>
                    </Grid>
                    <Grid item xs={12} md={9}>
                      <Select
                        value={qamountAnswer}
                        onChange={(e: any) => setQamountAnswer(e.target.value)}
                        fullWidth={true}
                        size='small'
                        required
                      >
                        <MenuItem value={EAmountAnswer.Three}>3</MenuItem>
                        <MenuItem value={EAmountAnswer.Four}>4</MenuItem>
                        <MenuItem value={EAmountAnswer.Five}>5</MenuItem>
                      </Select>
                    </Grid>
                  </>
                )}
                <Grid item xs={12} md={3}>
                  <TextTitle>Số lượng câu hỏi</TextTitle>
                </Grid>
                <Grid item xs={12} md={9}>
                  <InputTextField
                    type='number'
                    value={number_question}
                    onChange={(e: any) => {
                      if (e.target.value < 1) {
                        setNumberQuestion(1);
                      }
                      setNumberQuestion(e.target.value);
                    }}
                    placeholder='Nhập số lượng câu hỏi'
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextTitle>Độ khó</TextTitle>
                </Grid>
                <Grid item xs={12} md={9}>
                  <Select
                    value={level}
                    onChange={(e: any) => setLevel(e.target.value)}
                    fullWidth={true}
                    size='small'
                    required
                  >
                    <MenuItem value={EQuestionLevel.Easy}>Dễ</MenuItem>
                    <MenuItem value={EQuestionLevel.Medium}>Trung bình</MenuItem>
                    <MenuItem value={EQuestionLevel.Hard}>Khó</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <Button onClick={handleGenerate} btnType={BtnType.Primary}>
                Tạo câu hỏi
              </Button>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box className={classes.listQuestion}>
              {questions?.length !== 0 && (
                <Button btnType={BtnType.Primary} onClick={handleButtonClick}>
                  {modeEdit ? "Lưu" : "Chỉnh sửa"}
                </Button>
              )}
              {questions &&
                questions.map((value: IQuestion, index) => {
                  return (
                    <Box className={classes.questionCard} key={index}>
                      <Heading6 fontWeight={"500"}>
                        {index + 1}/{lengthQuestion}
                      </Heading6>
                      <Heading4
                        className={modeEdit ? classes.questionEdit : classes.question}
                        fontWeight={"600"}
                        contentEditable={modeEdit}
                      >
                        {value.question}
                      </Heading4>
                      <Box className={classes.answer}>
                        <RadioGroup
                          aria-labelledby='demo-radio-buttons-group-label'
                          defaultValue='female'
                          name='radio-buttons-group'
                          value={value.correctAnswer}
                          onChange={(event) => handleChange(event, value.id)}
                        >
                          {value.answers &&
                            value.answers.map((answer, index) => {
                              return (
                                <Box className={classes.answerItem} key={index}>
                                  {value.correctAnswer ? (
                                    <>
                                      <FormControlLabel
                                        value={index + 1}
                                        control={modeEdit ? <Radio /> : <></>}
                                        label={String.fromCharCode(65 + index)}
                                        labelPlacement='start'
                                        className={classes.radio}
                                      />
                                      {value.correctAnswer === index + 1 && (
                                        <ParagraphBody
                                          className={
                                            modeEdit
                                              ? classes.answerContentEdit
                                              : classes.answerContent
                                          }
                                          contentEditable={modeEdit}
                                          colorname='--green-500'
                                        >
                                          {answer.content}
                                        </ParagraphBody>
                                      )}
                                      {value.correctAnswer !== index + 1 && (
                                        <ParagraphBody
                                          className={
                                            modeEdit
                                              ? classes.answerContentEdit
                                              : classes.answerContent
                                          }
                                          contentEditable={modeEdit}
                                        >
                                          {answer.content}
                                        </ParagraphBody>
                                      )}
                                    </>
                                  ) : (
                                    <Box
                                      data-color-mode='light'
                                      className={
                                        modeEdit ? classes.answerContentEdit : classes.answerContent
                                      }
                                      contentEditable={modeEdit}
                                    >
                                      <MDEditor.Markdown
                                        source={answer.content}
                                        className={classes.markdown}
                                      />
                                    </Box>
                                  )}
                                </Box>
                              );
                            })}
                        </RadioGroup>
                      </Box>
                      <Box className={modeEdit ? classes.btnContainer : classes.none}>
                        <IconButton
                          className={classes.deleteBtn}
                          onClick={() => handleDelete(index)}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </Box>
                  );
                })}
              {loading === true && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    gap: "10px"
                  }}
                >
                  <CircularProgress />
                </Box>
              )}
            </Box>
          </Grid>
          <SnackbarAlert
            open={openSnackbarAlert}
            setOpen={setOpenSnackbarAlert}
            type={alertType}
            content={alertContent}
          />
        </Grid>
      </Container>
    </Grid>
  );
};

export default memo(AICreationQuestion);
