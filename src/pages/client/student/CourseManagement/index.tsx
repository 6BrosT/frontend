import Grid from "@mui/material/Grid";
import SearchBar from "components/common/search/SearchBar";
import CourseCard from "./components/CourseCard";
import classes from "./styles.module.scss";
import Box from "@mui/material/Box";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewCardIcon from "@mui/icons-material/ViewModule";
import CourseList from "./components/CouseList";
import ChipMultipleFilter from "components/common/filter/ChipMultipleFilter";
import Heading1 from "components/text/Heading1";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { setCourses } from "reduxes/courseService/course";
import { CourseService } from "services/courseService/CourseService";
import { useEffect, useState } from "react";

enum EView {
  cardView = 1,
  listView = 2
}

const StudentCourses = () => {
  const tempCategories = ["Chất lượng cao", "Việt - Pháp", "Tiên tiến", "Sau đại học"];

  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const courseState = useSelector((state: RootState) => state.course);

  const searchHandle = async (searchText: string) => {
    setSearchText(searchText);
  };

  const handleGetCourses = async ({
    search = searchText,
    pageNo = 0,
    pageSize = 10
  }: {
    search?: string;
    pageNo?: number;
    pageSize?: number;
  }) => {
    try {
      const getCourseResponse = await CourseService.getCourses({
        search,
        pageNo,
        pageSize
      });
      dispatch(setCourses(getCourseResponse));
    } catch (error) {
      console.error("Failed to fetch courses", error);
    }
  };

  useEffect(() => {
    const featchInitialCourses = async () => {
      await handleGetCourses({ search: searchText });
    };
    featchInitialCourses();
  }, [searchText]);

  const [viewType, setViewType] = useState(EView.listView);

  const handleViewChange = (event: React.MouseEvent<HTMLElement>, nextView: number) => {
    setViewType(nextView);
  };
  const handleCategoryFilterChange = (selectedCategoryList: Array<string>) => {
    console.log(selectedCategoryList);
  };
  const { t } = useTranslation();

  return (
    <Box id={classes.coursesBody}>
      <Heading1 className={classes.pageTitle} translation-key='course_list_title'>
        {t("course_list_title")}
      </Heading1>
      <SearchBar onSearchClick={searchHandle} />

      <Box className={classes.featureGroup}>
        <Box className={classes.filterContainer}>
          <ChipMultipleFilter
            label={t("course_filter")}
            defaultChipList={[]}
            filterList={tempCategories}
            onFilterListChangeHandler={handleCategoryFilterChange}
            translation-key='course_filter'
          />
        </Box>

        <ToggleButtonGroup
          className={classes.changeViewButtonGroup}
          value={viewType}
          exclusive
          onChange={handleViewChange}
        >
          <ToggleButton value={EView.listView} aria-label='list'>
            <ViewListIcon />
          </ToggleButton>
          <ToggleButton value={EView.cardView} aria-label='module'>
            <ViewCardIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {viewType === EView.cardView ? (
        <Box sx={{ flexGrow: 1 }} className={classes.gridContainer}>
          <Grid container spacing={2}>
            {courseState.courses.map((course, index) => (
              <Grid className={classes.gridItem} item key={course.id} xs={12} sm={6} md={4} lg={3}>
                <CourseCard
                  courseId={course.id}
                  courseAvatarUrl={"https://picsum.photos/200"}
                  courseCategory={course.courseType.name}
                  courseName={course.name}
                  teacherList={course.teachers}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1, marginTop: "20px" }} className={classes.gridContainer}>
          <Grid container spacing={4}>
            {courseState.courses.map((course) => (
              <Grid item xs={12} sm={12} md={12} lg={12} key={course.id}>
                <CourseList
                  courseId={course.id}
                  courseAvatarUrl={"https://picsum.photos/200"}
                  courseCategory={course.courseType.name}
                  courseName={course.name}
                  teacherList={course.teachers}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default StudentCourses;
