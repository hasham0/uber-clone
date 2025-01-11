import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCaptainContextHook } from "../context/hooks/useCaptainContext";
import { useQuery } from "@tanstack/react-query";
import { captainProfile } from "../lib/utils/captain/captain-query-funtions";
import Loading from "../components/loading";
import { SignUpSchemaCaptainTS } from "../lib/schema";

type Props = { children: ReactNode };

export default function CaptainProtectedWrapper({ children }: Props) {
  const { captain } = useCaptainContextHook();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && !captain) {
      navigate("/captain-login");
    }
  }, [navigate, token, captain]);

  // Fetch captain profile data
  const { isLoading, isError, data } = useQuery<{
    data: SignUpSchemaCaptainTS;
  }>({
    queryKey: ["captainprofile"],
    queryFn: captainProfile,
    enabled: !!token,
  });

  useEffect(() => {
    if (!isLoading && (!data?.data || isError)) {
      localStorage.removeItem(token!);
      navigate("/captain-login");
    }
  }, [isLoading, isError, data, navigate, token]);

  if (isLoading) {
    return <Loading />;
  }

  return <>{children}</>;
}
