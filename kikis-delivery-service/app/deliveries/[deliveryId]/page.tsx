import BackButton from "@/app/components/BackButton";
import { getDeliveryById } from "@/lib/services/deliveriesService";

export default async function DeliveryDetailPage({
  params,
}: PageProps<"/deliveries/[deliveryId]">) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const { deliveryId } = await params;
  const delivery = await getDeliveryById(deliveryId);

  if (!delivery) {
    throw new Error(`Delivery with ID "${deliveryId}" was not found.`);
  }

  return (
    <div>
      <h1>Delivery {deliveryId}</h1>
      <p>
        From {delivery.pickup} to {delivery.destination}
      </p>
      <p>Status: {delivery.status}</p>
      <BackButton />
    </div>
  );
}
