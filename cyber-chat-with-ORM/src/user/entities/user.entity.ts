// Create a User entity with at least: id, username (unique), and passwordHash
import * as bcrypt from 'bcrypt';
import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 120, unique: true })
  username: string;

  @Column()
  passwordHash: string;
  password?: string;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.passwordHash = await bcrypt.hash(this.password, 10);
    }
  }
}
