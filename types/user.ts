type Subscription = {
  planName: string;
  subscribedOn: Date;
  payPer: 'month' | 'quarter' | 'semiyear' | 'year';
}

export type User = {
  _id: string;
  isAdmin: boolean;
  imageUrl: string;
  fullName: string;
  email: string;

  totalProjectCount: number;

  subscription?: Subscription;
};