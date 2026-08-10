"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  routeAccessMap,
  DEFAULT_REDIRECT,
  UNAUTHORIZED_REDIRECT,
} from "@/lib/roleAccess";
import { useUserContext } from "@/context/UserContext";

export function useAuthGuard() {
  // const router = useRouter();
  // const pathname = usePathname();
  // const { user, token, loading: contextLoading } = useUserContext();

  // const [loading, setLoading] = useState(true);
  // const [allowed, setAllowed] = useState(false);

  // useEffect(() => {
  //   if (contextLoading) return;

  //   if (!user || !token) {
  //     router.replace(DEFAULT_REDIRECT);
  //     return;
  //   }

  //   const userRole = user.role;
  //   let matched = false;

  //   for (const pattern in routeAccessMap) {
  //     const regex = new RegExp(pattern);
  //     if (regex.test(pathname)) {
  //       matched = true;
  //       const allowedRoles = routeAccessMap[pattern];

  //       if (allowedRoles.includes(userRole)) {
  //         setAllowed(true);
  //       } else {
  //         router.replace(UNAUTHORIZED_REDIRECT);
  //       }

  //       break;
  //     }
  //   }

  //   if (!matched) {
  //     router.replace("/not-found");
  //   }

  //   setLoading(false);
  //   // }, [pathname, router, user, token, contextLoading]);
  // }, []);

  // return { loading: loading || contextLoading, allowed };
  return { loading: false, allowed: true };
}
