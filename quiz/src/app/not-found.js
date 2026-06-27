import Link from "next/link";
import { Button, Card } from "@/components/ui";

export default function NotFound() {
  return (
    <main className="min-h-screen grid place-items-center p-4 gradient-mesh">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-xl font-bold text-destructive">
          404
        </div>
        <h1 className="text-2xl font-bold">Page Not Found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        <Link href="/" className="mt-6 block">
          <Button className="w-full">Go Back Home</Button>
        </Link>
      </Card>
    </main>
  );
}