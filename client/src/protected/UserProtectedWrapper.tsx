import { ReactNode, useEffect } from "react";
import { useUserContextHook } from "../context/hooks/useUserContext";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SignUpSchemaTS } from "../lib/schema";
import { userProfile } from "../lib/utils/user/user-query-funtions";

type Props = { children: ReactNode };

export default function UserProtectedWrapper({ children }: Props) {
  const { user } = useUserContextHook();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && !user.email) {
      navigate("/login");
    }
  }, [navigate, token, user.email]);

  // Fetch user profile data
  const { isLoading, isError, data } = useQuery<{
    data: SignUpSchemaTS;
  }>({
    queryKey: ["userprofile"],
    queryFn: userProfile,
    enabled: !!token,
  });

  useEffect(() => {
    if (!isLoading && (!data?.data || isError)) {
      localStorage.removeItem(token!);
      navigate("/login");
    }
  }, [isLoading, isError, data, navigate, token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
