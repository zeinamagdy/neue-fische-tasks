"use client";
import { useForm } from "react-hook-form";
import { addDelivery, ActionState } from "@/app/actions/deliveryActions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
export default function DeliveryForm() {
  type FormValues = {
    pickup: string;
    destination: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onsubmit = (data: FormValues) => {
    console.log(data);
  };
  return (
    <div className="grid gap-2">
      <form onSubmit={handleSubmit(onsubmit)}>
        <Label htmlFor="pickup">Pickup</Label>
        <Input
          {...register("pickup", {
            required: "Pickup destination is require",
            minLength: {
              value: 3,
              message: "pickup  must be at least 2 characters",
            },
          })}
          placeholder="pickup"
        />
        {errors.pickup && <p>{errors.pickup.message}</p>}

        <Label htmlFor="destination">destination</Label>
        <Input
          {...register("destination", {
            required: "Pickup destination is require",
            minLength: {
              value: 3,
              message: "pickup  must be at least 2 characters",
            },
          })}
          placeholder="destination"
        />
        {errors.destination && <p>{errors.destination.message}</p>}

        <Button variant="brand" type="submit">
          Create Request
        </Button>
      </form>
    </div>
  );
}
