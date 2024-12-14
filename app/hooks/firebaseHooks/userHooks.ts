import { useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../../services/firebase/userServices";
import { useQuery } from "@tanstack/react-query";

export const loadCurrentUser = () => {
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const currentUser = auth().currentUser;
      if (currentUser) {
        const profile = await fetchUserProfile(currentUser.uid);
        setUserData(profile);
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const updateProfile = async (data: Partial<any>) => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      await updateUserProfile(currentUser.uid, data);
      setUserData((prev) => ({ ...prev, ...data }));
    }
  };

  return { userData, loading, updateProfile };
};

export const loadUserProfile = (userId: string) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserProfile(userId),
    enabled: !!userId,
  });
};
