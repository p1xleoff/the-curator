import { useState, useEffect } from "react";
import { UserProfile } from "../../types/userTypes";
import firestore from "@react-native-firebase/firestore";

//function to create user profile doc in firestore
export const createFirestoreUser = async (user: UserProfile) => {
  try {
    await firestore().collection("users").doc(user.id).set(user);
    console.log("user document created in firestore");
  } catch (error) {
    console.error("Error creating user doc in firebase", error);
    throw error;
  }
};

export const fetchUserProfile = async (uid: string) => {
  try {
    const userDoc = await firestore().collection("users").doc(uid).get();
    return userDoc.exists ? userDoc.data() : null;
  } catch (error) {
    console.error("Error fetching user profile", error);
    throw error;
  }
};

export const updateUserProfile = async (uid: string, data: any) => {
  try {
    await firestore().collection("users").doc(uid).update(data);
  } catch (error) {
    console.error("Error updating user profile", error);
    throw error;
  }
};

export const useUserProfile = (userId: string | undefined) => {
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!userId) return;

    const fetchUserProfile = async () => {
      setLoading(true);

      try {
        // Fetch user profile
        const userDoc = await firestore().collection("users").doc(userId).get();
        const userData = userDoc.exists ? userDoc.data() : null;

        if (!userData) {
          setProfile(null);
          setLoading(false);
          return;
        }

        // Fetch number of reviews
        const reviewsSnapshot = await firestore()
          .collection("reviews")
          .where("userId", "==", userId)
          .get();
        const numberOfReviews = reviewsSnapshot.size;

        // Calculate total upvotes
        let upvotes = 0;
        reviewsSnapshot.forEach((reviewDoc) => {
          upvotes += reviewDoc.data().upvotes || 0;
        });

        // Combine profile data
        setProfile({
          ...userData,
          numberOfReviews,
          upvotes,
        });
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  return { profile, loading };
};
