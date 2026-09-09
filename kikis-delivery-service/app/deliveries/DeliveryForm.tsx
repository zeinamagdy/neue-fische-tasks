import { useActionState } from "react";
import { addDelivery, ActionState } from "@/app/actions/deliveryActions";

export default function DeliveryForm() {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    addDelivery,
    null,
  );
  return (
    <form action={formAction}>
      <input name="pickup" placeholder="pickup" />
      <input name="destination" placeholder="destination" />
      {state?.ok === false && <p className="text-red-500">{state.error}</p>}
      <button type="submit">Create Request</button>
      {isPending ? 'Creating...' : 'Create Delivery'}
    </form>
  );
}          
