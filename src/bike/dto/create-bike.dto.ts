import { ApiProperty } from "@nestjs/swagger";

export class CreateBikeDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly price: number;

  @ApiProperty()
  readonly type: string;
  // readonly tagList: string[];
}
