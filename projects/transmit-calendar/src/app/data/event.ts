import { IParticipant } from './participant';

export interface IEvent {
  id: string;
  dateStart: Date;
  dateEnd: Date;
  title: string;
  description: string;
  participants: IParticipant[];
}
