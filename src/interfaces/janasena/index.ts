import { EventInterface } from 'interfaces/event';
import { SuggestionInterface } from 'interfaces/suggestion';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface JanasenaInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  event?: EventInterface[];
  suggestion?: SuggestionInterface[];
  user?: UserInterface;
  _count?: {
    event?: number;
    suggestion?: number;
  };
}

export interface JanasenaGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
