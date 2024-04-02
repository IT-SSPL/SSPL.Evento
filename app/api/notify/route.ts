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
  const { record } = await request.json();

  const content = record.message || "Sprawdź nową wiadomość w aplikacji!";

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
      title: `${
        process.env.NEXT_PUBLIC_APP_NAME !== undefined
          ? process.env.NEXT_PUBLIC_APP_NAME
          : "Evento"
      }: Nowa wiadomość!`,
      body: content,
    });
    webpush.sendNotification(s, payload);
  });

  return NextResponse.json({
    message: `${subscriptions.length} messages sent!`,
  });
}
