import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export const useUpvote = (reviewId: string) => {
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [upvotes, setUpvotes] = useState<number | null>(null);
  const userId = auth().currentUser?.uid;

  useEffect(() => {
    if (!reviewId || !userId) return;

    const fetchUpvoteState = async () => {
      try {
        // Check if the user has upvoted
        const userUpvoteDoc = await firestore()
          .collection("reviews")
          .doc(reviewId)
          .collection("upvotes")
          .doc(userId)
          .get();

        setHasUpvoted(userUpvoteDoc.exists);

        // Fetch the `upvotes` field from the parent document
        const reviewDoc = await firestore().collection("reviews").doc(reviewId).get();
        setUpvotes(reviewDoc.data()?.upvotes || 0);
      } catch (error) {
        console.error("Failed to fetch upvote state:", error);
      }
    };

    fetchUpvoteState();
  }, [reviewId, userId]);

  const toggleUpvote = async () => {
    if (!reviewId || !userId) return;

    const reviewRef = firestore().collection("reviews").doc(reviewId);
    const upvoteRef = reviewRef.collection("upvotes").doc(userId);

    try {
      await firestore().runTransaction(async (transaction) => {
        const reviewDoc = await transaction.get(reviewRef);
        if (!reviewDoc.exists) throw new Error("Review does not exist");

        let newUpvotes = reviewDoc.data()?.upvotes || 0;

        if (hasUpvoted) {
          // Undo upvote
          transaction.delete(upvoteRef);
          newUpvotes -= 1;
        } else {
          // Add upvote
          transaction.set(upvoteRef, { timestamp: firestore.FieldValue.serverTimestamp() });
          newUpvotes += 1;
        }

        // Update the `upvotes` field in the parent document
        transaction.update(reviewRef, { upvotes: newUpvotes });

        // Update local state
        setHasUpvoted(!hasUpvoted);
        setUpvotes(newUpvotes);
      });
    } catch (error) {
      console.error("Failed to toggle upvote:", error);
    }
  };

  return { hasUpvoted, toggleUpvote, upvotes };
};

