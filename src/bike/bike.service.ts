import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { IBikeData, IBikeRO } from './bike.interface';
import { EntityManager, FilterQuery } from '@mikro-orm/core';
import { BikeRepository } from './bike.repository';
import { CreateBikeDto } from './dto/create-bike.dto';
import { Bike } from './bike.entity';

@Injectable()
export class BikeService {
  constructor(
    private readonly bikeRepository: BikeRepository,
    private readonly em: EntityManager,
  ) { }

  async findAll(): Promise<IBikeData[]> {
    return this.bikeRepository.findAll();
  }

  // async findOne(options?: FilterQuery<User>): Promise<IBikeRO> {
  //   const user = await this.userRepository.findOne(options);
  //   delete user.id;

  //   if (user) {
  //     delete user.password;
  //   }

  //   return { bike: user };
  // }

  // async findBike(id: number, followingUsername: string): Promise<IBikeRO> {
  //   const foundBike = await this.userRepository.findOne({ username: followingUsername }, {
  //     populate: ['followers'],
  //   });
  //   const follower = this.userRepository.getReference(id);

  //   if (!foundBike) {
  //     return;
  //   }

  //   const bike: IBikeData = {
  //     bio: foundBike.bio,
  //     image: foundBike.image,
  //     username: foundBike.username,
  //     following: foundBike.followers.contains(follower),
  //   };

  //   return { bike };
  // }

  async postBike(bikeDataDto: CreateBikeDto, image: Express.Multer.File): Promise<IBikeData> {
    // if (!followerEmail || !username) {
    //   throw new HttpException('Follower email and username not provided.', HttpStatus.BAD_REQUEST);
    // }

    // const followingUser = await this.userRepository.findOne({ username }, {
    //   populate: ['followers'],
    // });
    // const followerUser = await this.userRepository.findOne({ name: name });

    // if (followingUser.email === followerEmail) {
    //   throw new HttpException('FollowerEmail and FollowingId cannot be equal.', HttpStatus.BAD_REQUEST);
    // }

    // followingUser.followers.add(followerUser);
    // await this.em.flush();

    const bikeData: IBikeData = {
      name: bikeDataDto.name,
      type: bikeDataDto.type,
      price: bikeDataDto.price,
    };
    const base64image = image.buffer.toString('base64')
    const bike: Bike = new Bike(bikeData.name, bikeData.type, bikeData.price, base64image);
    console.log(bike);
    const response = this.em.persistAndFlush(bike);
    console.log(response);
    return bikeData;
  }

  // async unFollow(followerId: number, username: string): Promise<IBikeRO> {
  //   if (!followerId || !username) {
  //     throw new HttpException('FollowerId and username not provided.', HttpStatus.BAD_REQUEST);
  //   }

  //   const followingUser = await this.userRepository.findOne({ username }, {
  //     populate: ['followers'],
  //   });
  //   const followerUser = this.userRepository.getReference(followerId);

  //   if (followingUser.id === followerId) {
  //     throw new HttpException('FollowerId and FollowingId cannot be equal.', HttpStatus.BAD_REQUEST);
  //   }

  //   followingUser.followers.remove(followerUser);
  //   await this.em.flush();

  //   const bike: IBikeData = {
  //     bio: followingUser.bio,
  //     following: false,
  //     image: followingUser.image,
  //     username: followingUser.username,
  //   };

  //   return { bike };
  // }
}
