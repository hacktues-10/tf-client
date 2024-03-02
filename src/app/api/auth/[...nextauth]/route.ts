import NextAuth from "next-auth";

import { authOptions } from "../options";

type AdapterUser = {
  id: string;
  email: string;
  emailVerified: Date | null;
  name?: string | null;
  image?: string | null;
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
