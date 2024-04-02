import { NextResponse, NextRequest } from "next/server";
import webpush, { PushSubscription } from "web-push";
import { createBrowserClient } from "@supabase/ssr";

webpush.setVapidDetails(
  "mailto:test@example.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.NEXT_PUBLIC_VAPID_PRIVATE_KEY!
);

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  const subscription = (await request.json()) as PushSubscription | null;

  if (!subscription) {
    console.error("No subscription was provided!");
    return;
  }

  try {
    const updatedDb = await supabase
      .from("subscriptions")
      .insert([{ subscription: subscription }]);

    return NextResponse.json({ message: "success", updatedDb });
  } catch (error) {
    console.error("Error saving subscription to DB", error);
    return NextResponse.json({ message: "error" });
  }
}

// Test endpoint to send notifications to all subscribers
export async function GET(request: NextRequest) {
  const { data: subscriptionsQuery } = await supabase
    .from("subscriptions")
    .select("subscription");

  if (!subscriptionsQuery) {
    console.error("No subscriptions found in DB");
    return NextResponse.json({ message: "No subscriptions found in DB" });
  }

  const subscriptions = subscriptionsQuery?.map(
    (s) => s.subscription
  ) as PushSubscription[];

  subscriptions.forEach((s) => {
    const payload = JSON.stringify({
      title: `${process.env.NEXT_PUBLIC_APP_NAME || "Evento"}: Nowa wiadomość!`,
      body: "Sprawdź nową wiadomość w aplikacji!",
    });
    webpush.sendNotification(s, payload);
  });

  return NextResponse.json({
    message: `${subscriptions.length} messages sent!`,
  });
}
