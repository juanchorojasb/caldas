"use client";

import { useUser } from "@clerk/nextjs";
import { Clock, CheckCircle, MessageCircle, ArrowRight } from "lucide-react";

export default function ConfirmacionPage() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold mb-4">¡Pago Procesado!</h1>
          <p className="text-gray-600">Gracias por tu pago. En breve verificaremos la información.</p>
        </div>
      </div>
    </div>
  );
}
