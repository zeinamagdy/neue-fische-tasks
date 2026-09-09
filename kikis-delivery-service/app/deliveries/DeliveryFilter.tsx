"use client";
import { DeliveryRequest } from "@/lib/services/deliveriesService";
import { useState } from "react";

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
  const getStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };
  return (
    <div>
      <label htmlFor="status">Choose status:</label>
      <select id="status" value={status} onChange={getStatus}>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="accepted">Accepted</option>
        <option value="fulfilled">Fulfilled</option>
      </select>
      <ul>
        {visiable.map((delivery) => (
          <li key={delivery.id}>
            {delivery.pickup} to {delivery.destination} ({delivery.status})
          </li>
        ))}
      </ul>
    </div>
  );
}
