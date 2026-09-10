"use client";
import { useActionState } from "react";
import { addDelivery, ActionState } from "@/app/actions/deliveryActions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
export default function DeliveryForm() {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    addDelivery,
    null,
  );
  return (
    <div className="grid gap-2">
      <form action={formAction}>
        <Label htmlFor="pickup">Pickup</Label>
        <Input name="pickup" placeholder="pickup" />
        <Label htmlFor="destination">destination</Label>
        <Input name="destination" placeholder="destination" />
        {state?.ok === false && <p className="text-red-500">{state.error}</p>}
        <Button
          className="bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          type="submit"
        >
          Create Request
        </Button>
        <div>{isPending ? "Creating..." : "Create Delivery"}</div>
      </form>
    </div>
  );
}
