import { ReactNode, Suspense } from "react";

type Props = {
  children: ReactNode;
};

const SuspenseWrapper = ({ children }: Props) => {
  return <Suspense fallback={"Loading..."}>{children}</Suspense>;
};

export default SuspenseWrapper;
