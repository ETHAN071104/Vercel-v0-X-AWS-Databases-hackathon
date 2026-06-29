"use client";
import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui";

export default function ArchitecturePage() {
  const [step, setStep] = useState(0);
  const timeoutIds = useRef([]);
  const wait = (ms) => new Promise(resolve => {
    const id = setTimeout(resolve, ms);
    timeoutIds.current.push(id);
  });

  useEffect(() => {
    let isMounted = true;

    const runSequence = async () => {
      while (isMounted) {
        // Reset
        setStep(0);
        await wait(3000);

        // Step 1: Lecturer creates quiz
        setStep(1);
        await wait(6000);

        // Step 2: Groq AI generates JSON
        setStep(2);
        await wait(6000);

        // Step 3: DynamoDB PutCommand (Quizzes Table)
        setStep(3);
        await wait(6000);

        // Step 4: Student takes quiz (UpdateCommand)
        setStep(4);
        await wait(6000);

        // Step 5: Lecturer views analytics (ScanCommand)
        setStep(5);
        await wait(8000);
      }
    };

    runSequence();

    return () => {
      isMounted = false;
      timeoutIds.current.forEach(id => clearTimeout(id));
    };
  }, []);

  const stepsText = [
    { title: "Vercel + AWS DynamoDB", desc: "Serverless architecture for the Vercel v0 x AWS Databases Hackathon." },
    { title: "1. Lecturer Uploads PDF", desc: "The Lecturer uploads a PDF via the Next.js Frontend hosted on Vercel. The request hits a Next.js Route Handler (Serverless Function)." },
    { title: "2. Groq AI Integration", desc: "The Route Handler sends the PDF text to Groq (Llama 3.1). Groq returns a structured JSON array of questions, options, and correct answers." },
    { title: "3. AWS DynamoDB: PutCommand", desc: "Using the AWS SDK v3, the backend executes a PutCommand to store the new quiz into the 'Quizzes' DynamoDB table, keyed by a unique 'quizId'." },
    { title: "4. Student Takes Quiz", desc: "As the student answers, the frontend sends updates. The backend uses an UpdateCommand on the 'QuizSessions' table to store live proctoring data and answers in real-time." },
    { title: "5. AWS DynamoDB: ScanCommand", desc: "The Lecturer's dashboard polls the API. The backend uses a ScanCommand with a FilterExpression on the 'QuizSessions' table to fetch all sessions for that quiz, rendering the live heatmap." },
  ];

  const getNodeClasses = (activeStep, nodeStep) => {
    const isActive = step >= nodeStep && step <= activeStep;
    return `p-6 rounded-2xl border transition-all duration-500 ${isActive ? 'border-primary bg-primary/10 scando-shadow-lg scale-105' : 'border-border bg-muted/30 opacity-50'}`;
  };

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <Card className="w-full max-w-5xl p-10">
        <h1 className="text-3xl font-bold text-center mb-2">{stepsText[step].title}</h1>
        <p className="text-muted-foreground text-center mb-12 h-12 max-w-2xl mx-auto">{stepsText[step].desc}</p>

        <div className="grid grid-cols-3 gap-8 items-center">
          {/* Frontend */}
          <div className={`p-6 rounded-2xl border transition-all duration-500 ${step > 0 ? 'border-primary bg-primary/10 scando-shadow-lg' : 'border-border bg-muted/30'}`}>
            <h3 className="font-bold text-lg mb-2">Vercel (Next.js)</h3>
            <p className="text-xs text-muted-foreground">React 19 Frontend & Route Handlers</p>
          </div>

          {/* AI / Backend Middle */}
          <div className={getNodeClasses(step, 2)}>
            <h3 className="font-bold text-lg mb-2 text-center">Groq AI</h3>
            <p className="text-xs text-muted-foreground text-center">Llama 3.1 8B Instant</p>
          </div>

          {/* AWS Database */}
          <div className={getNodeSteps(step)}>
            <h3 className="font-bold text-lg mb-2 text-center">AWS DynamoDB</h3>
            <p className="text-xs text-muted-foreground text-center">Quizzes & QuizSessions Tables</p>
            {step >= 3 && <p className="text-xs font-mono text-primary mt-2 text-center animate-pulse">PutCommand ✓</p>}
            {step >= 4 && <p className="text-xs font-mono text-primary mt-2 text-center animate-pulse">UpdateCommand ✓</p>}
            {step >= 5 && <p className="text-xs font-mono text-primary mt-2 text-center animate-pulse">ScanCommand ✓</p>}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-12 w-full bg-muted rounded-full h-2">
          <div className="bg-primary h-2 rounded-full transition-all duration-1000" style={{ width: `${(step / 5) * 100}%` }}></div>
        </div>
      </Card>
    </main>
  );
}

// Helper for the AWS node to handle multiple active steps
function getNodeSteps(step) {
  const isActive = step >= 3;
  return `p-6 rounded-2xl border transition-all duration-500 ${isActive ? 'border-primary bg-primary/10 scando-shadow-lg scale-105' : 'border-border bg-muted/30 opacity-50'}`;
}