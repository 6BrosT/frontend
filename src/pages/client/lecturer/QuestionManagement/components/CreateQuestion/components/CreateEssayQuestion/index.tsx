import { Box, Container, Grid, MenuItem, Select } from "@mui/material";
import Header from "components/Header";
import InputTextField from "components/common/inputs/InputTextField";
import TextEditor from "components/editor/TextEditor";
import Heading1 from "components/text/Heading1";
import ParagraphBody from "components/text/ParagraphBody";
import TextTitle from "components/text/TextTitle";
import { useMemo, useRef, useState, useEffect } from "react";
import { useOutletContext, useNavigate, useParams } from "react-router-dom";
import classes from "./styles.module.scss";
// import Button from "@mui/joy/Button";
import Button, { BtnType } from "components/common/buttons/Button";
import { routes } from "routes/routes";
import qtype from "utils/constant/Qtype";
import useBoxDimensions from "hooks/useBoxDimensions";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

interface Props {
  courseId?: string;
  courseName?: string;
  qtype: String;
  insideCrumb?: boolean;
}

const CreateEssayQuestion = (props: Props) => {
  const { t } = useTranslation();
  const [currentLang, setCurrentLang] = useState(() => {
    return i18next.language;
  });
  const [answerOpen, setAnswerOpen] = useState(true);
  const vi_name = useMemo(
    () => Object.values(qtype).find((value) => value.code === props.qtype)?.vi_name,
    [props.qtype]
  );
  const en_name = useMemo(
    () => Object.values(qtype).find((value) => value.code === props.qtype)?.en_name,
    [props.qtype]
  );
  const navigate = useNavigate();

  const headerRef = useRef<HTMLDivElement>(null);
  let { height: headerHeight } = useBoxDimensions({
    ref: headerRef
  });
  if (props.insideCrumb) headerHeight = 0;
  const [initialized, setInitialized] = useState(true);
  let outletContext: any = useOutletContext();
  let outletTab = outletContext?.value;
  useEffect(() => {
    if (initialized) {
      setInitialized(false);
    } else {
      navigate("/lecturer/question-bank-management");
    }
  }, [outletTab]);

  const urlParams = useParams();
  console.log(urlParams);

  useEffect(() => {
    setCurrentLang(i18next.language);
  }, [i18next.language]);

  return (
    <Grid className={classes.root}>
      <Header ref={headerRef} />
      <Container style={{ marginTop: `${headerHeight}px` }} className={classes.container}>
        <Box className={classes.tabWrapper}>
          {props.insideCrumb ? (
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
          ) : (
            <ParagraphBody className={classes.breadCump} colorname='--gray-50' fontWeight={"600"}>
              <span
                translation-key='common_course_management'
                onClick={() => navigate(routes.lecturer.course.management)}
              >
                {t("common_course_management")}
              </span>{" "}
              {"> "}
              <span
                onClick={() =>
                  navigate(routes.lecturer.course.information.replace(":courseId", "1"))
                }
              >
                {props.courseName}
              </span>{" "}
              {"> "}
              <span onClick={() => navigate(routes.lecturer.course.assignment)}>
                Xem bài tập
              </span>{" "}
              {"> "}
              <span
                onClick={() => navigate(routes.lecturer.exam.create)}
                translation-key='course_lecturer_assignment_create_exam'
              >
                {t("course_lecturer_assignment_create_exam")}
              </span>{" "}
              {"> "}
              <span translation-key='question_management_create_question'>
                {t("question_management_create_question")}
              </span>
            </ParagraphBody>
          )}
        </Box>
        <Box component='form' className={classes.formBody} autoComplete='off'>
          <Heading1 fontWeight={"500"} translation-key='common_add'>
            {t("common_add")}{" "}
            {currentLang === "en"
              ? i18next.format(en_name, "lowercase")
              : i18next.format(vi_name, "lowercase")}
          </Heading1>
          <Grid container spacing={1} columns={12}>
            <Grid item xs={12} md={3}>
              <TextTitle translation-key='common_topic'>{t("common_topic")}</TextTitle>
            </Grid>
            <Grid item xs={12} md={9}>
              <Select defaultValue={10} fullWidth={true} size='small' required>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </Grid>
          </Grid>

          <InputTextField
            title={`${t("exam_management_create_question_name")} *`}
            type='text'
            placeholder={t("exam_management_create_question_name")}
            required
            translation-key='exam_management_create_question_name'
          />

          <Grid container spacing={1} columns={12}>
            <Grid item xs={12} md={3}>
              <TextTitle translation-key='exam_management_create_question_description'>
                {t("exam_management_create_question_description")} *
              </TextTitle>
            </Grid>
            <Grid item xs={12} md={9} className={classes.textEditor}>
              <TextEditor
                placeholder={`${t("question_management_enter_question_description")}...`}
                value={""}
                required
                translation-key='question_management_enter_question_description'
              />
            </Grid>
          </Grid>

          <InputTextField
            title={`${t("question_management_default_score")} *`}
            type='text'
            placeholder={t("question_management_default_score")}
            required
            translation-key='question_management_default_score'
          />

          <Grid container spacing={1} columns={12}>
            <Grid item xs={12} md={3}>
              <TextTitle translation-key='question_management_general_comment'>
                {t("question_management_general_comment")}
              </TextTitle>
            </Grid>
            <Grid item xs={12} md={9} className={classes.textEditor}>
              <TextEditor
                placeholder={`${t("question_management_enter_general_comment")}...`}
                value={""}
                translation-key='question_management_enter_general_comment'
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} columns={12}>
            <Grid item xs={12} md={3}>
              <TextTitle translation-key='question_management_rating_criteria'>
                {t("question_management_rating_criteria")}
              </TextTitle>
            </Grid>
            <Grid item xs={12} md={9} className={classes.textEditor}>
              <TextEditor
                min
                placeholder={`${t("question_management_enter_rating_criteria")}...`}
                value={""}
                translation-key='question_management_enter_rating_criteria'
              />
            </Grid>
          </Grid>
          <Box className={classes.stickyFooterContainer}>
            <Box className={classes.phantom} />
            <Box className={classes.stickyFooterItem}>
              <Button
                btnType={BtnType.Primary}
                translation-key='question_management_create_question'
              >
                {t("question_management_create_question")}
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Grid>
  );
};

export default CreateEssayQuestion;
