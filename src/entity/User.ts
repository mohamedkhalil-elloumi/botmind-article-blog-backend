import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Article } from "./Article";

//setup users table model
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ length: 128, select: false })
  password: string;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  createdAt: string;

  @OneToMany(() => Article, (article) => article.user, { cascade: true })
  @JoinColumn()
  articles: Article;
}
