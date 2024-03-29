import { Box, Tab, Tabs } from "@mui/material";
import classes from "./styles.module.scss";
import ParagraphBody from "components/text/ParagraphBody";
import { memo, useMemo } from "react";
import { Route, Routes, matchPath, useLocation, useNavigate, useParams } from "react-router-dom";
import { routes } from "routes/routes";
import StudentCourseInformation from "./components/Information";
import StudentCourseGrade from "./components/Grade";
import StudentCourseParticipant from "./components/Participant";
import StudentCourseAssignment from "./components/Assignment";
import StudentCourseAssignmentDetails from "./components/Assignment/AssignmentDetails";
import StudentCourseExamDetails from "./components/Assignment/ExamDetails";
import { useTranslation } from "react-i18next";

interface Props {}

const StudentCourseDetail = memo((props: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const { pathname } = useLocation();

  const handleChange = (_: React.SyntheticEvent, newTab: number) => {
    if (courseId) navigate(tabs[newTab].replace(":courseId", courseId));
  };

  const tabs: string[] = useMemo(() => {
    return [
      routes.student.course.information,
      routes.student.course.assignment,
      routes.student.course.grade,
      routes.student.course.participant
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routes]);

  const activeRoute = (routeName: string) => {
    const match = matchPath(pathname, routeName);
    return !!match;
  };

  const activeTab = useMemo(() => {
    if (courseId) {
      const index = tabs.findIndex((it) => activeRoute(it.replace(":courseId", courseId)));
      if (index === -1) return 0;
      return index;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, tabs]);

  return (
    <>
      <Box className={classes.tabWrapper}>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          aria-label='basic tabs example'
          className={classes.tabs}
        >
          <Tab
            sx={{ textTransform: "none" }}
            label={
              <ParagraphBody translation-key='course_detail_classroom'>
                {t("course_detail_classroom")}
              </ParagraphBody>
            }
            value={0}
          />
          <Tab
            sx={{ textTransform: "none" }}
            label={
              <ParagraphBody translation-key='course_detail_assignment'>
                {t("course_detail_assignment")}
              </ParagraphBody>
            }
            value={1}
          />
          <Tab
            sx={{ textTransform: "none" }}
            label={
              <ParagraphBody translation-key='common_score'>{t("common_score")}</ParagraphBody>
            }
            value={2}
          />
          <Tab
            sx={{ textTransform: "none" }}
            label={
              <ParagraphBody translation-key='course_detail_participant'>
                {t("course_detail_participant")}
              </ParagraphBody>
            }
            value={3}
          />
        </Tabs>
      </Box>

      <Box id={classes.courseDetailBody}>
        <Routes>
          <Route path={"information"} element={<StudentCourseInformation />} />
          <Route path={"assignments"} element={<StudentCourseAssignment />} />
          <Route path={"assignments/:assignmentId"} element={<StudentCourseAssignmentDetails />} />
          <Route path={"assignments/exams/:examId"} element={<StudentCourseExamDetails />} />
          <Route path={"grade"} element={<StudentCourseGrade />} />
          <Route path={"participant"} element={<StudentCourseParticipant />} />
        </Routes>
      </Box>
    </>
  );
});

export default StudentCourseDetail;
