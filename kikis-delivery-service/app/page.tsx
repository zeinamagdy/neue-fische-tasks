import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
import { ModeToggle } from "@/components/ui/toggle-button";
export default function Home() {
  return (
    <>
      <ModeToggle />
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>Kiki's Delivery Service</CardTitle>
          <CardDescription>
            Fast, reliable deliveries across the city.
          </CardDescription>
        </CardHeader>
        <CardContent>Working with Nextjs and Tailwind</CardContent>
      </Card>
    </>
  );
}
