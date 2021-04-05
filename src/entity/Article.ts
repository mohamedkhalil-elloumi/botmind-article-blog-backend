import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

//setup users table model
@Entity()
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  createdAt: string;

  /**
   * Since we already put a one-to-many in users entity then in articles we use
   * Many-to-One relation and name the column of reference user_id whilst adding
   * the option onDelete:"CASCADE" to be coherence with users entity
   */
  @ManyToOne(() => User, (user) => user.articles, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: User;
}
