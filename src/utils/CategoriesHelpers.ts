import CategorieModel from '../library/Categorielnterface';
import { Comic } from '../entity/Comic';
import { Event } from '../entity/Event';
import { Series } from '../entity/Series';
import { Story } from '../entity/Story';

export enum Categorie {
    'comic' = 'Comic',
    'event' = 'Event',
    'serie' = 'Serie',
    'storie' = 'Storie'
  }

export default function identical(Object: CategorieModel, ObjectRegistered) {
  return (
    Object.title === ObjectRegistered.title &&
    Object.description === ObjectRegistered.description &&
    Object.thumb === ObjectRegistered.thumb
  );
}

