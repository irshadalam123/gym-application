import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Analytics() {
  return (
    <div className="space-y-6 pb-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-8 sm:p-12 text-center"
      >
        <h1 className="text-2xl font-bold text-white uppercase tracking-tight mb-2">
          Analytics
        </h1>
        <p className="text-zinc-400 max-w-md mx-auto mb-6">
          All analytics, charts, and insights have been moved to the Dashboard for a
          unified view. View revenue trends, membership by plan, check-ins, and more in
          one place.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
        >
          Go to Dashboard
        </Link>
      </motion.section>
    </div>
  );
}
