import UpgradeRequired from "@/components/common/upgrade-required";
import { hasActivePlan } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

async function Layout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();
  if (!user) {
    return redirect("/sign-in");
  }
  const hasActiveSubscription = await hasActivePlan(
    user.emailAddresses?.[0]?.emailAddress,
  );
  // TODO: add this !
  if (hasActiveSubscription) {
    return <UpgradeRequired />;
  }
  return <>{children}</>;
}

export default Layout;
