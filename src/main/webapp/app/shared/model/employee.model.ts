import { IAddress } from 'app/shared/model/address.model';
import { IUser } from 'app/shared/model/user.model';

export interface IEmployee {
  id?: number;
  first_name?: string;
  last_name?: string;
  oib?: string;
  bank_account_no?: string;
  address?: IAddress;
  user?: IUser;
}

export const defaultValue: Readonly<IEmployee> = {};
