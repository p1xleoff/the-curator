import { useQuery } from "@tanstack/react-query";
import {
  fetchReviewById,
  fetchReviewByUser,
  getAllReviews,
  getReview,
  getReviewsByProduct,
  getUserReviews,
} from "../../services/firebase/reviewsServices";
import { Review } from "../../types/reviewTypes";

export const useProductReviews = (productId: string) => {
  return useQuery<Review[], Error>({
    queryKey: ["productReviews", productId],
    queryFn: () => getReviewsByProduct(productId),
    staleTime: 5 * 60 * 1000,
    enabled: !!productId,
  });
};


export const useReviews = (reviewId: string) => {
  return useQuery({
    queryKey: ["review", reviewId],
    queryFn: () => fetchReviewById(reviewId),
  });
};

export const useUserReviews = (userId: string) => {
  return useQuery({
    queryKey: ["review", userId],
    queryFn: () => fetchReviewByUser(userId),
  });
};

export const loadUserReviews = () => {
  return useQuery<Review[], Error>({
    queryKey: ["reviews"],
    queryFn: () => getUserReviews(),
  });
};

export const useAllReviews = () => {
  return useQuery<Review[], Error>({
    queryKey: ['allReviews'],
    queryFn: () => getAllReviews(),
  })
}