async function getHealth() {
  const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
  try {
    const res = await fetch(`${base}/health`, { cache: "no-store" });
    if (!res.ok) throw new Error(`status ${res.status}`);
    return res.json() as Promise<{ status: string; message: string }>;
  } catch (e) {
    return { status: "down", message: (e as Error).message };
  }
}

export default async function HealthPage() {
  const health = await getHealth();
  const ok = health.status === "ok";

  return (
    <main className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow">
        <h1 className="text-2xl font-bold">Status do Backend</h1>
        <p className="mt-3 text-sm text-gray-600">
          Checando <code className="px-1 py-0.5 rounded bg-gray-100">/health</code> em{" "}
          <code className="px-1 py-0.5 rounded bg-gray-100">
            {process.env.NEXT_PUBLIC_API_URL}
          </code>
        </p>

        <div className={`mt-5 rounded-xl p-4 ${ok ? "bg-green-50" : "bg-red-50"}`}>
          <div className="text-lg font-medium">
            {ok ? "✅ API conectada" : "❌ API indisponível"}
          </div>
          <div className="mt-1 text-sm text-gray-700">{health.message}</div>
        </div>
      </div>
    </main>
  );
}