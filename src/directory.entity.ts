import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Directory {
  @PrimaryColumn({
    type: 'uuid',
  })
  id: string;
  @Column({
    type: 'varchar',
  })
  name: string;
  @Column('varchar', {
    array: true,
  })
  emails: string[];
}
