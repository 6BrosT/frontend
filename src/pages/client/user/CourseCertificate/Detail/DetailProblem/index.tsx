import React, { useMemo } from "react";
import classes from "./styles.module.scss";
import { FormControl, MenuItem, Select, SelectChangeEvent, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import { Route, Routes, matchPath, useLocation, useNavigate, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ReactQuill from "react-quill";
import CodeEditor from "components/editor/CodeEditor";
import { useState } from "react";
import CodeIcon from "@mui/icons-material/Code";
import ListSolution from "./components/ListSolution";
import "react-quill/dist/quill.bubble.css"; // hoặc 'react-quill/dist/quill.bubble.css' cho theme bubble
import Header from "components/Header";
import ParagraphBody from "components/text/ParagraphBody";
import { routes } from "routes/routes";
import Submission from "./components/Submission";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ParagraphSmall from "components/text/ParagraphSmall";
import LessonDetailDescription from "./components/Description";
import LessonDetailSolution from "./components/ListSolution";
import LessonDetailSubmission from "./components/Submission";

enum ELanguage {
  JAVA = "java",
  CPP = "cpp",
  JAVASCRIPT = "javascript"
}
interface QCodeStub {
  language: ELanguage;
  codeStubHead: string;
  codeStubBody: string;
  codeStubTail: string;
}

export default function CourseCertificateLessonProblem() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState("0");

  const codeStubs: QCodeStub[] = [
    {
      language: ELanguage.JAVA,
      codeStubHead: `	import java.io.*;
	import java.math.*;
	import java.security.*;
	import java.text.*;
	import java.util.*;
	import java.util.concurrent.*;
	import java.util.function.*;
	import java.util.regex.*;
	import java.util.stream.*;
	import static java.util.stream.Collectors.joining;
	import static java.util.stream.Collectors.toList;
	`,
      codeStubBody: `class Result {
	/*
		* Complete the 'sumOfTwoIntegers' function below.
		*
		* The function is expected to return an INTEGER.
		* The function accepts following parameters:
		*  1. INTEGER a
		*  2. INTEGER b
		*/

	public static int sumOfTwoIntegers(int a, int b) {
	// Write your code here
	
	}
		}
			`,
      codeStubTail: `
public class Solution {
	public static void main(String[] args) throws IOException {
			BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));
			BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(System.getenv("OUTPUT_PATH")));

			int a = Integer.parseInt(bufferedReader.readLine().trim());

			int b = Integer.parseInt(bufferedReader.readLine().trim());

			int result = Result.sumOfTwoIntegers(a, b);

			bufferedWriter.write(String.valueOf(result));
			bufferedWriter.newLine();

			bufferedReader.close();
			bufferedWriter.close();
	}
		}`
    },
    {
      language: ELanguage.JAVASCRIPT,
      codeStubHead: `'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
		inputString += inputStdin;
});

process.stdin.on('end', function() {
		inputString = inputString.split('\n');

		main();
});

function readLine() {
		return inputString[currentLine++];
}`,
      codeStubBody: `
/*
 * Complete the 'sumOfTwoIntegers' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER a
 *  2. INTEGER b
 */

function sumOfTwoIntegers(a, b) {
    // Write your code here

}`,
      codeStubTail: `
function main() {
	const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

	const a = parseInt(readLine().trim(), 10);

	const b = parseInt(readLine().trim(), 10);

	const result = sumOfTwoIntegers(a, b);

	ws.write(result + '\n');

	ws.end();
}`
    },
    {
      language: ELanguage.CPP,
      codeStubHead: `#include <bits/stdc++.h>

	using namespace std;
	
	string ltrim(const string &);
	string rtrim(const string &);
					
			`,
      codeStubBody: `
			/*
 * Complete the 'sumOfTwoIntegers' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER a
 *  2. INTEGER b
 */

int sumOfTwoIntegers(int a, int b) {

}
			`,
      codeStubTail: `int main()
	{
			ofstream fout(getenv("OUTPUT_PATH"));
	
			string a_temp;
			getline(cin, a_temp);
	
			int a = stoi(ltrim(rtrim(a_temp)));
	
			string b_temp;
			getline(cin, b_temp);
	
			int b = stoi(ltrim(rtrim(b_temp)));
	
			int result = sumOfTwoIntegers(a, b);
	
			fout << result << "\n";
	
			fout.close();
	
			return 0;
	}
	
	string ltrim(const string &str) {
			string s(str);
	
			s.erase(
					s.begin(),
					find_if(s.begin(), s.end(), not1(ptr_fun<int, int>(isspace)))
			);
	
			return s;
	}
	
	string rtrim(const string &str) {
			string s(str);
	
			s.erase(
					find_if(s.rbegin(), s.rend(), not1(ptr_fun<int, int>(isspace))).base(),
					s.end()
			);
	
			return s;
	}			
		`
    }
  ];
  const [selectedLanguage, setSelectedLanguage] = useState<string>(ELanguage.JAVA);
  const [selectedCodeStub, setSelectedCodeStub] = useState<QCodeStub>(codeStubs[0]);
  const handleChangeLanguage = (event: SelectChangeEvent) => {
    const selectedLanguage = event.target.value;
    setSelectedLanguage(selectedLanguage);
    const selectedStub = codeStubs.find((stub) => stub.language === selectedLanguage);
    if (selectedStub) {
      setSelectedCodeStub(selectedStub);
    }
  };

  const { lessonId, courseId } = useParams<{ courseId: string; lessonId: string }>();
  const { pathname } = useLocation();

  const handleChange = (_: React.SyntheticEvent, newTab: number) => {
    if (courseId && lessonId)
      navigate(tabs[newTab].replace(":courseId", courseId).replace(":lessonId", lessonId));
  };

  const tabs: string[] = useMemo(() => {
    return [
      routes.user.course_certificate.detail.lesson.description,
      routes.user.course_certificate.detail.lesson.solution,
      routes.user.course_certificate.detail.lesson.submission
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routes]);

  const activeRoute = (routeName: string) => {
    const match = matchPath(pathname, routeName);
    return !!match;
  };

  const activeTab = useMemo(() => {
    if (courseId && lessonId) {
      const index = tabs.findIndex((it) =>
        activeRoute(it.replace(":courseId", courseId).replace(":lessonId", lessonId))
      );
      if (index === -1) return 0;
      return index;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, tabs]);

  return (
    <Box className={classes.root}>
      <Header />
      <Box className={classes.boxContainer}>
        <Box className={classes.tabWrapper}>
          <Box id={classes.breadcumpWrapper}>
            <ParagraphSmall
              colorName='--blue-500'
              className={classes.cursorPointer}
              onClick={() => navigate(routes.user.course_certificate.root)}
            >
              Danh sách khóa học
            </ParagraphSmall>
            <KeyboardDoubleArrowRightIcon id={classes.icArrow} />
            <ParagraphSmall
              colorName='--blue-500'
              className={classes.cursorPointer}
              onClick={() => {
                if (courseId)
                  navigate(
                    routes.user.course_certificate.detail.lesson.root.replace(":courseId", courseId)
                  );
              }}
            >
              Học C++ cơ bản
            </ParagraphSmall>
            <KeyboardDoubleArrowRightIcon id={classes.icArrow} />
            <ParagraphSmall colorName='--blue-500'>Hello world</ParagraphSmall>
          </Box>
        </Box>
        <Box className={classes.codeContainer}>
          <Box className={classes.tabContent}>
            <TabContext value={value}>
              <Box id={classes.tabWrapper}>
                <Tabs
                  value={activeTab}
                  onChange={handleChange}
                  aria-label='basic tabs example'
                  className={classes.tabs}
                >
                  <Tab
                    sx={{ textTransform: "none" }}
                    label={<ParagraphBody>Mô tả</ParagraphBody>}
                    value={0}
                  />
                  <Tab
                    sx={{ textTransform: "none" }}
                    label={<ParagraphBody>Thảo luận</ParagraphBody>}
                    value={1}
                  />
                  <Tab
                    sx={{ textTransform: "none" }}
                    label={<ParagraphBody>Bài nộp</ParagraphBody>}
                    value={2}
                  />
                </Tabs>
              </Box>

              <Box>
                <Routes>
                  <Route path={"description"} element={<LessonDetailDescription />} />
                  <Route path={"solution"} element={<LessonDetailSolution />} />
                  <Route path={"submission"} element={<LessonDetailSubmission />} />
                </Routes>
              </Box>
            </TabContext>
          </Box>
          <Box className={classes.codeStubsWrapper}>
            <Box className={classes.codeStubHead}>
              <CodeIcon />
              <FormControl>
                <Select
                  value={selectedLanguage}
                  onChange={handleChangeLanguage}
                  sx={{ bgcolor: "white", width: "150px", height: "40px" }}
                >
                  <MenuItem value={ELanguage.JAVA}>Java</MenuItem>
                  <MenuItem value={ELanguage.JAVASCRIPT}>Javascript</MenuItem>
                  <MenuItem value={ELanguage.CPP}>C++</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box className={classes.codeStubBody}>
              <CodeEditor
                value={selectedCodeStub.codeStubHead.concat(
                  selectedCodeStub.codeStubBody,
                  selectedCodeStub.codeStubTail
                )}
                readOnly={false}
                language={selectedLanguage}
                showMinimap={false}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
