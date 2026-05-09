import type { ParaghProps } from "../features/types/Text";

export const Paragh = ({ title }: ParaghProps) => {
  return <p className="paragh">{title}</p>;
};
