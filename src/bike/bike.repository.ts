import { EntityRepository } from '@mikro-orm/mysql';
import { Bike } from './bike.entity';

export class BikeRepository extends EntityRepository<Bike> {

}
