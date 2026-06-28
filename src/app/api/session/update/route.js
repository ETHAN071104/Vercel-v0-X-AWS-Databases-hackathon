import { NextResponse } from "next/server";
import { docClient } from "@/lib/dynamodb";
import { UpdateCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    // 1. Verify Auth
    const token = request.cookies.get("student_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const studentEmail = decoded.email;

    const { sessionId, currentQuestion, questionData, presence } = await request.json();

    // 2. Verify Ownership (Prevent overwriting other students)
    const sessionRes = await docClient.send(new GetCommand({ 
      TableName: "QuizSessions", 
      Key: { sessionId } 
    }));
    
    if (!sessionRes.Item || sessionRes.Item.studentEmail !== studentEmail) {
      return NextResponse.json({ error: "Forbidden: You do not own this session." }, { status: 403 });
    }

    // 3. Update the session
    await docClient.send(new UpdateCommand({
      TableName: "QuizSessions",
      Key: { sessionId: sessionId },
      UpdateExpression: "set currentQuestion = :cq, questionData = :qd, #p = :pres, lastSeen = :ls",
      ExpressionAttributeNames: { "#p": "presence" },
      ExpressionAttributeValues: {
        ":cq": currentQuestion,
        ":qd": questionData,
        ":pres": presence || "active",
        ":ls": new Date().toISOString()
      },
    }));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update Session Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}