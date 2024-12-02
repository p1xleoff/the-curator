export interface Review {
    id?: string;
    productId: string;
    source: string;
    userId: string;
    title: string;
    description: string;
    multimedia?: string[];
    store: string;
    country: string;
    price: number;
    upvotes: number;
    flagged: boolean;
    moderationStatus: 'pending' | 'approved' | 'rejected';
    createdAt?: Date;
    updatedAt?: Date;
    deleted: boolean;
}