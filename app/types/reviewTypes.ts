export type Review = {
    id?: string,
    productName: string,
    productId?: string,
    rating: number,
    userId: string,
    userName: string,
    title: string,
    link: string,
    description: string,
    multimedia?: string[],
    store: string,
    country: string,
    price: number,
    upvotes: number,
    flagged: boolean,
    moderationStatus: 'pending' | 'approved' | 'rejected',
    createdAt?: Date,
    updatedAt?: Date,
    deleted: boolean,
    reName?:string,
}

export type ReviewProps = {
    userId?: string;
    productId?: string;
    productName: string;
    empty?: string; //show when reviews not found
};

export type useReviewProps = {
    userId?: string;
    productId?: string;
    productName: string;
}