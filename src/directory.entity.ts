import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Directory {
  @PrimaryColumn({
    type: 'uuid',
  })
  id: string;
  @Column({
    type: 'varchar',
    unique: true,
  })
  name: string;
  @Column('varchar', {
    array: true,
  })
  emails: string[];
}
