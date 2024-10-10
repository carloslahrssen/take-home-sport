import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="w-screen">
      <div className="mx-auto">
        <Spinner size="lg" />
      </div>
    </div>
  );
}
