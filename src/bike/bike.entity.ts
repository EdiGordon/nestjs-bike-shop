import { ArrayType, Collection, Entity, EntityDTO, EntityRepositoryType, ManyToOne, OneToMany, PrimaryKey, Property, wrap } from '@mikro-orm/core';
import slug from 'slug';

// import { User } from '../user/user.entity';
// import { Comment } from './comment.entity';
import { BikeRepository } from './bike.repository';

@Entity({ customRepository: () => BikeRepository })
export class Bike {

  [EntityRepositoryType]?: BikeRepository;

  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @Property()
  type: string;

  @Property()
  price: number;

  @Property()
  image: string;


  // @Property()
  // createdAt = new Date();

  // @Property({ onUpdate: () => new Date() })
  // updatedAt = new Date();


  constructor(name: string, type: string, price: number, image: string) {
    this.name = name;
    this.type = type;
    this.price = price;
    this.image = image;
  }

  // toJSON(user?: User) {
  //   const o = wrap<Article>(this).toObject() as ArticleDTO;
  //   o.favorited = user && user.favorites.isInitialized() ? user.favorites.contains(this) : false;
  //   o.author = this.author.toJSON(user);

  //   return o;
  // }

}

// export interface ArticleDTO extends EntityDTO<Article> {
//   favorited?: boolean;
// }
