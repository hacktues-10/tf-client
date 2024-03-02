import { getHTSession } from "./session";

export const IfHTSession = async ({ children }: React.PropsWithChildren) => {
  const session = await getHTSession();
  return session ? <>{children}</> : null;
};

export const IfNotHTSession = async ({ children }: React.PropsWithChildren) => {
  const session = await getHTSession();
  return session ? null : <>{children}</>;
};
