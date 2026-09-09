"use server";

import { createDelivery } from "@/lib/services/deliveriesService";
import { revalidatePath } from "next/cache";

export type ActionState =
  { ok: true; id: string } | { ok: false; error: string } | null;

export async function addDelivery(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const pickup = formData.get("pickup") as string;
  const destination = formData.get("destination") as string;
  try {
    const deliveryId = await createDelivery({ pickup, destination });
    revalidatePath("/deliveries");
    return { ok: true, id: deliveryId };
  } catch (error) {
    return { ok: false, error: "coudn't create delivery" };
  }
}
