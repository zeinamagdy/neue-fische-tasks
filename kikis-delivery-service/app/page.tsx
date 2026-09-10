import styles from "./page.module.css";
import { Card,CardContent,CardDescription, CardTitle,CardHeader } from "@/components/ui/card";

export default function Home() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Kiki's Delivery Service</CardTitle> 
        <CardDescription>
          Fast, reliable deliveries across the city.
        </CardDescription>
      </CardHeader>
      <CardContent>Working with Nextjs and Tailwind</CardContent>
    </Card>
  );
}
