import { Box, Grid } from "@mui/material";
import classes from "./styles.module.scss";
import { Route, Routes } from "react-router";
import RequireAuth from "components/common/RequireAuth";
import { ERoleName } from "models/authService/entity/role";
import ContestManagement from "./ContestManagement/ContestManagement";
import CreateContest from "./ContestManagement/CreateContest";
import EditContestDetails from "./ContestManagement/EditContestDetails";
import SidebarSystemAdmin from "components/common/sidebars/SidebarSystemAdmin";
import UserInformation from "pages/client/user/UserDetails/UserInformation";
import React from "react";
import AdminDashboard from "./Dashboard";
import Footer from "components/Footer";
import UserManagement from "./UserManagement/UserManagement";
import CreateUser from "./UserManagement/CreateUser";
import EditUserDetails from "./UserManagement/EditUserDetails";
import CertificateCourseManagement from "./CertificateCourseManagement/CertificateCourseManagement";
import QuestionListOfCourse from "./QuestionBankManagement/QuestionListOfCourse";
import CreateShortAnswerQuestion from "pages/client/lecturer/QuestionManagement/components/CreateQuestion/components/CreateShortAnswerQuestion";
import CreateEssayQuestion from "pages/client/lecturer/QuestionManagement/components/CreateQuestion/components/CreateEssayQuestion";
import CreateMultichoiceQuestion from "pages/client/lecturer/QuestionManagement/components/CreateQuestion/components/CreateMultichoiceQuestion";
import CreateTrueFalseQuestion from "pages/client/lecturer/QuestionManagement/components/CreateQuestion/components/CreateTrueFalseQuestion";
import LecturerCodeQuestionCreation from "pages/client/lecturer/CodeQuestionManagement/Create";
import qtype from "utils/constant/Qtype";
import AdminQuestionBankManagement from "./QuestionBankManagement";

type Props = {};

const SystemAdminHomepage = (props: Props) => {
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen((pre) => !pre);
  };

  return (
    <Grid className={classes.root}>
      <SidebarSystemAdmin open={open} toggleDrawer={toggleDrawer}>
        {/* <Box className={classes.container}> */}
        <Box className={classes.body}>
          <Routes>
            <Route path={"contests"} element={<ContestManagement />} />
            <Route path={"contests/create"} element={<CreateContest />} />
            <Route
              path={"contests/edit/:contestId/*"}
              element={<EditContestDetails isDrawerOpen={open} />}
            />
            <Route path={"information"} element={<UserInformation />} />
            <Route path={"/dashboard"} element={<AdminDashboard />} />
            <Route path={"users"} element={<UserManagement />} />
            <Route path={"users/create"} element={<CreateUser />} />
            <Route path={"users/edit/:userId/*"} element={<EditUserDetails />} />
            <Route path={"/certificate-course"} element={<CertificateCourseManagement />} />

            <Route path={"question-bank-management"} element={<AdminQuestionBankManagement />} />
            <Route
              path={"question-bank-management/:categoryId"}
              element={<QuestionListOfCourse />}
            />
            <Route
              // path={routes.org_admin.question_bank.create_question.short_answer}
              path={"question-bank-management/:categoryId/create/short-answer"}
              element={<CreateShortAnswerQuestion qtype={qtype.short_answer.code} />}
            />
            <Route
              path={"question-bank-management/:categoryId/create/essay"}
              element={<CreateEssayQuestion qtype={qtype.essay.code} />}
            />
            <Route
              path={"question-bank-management/:categoryId/create/multiple-choice"}
              element={<CreateMultichoiceQuestion qtype={qtype.multiple_choice.code} />}
            />
            <Route
              path={"question-bank-management/:categoryId/create/true-false"}
              element={<CreateTrueFalseQuestion qtype={qtype.true_false.code} />}
            />
            <Route
              path={"question-bank-management/:categoryId/create/code"}
              element={<LecturerCodeQuestionCreation />}
            />
          </Routes>
        </Box>
        {/* </Box> */}
      </SidebarSystemAdmin>
    </Grid>
  );
};

export default SystemAdminHomepage;
