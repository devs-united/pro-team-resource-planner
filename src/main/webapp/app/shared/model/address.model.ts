export interface IAddress {
  id?: number;
  street?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string;
}

export const defaultValue: Readonly<IAddress> = {};
