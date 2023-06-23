import { UserInterface } from 'interfaces/user';
import { JanasenaInterface } from 'interfaces/janasena';
import { GetQueryInterface } from 'interfaces';

export interface SuggestionInterface {
  id?: string;
  description: string;
  citizen_id: string;
  janasena_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  janasena?: JanasenaInterface;
  _count?: {};
}

export interface SuggestionGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  citizen_id?: string;
  janasena_id?: string;
}
