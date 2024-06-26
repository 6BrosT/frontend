import { GoogleGenerativeAI } from "@google/generative-ai";
import { jsonrepair } from "jsonrepair";
import i18next from "i18next";
import { ICodeConverterRequest } from "pages/admin/CodeQuestionManagement/Details/components/CodeStubs";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GOOGLE_GEMINI_AI_KEY || "");

// const example_response: ICodeConverterResponse[] = [
//   {
//     program_language: "java",
//     code_stub: `
// import java.io.*;
// import java.math.*;
// import java.security.*;
// import java.text.*;
// import java.util.*;
// import java.util.concurrent.*;
// import java.util.function.*;
// import java.util.regex.*;
// import java.util.stream.*;
// import static java.util.stream.Collectors.joining;
// import static java.util.stream.Collectors.toList;

// class Result {

//     /*
//      * Complete the 'simpleArraySum' function below.
//      *
//      * The function is expected to return an INTEGER.
//      * The function accepts INTEGER_ARRAY ar as parameter.
//      */

//     public static int simpleArraySum(List<Integer> ar) {
//     // Write your code here

//     }

// }

// public class Solution {
//     public static void main(String[] args) throws IOException {
//         BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));
//         BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(System.getenv("OUTPUT_PATH")));

//         int arCount = Integer.parseInt(bufferedReader.readLine().trim());

//         List<Integer> ar = Stream.of(bufferedReader.readLine().replaceAll("\\s+$", "").split(" "))
//             .map(Integer::parseInt)
//             .collect(toList());

//         int result = Result.simpleArraySum(ar);

//         bufferedWriter.write(String.valueOf(result));
//         bufferedWriter.newLine();

//         bufferedReader.close();
//         bufferedWriter.close();
//     }
// }

// 		`
//   },
//   {
//     program_language: "py",
//     code_stub: `
// #!/bin/python3

// import math
// import os
// import random
// import re
// import sys

// #
// # Complete the 'simpleArraySum' function below.
// #
// # The function is expected to return an INTEGER.
// # The function accepts INTEGER_ARRAY ar as parameter.
// #

// def simpleArraySum(ar):
//     # Write your code here

// if __name__ == '__main__':
//     fptr = open(os.environ['OUTPUT_PATH'], 'w')

//     ar_count = int(input().strip())

//     ar = list(map(int, input().rstrip().split()))

//     result = simpleArraySum(ar)

//     fptr.write(str(result) + '\n')

//     fptr.close()
// 		`
//   },
//   {
//     program_language: "c++",
//     code_stub: `
// #include <bits/stdc++.h>

// using namespace std;

// string ltrim(const string &);
// string rtrim(const string &);
// vector<string> split(const string &);

// /*
//  * Complete the 'simpleArraySum' function below.
//  *
//  * The function is expected to return an INTEGER.
//  * The function accepts INTEGER_ARRAY ar as parameter.
//  */

// int simpleArraySum(vector<int> ar) {

// }

// int main()
// {
//     ofstream fout(getenv("OUTPUT_PATH"));

//     string ar_count_temp;
//     getline(cin, ar_count_temp);

//     int ar_count = stoi(ltrim(rtrim(ar_count_temp)));

//     string ar_temp_temp;
//     getline(cin, ar_temp_temp);

//     vector<string> ar_temp = split(rtrim(ar_temp_temp));

//     vector<int> ar(ar_count);

//     for (int i = 0; i < ar_count; i++) {
//         int ar_item = stoi(ar_temp[i]);

//         ar[i] = ar_item;
//     }

//     int result = simpleArraySum(ar);

//     fout << result << "\n";

//     fout.close();

//     return 0;
// }

// string ltrim(const string &str) {
//     string s(str);

//     s.erase(
//         s.begin(),
//         find_if(s.begin(), s.end(), not1(ptr_fun<int, int>(isspace)))
//     );

//     return s;
// }

// string rtrim(const string &str) {
//     string s(str);

//     s.erase(
//         find_if(s.rbegin(), s.rend(), not1(ptr_fun<int, int>(isspace))).base(),
//         s.end()
//     );

//     return s;
// }

// vector<string> split(const string &str) {
//     vector<string> tokens;

//     string::size_type start = 0;
//     string::size_type end = 0;

//     while ((end = str.find(" ", start)) != string::npos) {
//         tokens.push_back(str.substr(start, end - start));

//         start = end + 1;
//     }

//     tokens.push_back(str.substr(start));

//     return tokens;
// }

// `
//   }
// ];

