import React from "react";
import Calendar from "./components/Calendar";

export default function Home() {
  return (
    <main className="min-h-[100vh] flex items-center justify-center">
      <div>
        <div>
          <h1 className="text-xl">📆 Calendari.os UC</h1>
        </div>
      </div>
      <section className="w-full h-full max-h-full">
        <Calendar />
      </section>
    </main>
  );
}
