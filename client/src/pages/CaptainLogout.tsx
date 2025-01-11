import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCaptainContextHook } from "../context/hooks/useCaptainContext";
import { captainLogout } from "../lib/utils/captain/captain-query-funtions";

type Props = {};

export default function CaptainLogout({}: Props) {
  const navigate = useNavigate();
  const { setCaptain } = useCaptainContextHook();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation<{ message: string }, Error>({
    mutationKey: ["captainlogout"],
    mutationFn: () => captainLogout(),
    onSuccess: (success) => {
      setCaptain({
        fullname: { firstname: "", lastname: "" },
        email: "",
        password: "",
        soketId: "",
        status: "inactive",
        location: { lat: 0, lng: 0 },
        vehicle: {
          capacity: 1,
          vehicleType: "motorcycle",
          color: "",
          plate: "",
        },
      });
      queryClient.invalidateQueries({ queryKey: ["captainsignup"] });
      queryClient.invalidateQueries({ queryKey: ["captainlogin"] });
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
        navigate("/captain-login");
      }
    };

    logout();
  }, [mutateAsync, navigate]);

  return <div>captain logout</div>;
}
