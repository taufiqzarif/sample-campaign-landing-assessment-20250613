import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
} from "sequelize-typescript";
import { Campaign } from "./campaign";
import { Section } from "./section";

@Table({
  timestamps: true,
  modelName: "SectionContent",
  tableName: "SectionContents",
})
export class SectionContent extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Campaign)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  campaignId!: number;

  @ForeignKey(() => Section)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  sectionId!: number;

  @Column({
    type: DataType.ENUM("en", "my", "cn"),
    allowNull: false,
  })
  language!: "en" | "my" | "cn";

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content!: string;

  @BelongsTo(() => Campaign)
  campaign!: Campaign;

  @BelongsTo(() => Section)
  section!: Section;
}
