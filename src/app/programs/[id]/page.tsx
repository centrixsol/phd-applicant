import AppLayout from "@/components/layout/AppLayout";
import ProgramDetail from "./ProgramDetail";

export default function ProgramDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <AppLayout>
      <ProgramDetail paramsPromise={params} />
    </AppLayout>
  );
}
