"use client";

import { Suspense } from "react";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

function PagoContent() {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "plan_a";

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-center mb-6">
            Realizar Pago
          </h1>
          <p className="text-center">Plan seleccionado: {plan}</p>
        </div>
      </div>
    </div>
  );
}

export default function PagoPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <PagoContent />
    </Suspense>
  );
}
