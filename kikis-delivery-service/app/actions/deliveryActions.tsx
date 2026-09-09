"user server";

import { createDelivery } from "@/lib/services/deliveriesService";
import { revalidatePath } from "next/cache";

type createResult = { ok: true; id: string } | { ok: false; error: string };
export async function addDelivery(formData: FormData) {
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
