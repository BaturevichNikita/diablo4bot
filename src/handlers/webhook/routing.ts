import { Routes } from '../../types/routing';
import { scheduleCommand } from '../schedule';

export const routes: Routes = {
  '/schedule': scheduleCommand,
};
