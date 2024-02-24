"use client";

import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io";

const notificationsSupported = () =>
  "Notification" in window &&
  "serviceWorker" in navigator &&
  "PushManager" in window;

export default function Notifications() {
  if (!notificationsSupported()) {
    return (
      <div className="fixed top-20 right-1/2 translate-x-1/2 z-30">
        <div role="alert" className="alert gap-1">
          <IoIosInformationCircleOutline className="text-2xl" />
          <span className="text-sm">
            Zainstaluj aplikacje by móc otrzymywać powiadomienia!
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-20 right-1/2 translate-x-1/2 z-30">
      <button
        onClick={subscribe}
        className="btn btn-sm btn-primary btn-outline bg-background"
      >
        <IoIosNotificationsOutline className="text-xl" />
        <span className="text-sm">Włącz powiadmonienia!</span>
      </button>
    </div>
  );
}

export const unregisterServiceWorkers = async () => {
  const registrations = await navigator.serviceWorker.getRegistrations();
  await Promise.all(registrations.map((r) => r.unregister()));
};

const registerServiceWorker = async () => {
  return navigator.serviceWorker.register("/service.js");
};

const subscribe = async () => {
  await unregisterServiceWorkers();

  const swRegistration = await registerServiceWorker();
  await window?.Notification.requestPermission();

  try {
    const options = {
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
      userVisibleOnly: true,
    };
    const subscription = await swRegistration.pushManager.subscribe(options);

    await saveSubscription(subscription);

    console.log({ subscription });
  } catch (err) {
    console.error("Error", err);
  }
};

const saveSubscription = async (subscription: PushSubscription) => {
  const ORIGIN = window.location.origin;
  const BACKEND_URL = `${ORIGIN}/api/push`;

  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription),
  });
  return response.json();
};
