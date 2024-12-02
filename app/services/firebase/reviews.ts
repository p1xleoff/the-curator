import firestore from "@react-native-firebase/firestore";
import { Review } from "../../types/reviewTypes";

const reviewsCollection = firestore().collection("reviews");

//function to add a review
export const addReview = async (
  review: Omit<Review, "id" | "createdAt" | "updatedAt">
) => {
  const reviewRef = await reviewsCollection.add({
    ...review,
    upvotes: 0,
    flagged: false,
    deleted: false,
    moderationStatus: "approved",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return reviewRef.id;
};

//function to edit/update a review
export const updateReview = async (
  reviewId: string,
  updates: Partial<Review>
) => {
  const reviewRef = reviewsCollection.doc(reviewId);
  await reviewRef.update({
    ...updates,
    updatedAt: new Date(),
  });
};

//delete a review (soft delete, can be undone)
export const deleteReview = async (reviewId: string) => {
  const reviewRef = reviewsCollection.doc(reviewId);
  await reviewRef.update({
    deleted: true,
    updatedAt: new Date(),
  });
};

//get a single review from the doc
export const getReview = async (reviewId: string) => {
  const reviewRef = reviewsCollection.doc(reviewId);
  const reviewSnap = await reviewRef.get();
  return reviewSnap.exists ? reviewSnap.data() : null;
};

//get all availble reviews for a product
export const getReviewsByProduct = async (productId: string) => {
  const reviewsQuery = reviewsCollection
    .where("productId", "==", productId)
    .where("deleted", "==", false)
    .where("moderationStatus", "==", "approved")
    .orderBy("upvotes", "desc");

  const querySnapshot = await reviewsQuery.get();

  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
