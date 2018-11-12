import {Application} from './application.model';
import {Contact} from './contact.model';

export interface ApplicationContact {
  application: Application[];
  contact: Contact[];
  active_sw: boolean;
}
