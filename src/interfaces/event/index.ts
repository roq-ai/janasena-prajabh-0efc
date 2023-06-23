import { JanasenaInterface } from 'interfaces/janasena';
import { GetQueryInterface } from 'interfaces';

export interface EventInterface {
  id?: string;
  name: string;
  date: any;
  location: string;
  janasena_id: string;
  created_at?: any;
  updated_at?: any;

  janasena?: JanasenaInterface;
  _count?: {};
}

export interface EventGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  location?: string;
  janasena_id?: string;
}
