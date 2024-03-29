import { Box, FormControl, Grid, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { memo, useRef, useState } from "react";
import classes from "./styles.module.scss";
import TextTitle from "components/text/TextTitle";
import { Textarea } from "@mui/joy";
import Button, { BtnType } from "components/common/buttons/Button";
import ParagraphBody from "components/text/ParagraphBody";
import CodeEditor from "components/editor/CodeEditor";
import Heading5 from "components/text/Heading5";
import useBoxDimensions from "hooks/useBoxDimensions";
import { useTranslation } from "react-i18next";

type Props = {};

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
const CodeQuestionCodeStubs = memo((props: Props) => {
  const { t } = useTranslation();
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
      codeStubTail: `public class Solution {
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
      codeStubHead: `	'use strict';

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
		}			
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

function sumOfTwoIntegers(a, b) {
    // Write your code here

}
			`,
      codeStubTail: `
function main() {
	const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

	const a = parseInt(readLine().trim(), 10);

	const b = parseInt(readLine().trim(), 10);

	const result = sumOfTwoIntegers(a, b);

	ws.write(result + '\n');

	ws.end();
}
		`
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
  const handleChange = (event: SelectChangeEvent) => {
    const selectedLanguage = event.target.value;
    setSelectedLanguage(selectedLanguage);
    const selectedStub = codeStubs.find((stub) => stub.language === selectedLanguage);
    if (selectedStub) {
      setSelectedCodeStub(selectedStub);
    }
  };

  const codeStubHead1Ref = useRef<HTMLDivElement>(null);
  const { height: codeStubHead1Height } = useBoxDimensions({
    ref: codeStubHead1Ref
  });

  const codeStubHead2Ref = useRef<HTMLDivElement>(null);
  const { height: codeStubHead2Height } = useBoxDimensions({
    ref: codeStubHead2Ref
  });

  return (
    <>
      <Box component='form' autoComplete='off' className={classes.formBody}>
        <Heading5
          fontStyle={"italic"}
          fontWeight={"400"}
          colorname='--gray-50'
          translation-key='code_management_detail_template_description'
        >
          {t("code_management_detail_template_description")}
        </Heading5>
        <Grid container spacing={1} columns={12}>
          <Grid item xs={3}>
            <TextTitle translation-key='code_management_detail_template_dsl'>
              {t("code_management_detail_template_dsl")}
            </TextTitle>
          </Grid>
          <Grid item xs={9}>
            <Textarea
              defaultValue={`function(integer, sumOfTwoIntegers, integer a, integer b)

integer(a)

integer(b)

invoke(integer, result, sumOfTwoIntegers, a, b)

print(integer,result)`}
              sx={{ backgroundColor: "white" }}
              minRows={5}
              maxRows={5}
            />
          </Grid>
        </Grid>
        <Box className={classes.btnWrapper}>
          <Button
            btnType={BtnType.Primary}
            width='150px'
            translation-key='code_management_detail_template_create'
          >
            {t("code_management_detail_template_create")}{" "}
          </Button>
        </Box>
      </Box>
      <Heading5
        fontStyle={"italic"}
        fontWeight={"400"}
        colorname='--gray-50'
        translation-key='code_management_detail_template_dsl_description'
      >
        {t("code_management_detail_template_dsl_description")}{" "}
      </Heading5>
      <Box mt={2} id={classes.codeStubsContainer}>
        <Box className={classes.codeStubsWrapper}>
          <Box className={classes.codeStubHead} ref={codeStubHead1Ref}>
            <ParagraphBody fontWeight={700}>Head</ParagraphBody>
            <FormControl>
              <Select
                value={selectedLanguage}
                onChange={handleChange}
                sx={{ bgcolor: "white", width: "150px" }}
              >
                <MenuItem value={ELanguage.JAVA}>Java</MenuItem>
                <MenuItem value={ELanguage.JAVASCRIPT}>Javascript</MenuItem>
                <MenuItem value={ELanguage.CPP}>C++</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box
            className={classes.codeStubBody}
            style={{ height: `calc(100% - ${codeStubHead1Height}px)` }}
          >
            <CodeEditor value={selectedCodeStub.codeStubHead} readOnly={true} />
          </Box>
        </Box>
        <Box className={classes.codeStubsWrapper}>
          <Box className={classes.codeStubHead} ref={codeStubHead2Ref}>
            <ParagraphBody fontWeight={700}>Body</ParagraphBody>
          </Box>
          <Box
            className={classes.codeStubBody}
            style={{ height: `calc(100% - ${codeStubHead2Height}px)` }}
          >
            <CodeEditor value={selectedCodeStub.codeStubBody} readOnly={true} />
          </Box>
        </Box>
        <Box className={classes.codeStubsWrapper}>
          <Box className={classes.codeStubHead}>
            <ParagraphBody fontWeight={700}>Tail</ParagraphBody>
          </Box>
          <Box
            className={classes.codeStubBody}
            style={{
              height: `calc(100% - ${codeStubHead2Height}px)`
            }}
          >
            <CodeEditor value={selectedCodeStub.codeStubTail} readOnly={true} />
          </Box>
        </Box>
      </Box>
    </>
  );
});

export default CodeQuestionCodeStubs;
