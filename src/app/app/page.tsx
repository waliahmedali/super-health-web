import { createClient } from "@/lib/supabase/server";
import HomeDashboardView from "@/components/home/HomeDashboardView";

export default async function AppDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <HomeDashboardView userEmail={user?.email} />;
}
