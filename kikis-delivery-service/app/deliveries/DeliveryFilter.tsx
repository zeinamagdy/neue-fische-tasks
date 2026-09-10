"use client";
import { DeliveryRequest } from "@/lib/services/deliveriesService";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DeliveryFilter({
  deliveries,
}: {
  deliveries: DeliveryRequest[];
}) {
  const [status, setStatus] = useState("all");
  const visiable =
    status === "all"
      ? deliveries
      : deliveries.filter((delivery) => delivery.status === status);
  return (
    <div>
      <Select id="status" value={status} onValueChange={(val) => val && setStatus(val)}>
        <SelectTrigger>
          <SelectValue placeholder="Fileter by status"></SelectValue>
        </SelectTrigger>
        <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="active">Active</SelectItem>
        <SelectItem value="accepted">Accepted</SelectItem>
        <SelectItem value="fulfilled">Fulfilled</SelectItem>
        </SelectContent>
      </Select>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {visiable.map((delivery) => (
          <li key={delivery.id}>
            {delivery.pickup} to {delivery.destination} ({delivery.status})
            <Button>Accept</Button>
            <Button variant="outline">Details</Button>
            <Button variant="destructive">Cancel delivery</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
