import React from "react";

const Button = ({ className, title, ...props }) => (
  <button className={className} {...props}>
    {title}
  </button>
);

export const DefaultBtn = ({ title, ...props }) => (
  <Button className="defaultBtn" title={title} {...props} />
);
export const WarningBtn = ({ title, ...props }) => (
  <Button className="warningBtn" title={title} {...props} />
);
