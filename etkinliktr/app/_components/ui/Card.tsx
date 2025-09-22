import React from "react";

export default function Card({
  children,
  className,
  header,
  footer,
}: {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className={`bg-white border border-gray-200 rounded-xl shadow-sm ${className || ""}`}>
      {header ? <div className="px-6 py-4 border-b border-gray-200">{header}</div> : null}
      <div className="px-0 py-0">{children}</div>
      {footer ? <div className="px-6 py-4 border-t border-gray-200">{footer}</div> : null}
    </div>
  );
}
