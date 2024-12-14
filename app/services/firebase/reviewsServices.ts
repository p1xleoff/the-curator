import firestore from "@react-native-firebase/firestore";
import { Review } from "../../types/reviewTypes";
import auth from "@react-native-firebase/auth";

const reviewsCollection = firestore().collection("reviews");

//function to add a review
export const addReview = async (review: Review): Promise<void> => {
  try {
    const user = auth().currentUser;
    if (!user) throw new Error("user not logged in");
    const reviewData = {
      ...review,
      userId: user.uid,
      userName: user.displayName,
      createdAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp(),
    };
    await firestore().collection("reviews").add(reviewData);
    console.log("review added successfully");
  } catch (error) {
    console.error("Error adding review", error);
    throw error;
  }
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
export const getReviewsByProduct = async (
  productId: string
): Promise<Review[]> => {
  const reviewsQuery = reviewsCollection
    .where("productId", "==", productId)
    .where("deleted", "==", false)
    .where("moderationStatus", "==", "approved");

  const querySnapshot = await reviewsQuery.get();

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Review[];
};

//fetch reviews by a user
export const getUserReviews = async (): Promise<Review[]> => {
  try {
    const user = auth().currentUser;
    if (!user) throw new Error("User not logged in");

    const querySnapshot = await firestore()
      .collection("reviews")
      .where("userId", "==", user.uid)
      .get();

    const reviews = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Review[];
    return reviews;
  } catch (error) {
    console.error("Error fetching user reviews", error);
    throw error;
  }
};

//fetch a review by id
export const fetchReviewById = async (
  reviewId: string
): Promise<Review | null> => {
  try {
    const doc = await firestore().collection("reviews").doc(reviewId).get();
    if (!doc.exists) return null;

    return { id: doc.id, ...doc.data() } as Review;
  } catch (error) {
    console.error("Error fetching review:", error);
    throw error;
  }
};

export const fetchReviewByUser = async (userId: string): Promise<Review[]> => {
  try {
    const querySnapshot = await reviewsCollection
      .where("userId", "==", userId)
      .get();

    const reviews = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Review[];
    return reviews;
  } catch (error) {
    console.error("Error fetching review:", error);
    throw error;
  }
};

//fetch all reviews from the firestore
export const getAllReviews = async (): Promise<Review[] | null> => {
  try {
    const querySnapshot = await reviewsCollection.get();
    const reviews = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Review[];
    return reviews;
  } catch (error) {
    console.error("Error fetching reviews", error);
    throw error;
  }
};
