import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { Review } from "../../types/reviewTypes";

export const useSearchReviews = (query: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!query) {
      setReviews([]);
      setLoading(false);
      return;
    }

    const fetchReviews = async () => {
      setLoading(true);

      try {
        const normalizedQuery = query.toLowerCase();

        // Fetch reviews where normalizedProductName contains a broad match
        const reviewsSnapshot = await firestore()
          .collection("reviews")
          .get();

        const allReviews = reviewsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Review),
        }));

        // Filter reviews locally for substring matches (case-insensitive)
        const filteredReviews = allReviews.filter((review) =>
          review.reName?.includes(normalizedQuery)
        );

        setReviews(filteredReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [query]);

  return { reviews, loading };
};