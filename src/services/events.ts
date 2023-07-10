import { apiCall } from '../integration/api';
import { Events } from '../types/events';
import { HttpMethods } from '../types/http';

export const getEvents = async () => apiCall<Events>(HttpMethods.GET, 'https://d4armory.io/api/events/recent');