async function* CodeConverterAI(
  programming_language: string,
  code_stub: string,
  program_language_converted_request: ICodeConverterRequest[]
) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
  const AI_ROLE = `
I. YOUR ROLE:
	- You are Code Converter AI, a large language model trained on a massive dataset of text and code.
	- You can generate code stubs in different programming languages based on the provided code snippet.
	- Your task is to convert the given code snippet into the specified programming language.
	- The programming languages you can convert to include Java, Python, C++, and more.
	`;

  const SYSTEM_INSTRUCTIONS = `
I. SYSTEM_INSTRUCTIONS:
	A. Steps for AI to Convert Code Snippets:
		1. Input: Receive code stubs written in the specified programming language (${programming_language}).

		2. Conversion:
			- Convert each code stub into the programming languages specified in requests.
			- Ensure the converted code is syntactically correct and follows best practices of the target language.

		3. Output:
			- Provide the converted code snippets in JSON format as specified in the prompt.
			- Each converted code snippet should be wrapped in single quotes ("), ensuring plain text format.
			- Maintain empty methods or sections as they are (e.g., empty implementations).

	B. Detailed Steps:
		1. Read Code Stub: Extract the code stub provided in triple quotes (""") for each programming language ${programming_language}.

		2. Language Conversion:
			- For each requested programming language in requests, perform the following:
				+ Convert the code stub from ${programming_language} to the target language.
				+ Ensure all syntax is correct and follows the conventions of the target language.
				+ Preserve the structure and formatting of the original code stub, including any empty method definitions.
		3. Format Output:
			- Construct the output in JSON format, following the structure:
			[
				{
					"program_language": "target_language",
					"code_stub": "converted_code_snippet"
				},
				{
					"program_language": "target_language",
					"code_stub": "converted_code_snippet"
				},
				...
			]
			- Note for ""code_stub"":
				+ Not markdown format. It should be plain text.
				+ Wrapped in single quote (").
				+ Do not {{provide solution}} to the problem. If method which is provided is {{empty}}, keep it {{empty}}.
					++ For example, if the original code snippet has a method definition with no implementation, the converted code should also have the same method definition with no implementation.
				+ Ensure that the converted code is syntactically correct and follows the best practices of the target language.

		4. Example Output:
			"""
				[
					{
						"program_language": "java",
						"code_stub": "import java.io.*;\\nimport java.math.*;\\nimport java.security.*;\\nimport java.text.*;\\nimport java.util.*;\\nimport java.util.concurrent.*;\\nimport java.util.function.*;\\nimport java.util.regex.*;\\nimport java.util.stream.*;\\nimport static java.util.stream.Collectors.joining;\\nimport static java.util.stream.Collectors.toList;\\n\\nclass Result {\\n\\n    /*\\n     * Complete the 'simpleArraySum' function below.\\n     *\\n     * The function is expected to return an INTEGER.\\n     * The function accepts INTEGER_ARRAY ar as parameter.\\n     */\\n\\n    public static int simpleArraySum(List<Integer> ar) {\\n    // Write your code here\\n\\n    }\\n\\n}\\n\\npublic class Solution {\\n    public static void main(String[] args) throws IOException {\\n        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));\\n        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(System.getenv(\\\"OUTPUT_PATH\\\")));\\n\\n        int arCount = Integer.parseInt(bufferedReader.readLine().trim());\\n\\n        List<Integer> ar = Stream.of(bufferedReader.readLine().replaceAll(\\\"\\\\s+$\\\", \\\"\\\").split(\\\" \\\")).map(Integer::parseInt).collect(toList());\\n\\n        int result = Result.simpleArraySum(ar);\\n\\n        bufferedWriter.write(String.valueOf(result));\\n        bufferedWriter.newLine();\\n\\n        bufferedReader.close();\\n        bufferedWriter.close();\\n    }\\n}"
					},
					{
						"program_language": "py",
						"code_stub": "#!/bin/python3\\n\\nimport math\\nimport os\\nimport random\\nimport re\\nimport sys\\n\\n#\\n# Complete the 'simpleArraySum' function below.\\n#\\n# The function is expected to return an INTEGER.\\n# The function accepts INTEGER_ARRAY ar as parameter.\\n#\\n\\ndef simpleArraySum(ar):\\n    # Write your code here\\n\\nif __name__ == '__main__':\\n    fptr = open(os.environ['OUTPUT_PATH'], 'w')\\n\\n    ar_count = int(input().strip())\\n\\n    ar = list(map(int, input().rstrip().split()))\\n\\n    result = simpleArraySum(ar)\\n\\n    fptr.write(str(result) + '\\n')\\n\\n    fptr.close()"
					},
					{
						"program_language": "c++",
						"code_stub": "#include <bits/stdc++.h>\\n\\nusing namespace std;\\n\\nstring ltrim(const string &);\\nstring rtrim(const string &);\\nvector<string> split(const string &);\\n\\n/*\\n * Complete the 'simpleArraySum' function below.\\n *\\n * The function is expected to return an INTEGER.\\n * The function accepts INTEGER_ARRAY ar as parameter.\\n */\\n\\nint simpleArraySum(vector<int> ar) {\\n\\n}\\n\\nint main() {\\n    ofstream fout(getenv(\\\"OUTPUT_PATH\\\"));\\n\\n    string ar_count_temp;\\n    getline(cin, ar_count_temp);\\n\\n    int ar_count = stoi(ltrim(rtrim(ar_count_temp)));\\n\\n    string ar_temp_temp;\\n    getline(cin, ar_temp_temp);\\n\\n    vector<string> ar_temp = split(rtrim(ar_temp_temp));\\n\\n    vector<int> ar(ar_count);\\n\\n    for (int i = 0; i < ar_count; i++) {\\n        int ar_item = stoi(ar_temp[i]);\\n\\n        ar[i] = ar_item;\\n    }\\n\\n    int result = simpleArraySum(ar);\\n\\n    fout << result << '\\n';\\n\\n    fout.close();\\n\\n    return 0;\\n}\\n\\nstring ltrim(const string &str) {\\n    string s(str);\\n\\n    s.erase(\\n        s.begin(),\\n        find_if(s.begin(), s.end(), not1(ptr_fun<int, int>(isspace)))\\n    );\\n\\n    return s;\\n}\\n\\nstring rtrim(const string &str) {\\n    string s(str);\\n\\n    s.erase(\\n        find_if(s.rbegin(), s.rend(), not1(ptr_fun<int, int>(isspace))).base(),\\n        s.end()\\n    );\\n\\n    return s;\\n}\\n\\nvector<string> split(const string &str) {\\n    vector<string> tokens;\\n\\n    string::size_type start = 0;\\n    string::size_type end = 0;\\n\\n    while ((end = str.find(\\\" \\\", start)) != string::npos) {\\n        tokens.push_back(str.substr(start, end - start));\\n\\n        start = end + 1;\\n    }\\n\\n    tokens.push_back(str.substr(start));\\n\\n\\n    return tokens;\\n}"
					}
				]
			"""

			Note for example:
				- The example is just for reference. Don't use it to respond to user.
				- Ensure the response is in valid {{JSON format}} !!!

		5. Validation:
		- Validate the JSON format of the output to ensure compliance with the specified structure.
		- Do not reuse example output for responses; generate unique converted code snippets based on the provided code stubs.

	C. Respond if you understand the instructions and are ready to proceed. I will provide you with the code stubs and programming languages to convert.
`;

  const INPUT = (requests: ICodeConverterRequest[]) => `
	II. INPUT:
	You are provided code stubs of language {{${programming_language}}}, and then convert it to the specified programming language:

	- Code Stub which is covered by triple quotes: 
		"""
		${code_stub}
		"""

	- Programming Language Of Code Stub which is covered by double brackets: {{${programming_language}}}

  - Number of programming languages to convert which is covered by double brackets: {{${requests.length}}}

	- Programming Languages to Convert which is covered by triple quotes:
		"""
		${JSON.stringify(requests)}
		"""
	`;

  // Helper function to chunk the array
  function chunkArray<T>(array: T[], chunk_size: number): T[][] {
    const results: T[][] = [];
    for (let i = 0; i < array.length; i += chunk_size) {
      results.push(array.slice(i, i + chunk_size));
    }
    return results;
  }

  try {
    let result, response, text;
    const chunks = chunkArray(program_language_converted_request, 6);
    const allResponses = [];
    result = await model.generateContentStream(AI_ROLE);
    response = await result.response;
    text = response.text;

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: AI_ROLE }]
        },
        {
          role: "model",
          parts: [{ text: String(text) }]
        }
      ]
    });

    result = await chat.sendMessageStream(SYSTEM_INSTRUCTIONS);
    response = await result.response;
    text = await response.text();

    for (const chunk of chunks) {
      result = await chat.sendMessageStream(INPUT(chunk));
      response = await result.response;
      text = await response.text();
      const cleanText = text.replace(/```/g, "").replace(/json/g, "");
      const repaired = jsonrepair(cleanText);
      const json = JSON.parse(repaired);
      allResponses.push(...json);
      yield allResponses;
    }
  } catch (error) {
    return error;
  }
}

export default CodeConverterAI;
