"use client";

import Link from "next/link";
import type { Route } from "next";
import React from "react";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
};

export default function PageHeader({ title, subtitle, action, className }: PageHeaderProps) {
  return (
    <div className={`bg-white border border-gray-200 rounded-xl shadow-sm ${className || ""}`}>
      <div className="container mx-auto max-w-7xl px-6 py-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
      </div>
    </div>
  );
}
