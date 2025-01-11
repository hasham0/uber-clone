import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { userLogout } from "../lib/utils/user/user-query-funtions";
import { useNavigate } from "react-router-dom";
import { useUserContextHook } from "../context/hooks/useUserContext";
import toast from "react-hot-toast";

type Props = {};

export default function UserLogout({}: Props) {
  const navigate = useNavigate();
  const { setUser } = useUserContextHook();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation<{ message: string }, Error>({
    mutationKey: ["logout"],
    mutationFn: () => userLogout(),
    onSuccess: (success) => {
      setUser({
        fullname: {
          firstname: "",
          lastname: "",
        },
        email: "",
        password: "",
      });
      queryClient.invalidateQueries({ queryKey: ["signup"] });
      queryClient.invalidateQueries({ queryKey: ["signin"] });
      return success;
    },
    onError: (error) => {
      return error;
    },
  });

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await mutateAsync();
        const { message } = response;
        toast.success(message);
      } catch (error) {
        console.error("Error during logout:", error);
      } finally {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    logout();
  }, [mutateAsync, navigate]);

  return <div>UserLogout</div>;
}
