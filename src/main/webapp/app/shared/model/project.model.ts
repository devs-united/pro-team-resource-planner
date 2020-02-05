import { Moment } from 'moment';
import { IEmployee } from 'app/shared/model/employee.model';

export interface IProject {
  id?: number;
  start_date?: Moment;
  end_date?: Moment;
  name?: string;
  description?: string;
  location?: string;
  employee?: IEmployee;
}

export const defaultValue: Readonly<IProject> = {};
