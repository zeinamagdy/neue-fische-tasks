"use client";
import { useRouter } from "next/navigation";
export default function BackButton() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/deliveries');
  };
  return (
    <button
      type="button"
      onClick={() => handleClick()}
      style={{
        padding: "0.4rem 0.8rem",
        cursor: "pointer",
        marginBottom: "1rem",
      }}
    >
      ← Go Back
    </button>
  );
}
