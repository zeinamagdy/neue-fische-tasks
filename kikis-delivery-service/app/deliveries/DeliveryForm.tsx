
import { createDelivery } from "@/lib/services/deliveriesService";
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';

export default function DeliveryForm (){
    async function addDelivery(formData: FormData) {
    "use server";

    const pickup = formData.get("pickup") as string;
    const destination = formData.get("destination") as string;

    await createDelivery({ pickup, destination });
    revalidatePath("/deliveries");
    redirect('/deliveries')
  }
    return (
        <form action={addDelivery}>
            <input name ="pickup" placeholder="pickup"/>
            <input name="destination" placeholder="destination"/>
            <button type="submit">Create Request</button>
        </form>
    )
}