import { NextResponse } from "next/server";
import { docClient } from "@/lib/dynamodb";
import { GetCommand } from "@aws-sdk/lib-dynamodb";

export async function GET(request, { params }) {
  try {
    const { quizId } = await params;

    const command = new GetCommand({
      TableName: "Quizzes",
      Key: { quizId },
    });

    const response = await docClient.send(command);

    if (!response.Item) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    const quiz = response.Item;

    // SECURITY: Check if the requester is a student
    const studentToken = request.cookies.get("student_token")?.value;
    if (studentToken) {
      // Strip correctAnswer and explanation before sending to student!
      const safeQuiz = {
        ...quiz,
        questions: quiz.questions.map(q => {
          const { correctAnswer, explanation, ...safeQuestion } = q;
          return safeQuestion;
        })
      };
      return NextResponse.json({ quiz: safeQuiz, success: true }, { status: 200 });
    }

    // If not a student (e.g., lecturer editing), return full quiz
    return NextResponse.json({ quiz: quiz, success: true }, { status: 200 });

  } catch (error) {
    console.error("Error fetching quiz:", error);
    return NextResponse.json({ error: "Failed to fetch quiz" }, { status: 500 });
  }
}