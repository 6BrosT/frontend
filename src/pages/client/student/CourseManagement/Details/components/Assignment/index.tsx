import SearchBar from "components/common/search/SearchBar";
import classes from "./styles.module.scss";

import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Heading3 from "components/text/Heading3";
import Heading1 from "components/text/Heading1";
import { useNavigate } from "react-router";
import { routes } from "routes/routes";
import AssignmentResource from "./Resource";
import { ResourceType } from "pages/client/lecturer/CourseManagement/Details/components/Assignment/components/Resource";
import { useTranslation } from "react-i18next";

const StudentCourseAssignment = () => {
  const { t } = useTranslation();
  const searchHandle = (searchVal: string) => {
    console.log(searchVal);
  };
  const navigate = useNavigate();

  const onCreateNewAssignment = async (popupState: any) => {
    navigate(routes.lecturer.assignment.create);
    popupState.close();
  };

  const onCreateNewExam = async (popupState: any) => {
    navigate(routes.lecturer.exam.create);
    popupState.close();
  };

  return (
    <Box className={classes.assignmentBody}>
      <Heading1 translation-key='course_detail_assignment_list'>
        {t("course_detail_assignment_list")}
      </Heading1>
      <Grid container>
        <Grid item xs={12}>
          <SearchBar onSearchClick={searchHandle} />
        </Grid>
      </Grid>
      <Box className={classes.assignmentsWrapper}>
        <Box className={classes.topic}>
          <Heading3 translation-key='course_detail_assignment'>
            {t("course_detail_assignment")}
          </Heading3>
          <AssignmentResource resourceTitle='Bài tập 1' resourceEndedDate='12/12/2022' />
          <AssignmentResource resourceTitle='Bài tập 2' resourceEndedDate='12/12/2023' />
        </Box>
        <Box className={classes.topic}>
          <Heading3 translation-key='course_detail_exam'>{t("course_detail_exam")}</Heading3>
          <AssignmentResource
            resourceTitle='Bài kiểm tra 1'
            resourceEndedDate='12/12/2022'
            type={ResourceType.exam}
          />
          <AssignmentResource
            resourceTitle='Bài kiểm tra 2'
            resourceEndedDate='12/12/2023'
            type={ResourceType.exam}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default StudentCourseAssignment;
