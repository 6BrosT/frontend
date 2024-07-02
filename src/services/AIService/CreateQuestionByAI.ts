import { GoogleGenerativeAI } from "@google/generative-ai";
import { jsonrepair } from "jsonrepair";
import {
  EQType,
  EQuestionLevel,
  EAmountAnswer,
  ELanguage
} from "../../pages/client/lecturer/QuestionManagement/components/AICreateQuestion";
import i18next from "i18next";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GOOGLE_GEMINI_AI_KEY || "");

export interface IFormatQuestion {
  qtypeId: EQType;
  questions: IQuestion[];
}

export interface IQuestion {
  id: number;
  question: string;
  answers: IAnswer[];
  correctAnswer?: number;
}

export interface IAnswer {
  id: number;
  content: string;
}

const format_question: IFormatQuestion[] = [
  {
    qtypeId: 1,
    questions: [
      {
        id: 0,
        question:
          "Phân tích những yếu tố chính ảnh hưởng đến kết quả bầu cử tổng thống Mỹ năm 2024. Liệt kê những vấn đề chính trị, kinh tế và xã hội có thể tác động đến lựa chọn của cử tri và giải thích lý do tại sao.",
        answers: [
          {
            id: 1,
            content:
              "Cuộc bầu cử tổng thống Mỹ 2024 là một sự kiện quan trọng, thu hút sự chú ý của toàn thế giới. Kết quả của cuộc bầu cử này sẽ ảnh hưởng đến chính sách của Mỹ trong nhiều lĩnh vực, từ kinh tế, ngoại giao đến quốc phòng. Để phân tích những yếu tố ảnh hưởng đến kết quả bầu cử, chúng ta cần xem xét bối cảnh chính trị, kinh tế và xã hội của Mỹ hiện tại. Đồng thời, cần lưu ý đến những thay đổi trong tâm lý cử tri, chiến lược vận động tranh cử của các ứng viên và vai trò của truyền thông. Cuộc bầu cử 2024 hứa hẹn sẽ là một cuộc đua đầy cam go, với nhiều bất ngờ và kịch tính."
          }
        ]
      },
      {
        id: 1,
        question:
          "Hãy thảo luận về tầm quan trọng của việc cử tri tham gia bầu cử tổng thống Mỹ năm 2024 và những lợi ích mà việc tham gia bầu cử mang lại.",
        answers: [
          {
            id: 1,
            content: `Việc cử tri tham gia bầu cử tổng thống Mỹ năm 2024 có ý nghĩa vô cùng quan trọng đối với tương lai của đất nước. Tham gia bầu cử là một quyền và nghĩa vụ của mỗi công dân Mỹ, cho phép họ thể hiện tiếng nói của mình, lựa chọn những nhà lãnh đạo phù hợp và định hướng cho tương lai của quốc gia.`
          }
        ]
      }
    ]
  },
  {
    qtypeId: 2,
    questions: [
      {
        id: 0,
        question: "Ai là người đặt câu hỏi này ?",
        answers: [
          { id: 1, content: "Dương Chí Thông" },
          { id: 2, content: "Nguyễn Quốc Tuấn" },
          { id: 3, content: "Trương Gia Tiến" }
        ],
        correctAnswer: 1
      },
      {
        id: 1,
        question: "Ai là người được bầu làm tổng thống Mỹ năm 2020 ?",
        answers: [
          { id: 1, content: "Joe Biden" },
          { id: 2, content: "Donald Trump" },
          { id: 3, content: "Barack Obama" }
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    qtypeId: 3,
    questions: [
      {
        id: 0,
        question:
          "Elon Musk stated that Tesla will not accept payments in ________ because of environmental concerns.",
        answers: [{ id: 0, content: "Bitcoin" }]
      },
      {
        id: 1,
        question: "What is the capital of Vietnam?",
        answers: [{ id: 0, content: "Hanoi" }]
      },
      {
        id: 2,
        question: "What is the capital of the United States?",
        answers: [{ id: 0, content: "Washington, D.C." }]
      },
      {
        id: 3,
        question: "What is the largest ocean on Earth?",
        answers: [{ id: 0, content: "Pacific Ocean" }]
      }
    ]
  },
  {
    qtypeId: 4,
    questions: [
      {
        id: 0,
        question:
          "Elon Musk stated that Tesla will not accept payments in Bitcoin because of environmental concerns.",
        answers: [
          { id: 1, content: "True" },
          { id: 2, content: "False" }
        ],
        correctAnswer: 1
      },
      {
        id: 1,
        question: "Con trai thường cá tính hơn con gái ?",
        answers: [
          { id: 1, content: "True" },
          { id: 2, content: "False" }
        ],
        correctAnswer: 2
      }
    ]
  }
];
async function* CreateQuestionByAI(
  topic: string,
  description: string,
  qtype: EQType,
  qamount_answer: EAmountAnswer,
  number_question: number,
  level: EQuestionLevel
) {
  // For text-only input, use the gemini-pro model
  const formatQuestion = format_question.find((item) => item.qtypeId === qtype);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
  let question_type = "";
  const language = i18next.language === "en" ? "English" : "Vietnamese";
  if (qtype === EQType.Essay) {
    question_type = "Essay";
  } else if (qtype === EQType.MultipleChoice) {
    question_type = "Multiple Choice";
  } else if (qtype === EQType.ShortAnswer) {
    question_type = "Short Answer";
  } else {
    question_type = "True/False";
  }

  let levelQuestion = "";
  if (level === EQuestionLevel.Easy) {
    levelQuestion = "Beginner";
  } else if (level === EQuestionLevel.Medium) {
    levelQuestion = "Intermediate";
  } else {
    levelQuestion = "Advanced";
  }

  const AI_ROLE = `
I. YOUR ROLE:
	- You are Generator Question AI, a large language model trained on a massive dataset of text and code.
  - Your expertise encompasses various domains, including software engineering and programming.
  - You can generate code-related questions of diverse types (multiple choice, true/false, short answer, essay) to aid learning and assessment in Tertiary Education.`;

  const SYSTEM_INSTRUCTIONS = `
I. SYSTEM_INSTRUCTIONS:
	A. Steps for AI to Automatically Generate Questions:
		1. Read and Parse Input:
		- Extract provided information details from the input, including ""topic"", ""description"", ""question_type"", ""numberQuestion"", ""levelQuestion"", and ""amount_answers"" (Multiple Choice only).

		2. Understand the Context:
		- Topic: Identify the main subject area for the questions.
		- Description: Understand any additional context or specifics provided about the topic.
		- Level: Determine the difficulty level of the questions (Beginner, Intermediate, Advanced).
			+ Beginner: Suitable for students who are new to the topic.
			+ Intermediate: Suitable for students with some knowledge of the topic.
			+ Advanced: Suitable for students with a deep understanding of the topic.
		- Question Type: Identify the type of questions to generate (Essay, Multiple Choice, Short Answer, True/False).

		3. Generate Questions:
		- Essay Questions:
			+ Create an open-ended question that requires a detailed response (a paragraph or more).
			+ Example: "Discuss the impact of climate change on global agriculture."
			+ Provide detailed expected responses for context.

		- Multiple Choice Questions:
			+ Create questions with one correct answer and multiple distractors.
			+ Example: "What is the capital of Japan?"
			+ Answers: Tokyo, Osaka, Kyoto, Nagoya
			+ Correct Answer: Tokyo
			+ Ensure the total number of answers matches {{amount_answers}}.

		- Short Answer Questions:
			+ Create questions that require brief responses (1-2 sentences).
			+ A question that requires a brief response (Answer: 1-2 sentences), not an essay.
			+ Example: "What is the capital of France?"
			+ Expected Answer: Paris
		
		- True/False Questions:
			+ Create statements that students must identify as true or false.
			+ Example: "The Earth revolves around the Sun."
			+ Correct Answer: True

		4. Structure the Output:
		- Ensure the output is in JSON format with the following structure	 
		{
			"qtypeId": number,
			"questions": [
				{
					"id": number,
					"question": string,
					"answers": [
						{
							"id": number,
							"content": string
						},
						...
					],
					"correctAnswer": number
				},
				...
			]
		}

		5. Validate and Format JSON:
			- Validate that the generated JSON is syntactically correct.
			- Ensure the question content and answers do not use quotation marks. Replace with escaped characters if necessary.
		6. Handle Different Question Types Separately:
		- For Essay:
			+ Generate detailed questions.
			+ Provide expected detailed responses.
		- For Multiple Choice:
			+ Generate questions with multiple options.
			+ Identify and include the correct answer ID.
		- For Short Answer:
			+ Generate questions with expected brief responses.
		- For True/False:
			+ Generate statements with True or False answers.
			+ Identify and include the correct answer ID.

		7. Incorporate Language Requirements:
			- Ensure all questions and answers are written in the specified language (${language}).

	B. Output:
		The structure of the response must be {{JSON format}} which follows the following structure:
		- qtypeId: The type of question contains the following values.
			+ 1: Essay
			+ 2: Multiple Choice
			+ 3: Short Answer
			+ 4: True/False
		- questions: An array of questions (IQuestion).
			+ IQuestion: The data structure for a question:
				* id: A number, the unique identifier for the question.
				* question: A string, the content of the question. Do not use "" (Quotation Marks) on any character in the string. Instead, if you want to highlight text,... For example, replace it with \\"Personal Name\\" 
				* answers: An array of answer (IAnswer[]) representing the answer
					** Note:
						*** Answer should follow the markdown syntax. Must be use "\\n" for line breaks.
					** IAnswer: The data structure for an answer:
						*** id: A number, the unique identifier for the answer.
						*** content: A string, the content of the answer. Do not use "" (Quotation Marks) on any character in the string. Instead, if you want to highlight text,... For example, replace it with \\"Personal Name\\" 
				* correctAnswer: The id of the correct answer (only applies to multiple choice and true/false questions).

		For example output which is covered by triple quotes:
		"""
		${JSON.stringify(formatQuestion)}
		"""

		Note for example:
			- The example is just for reference. Don't use it to respond to user.
			- Ensure the response is in valid {{JSON format}} !!!

	C. Respond if you understand the instructions and are ready to proceed. I will provide you with the input details for question generation.`;

  const INPUT_OUTPUT = (numberQuestion: number) => `
I. INPUT:
	A. Input:
	Provided information details, each of which is covered by triple quotes or double brackets:
		- Topic: 
			""" ${topic} """

		- Description: 
			""" ${description || "No description provided."} """

		- Question Type: {{${question_type}}}

		${qtype === EQType.MultipleChoice ? `- Number of answers of each question multiple choice: {{${qamount_answer}}}` : ""}

		- Number of Questions: {{${numberQuestion}}}

		- Level: {{${levelQuestion}}}
		`;
  try {
    let result, response, text;
    const batchSize = 3; // Adjust the batch size as needed
    const allQuestions = [];
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

    const numberOfBatches = Math.ceil(number_question / batchSize);
    for (let i = 0; i < numberOfBatches; i++) {
      const currentBatchSize = Math.min(batchSize, number_question - i * batchSize);
      result = await chat.sendMessageStream(INPUT_OUTPUT(currentBatchSize));
      response = await result.response;
      text = await response.text();
      const cleanText = text.replace(/```/g, "").replace(/json/g, "");
      const repaired = jsonrepair(cleanText);
      const json = JSON.parse(repaired);
      allQuestions.push(...json.questions);
      yield {
        qtypeId: qtype,
        questions: allQuestions
      };
    }
  } catch (error) {
    return error;
  }
}

export default CreateQuestionByAI;
