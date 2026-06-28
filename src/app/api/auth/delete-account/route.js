import { NextResponse } from "next/server";
import { docClient } from "@/lib/dynamodb";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb"; // NEW!
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    // 1. Find out who is asking to delete
    let token = request.cookies.get("student_token")?.value;
    let role = "student";
    let tableName = "Users";

    if (!token) {
      token = request.cookies.get("lecturer_token")?.value;
      role = "lecturer";
      tableName = "Lecturers";
    }

    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const email = decoded.email;

    // 2. Delete the user from DynamoDB
    await docClient.send(new DeleteCommand({
      TableName: tableName,
      Key: { email: email },
    }));

    // 3. Clear the cookies to log them out
    const response = NextResponse.json({ success: true, message: "Account deleted successfully" });
    response.cookies.set("student_token", "", { httpOnly: true, expires: new Date(0) });
    response.cookies.set("lecturer_token", "", { httpOnly: true, expires: new Date(0) });

    return response;
  } catch (error) {
    console.error("Delete Account Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}