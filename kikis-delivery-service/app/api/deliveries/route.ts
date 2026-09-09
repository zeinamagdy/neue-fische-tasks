import { getAllDeliveries,getDeliveryById } from "@/lib/services/deliveriesService";
import { error } from "console";

export async function GET() {
  const deliveries = await getAllDeliveries();
  return Response.json(deliveries);
}
export async function GETById(request:Request,{params}:{params:Promise<{id:string}}) {
  const {id} = await params;
  const delivery = await getDeliveryById(id)
  if(!delivery)
    return Response.json({error: "Delivery not found"},{status:404})

  return Response.json(delivery);
}
