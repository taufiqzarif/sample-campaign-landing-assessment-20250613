import {
  Table,
  Column,
  Model,
  HasMany,
  BelongsToMany,
  DataType,
} from "sequelize-typescript";
import { Campaign } from "./campaign";
import { Section } from "./section";
import { TemplateSection } from "./templateSection";
import {
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
} from "sequelize";

@Table({
  timestamps: true,
  modelName: "Template",
  tableName: "Templates",
})
export class Template extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @HasMany(() => Campaign)
  campaigns!: Campaign[];

  @BelongsToMany(() => Section, () => TemplateSection)
  sections!: Section[];

  public addSection!: BelongsToManyAddAssociationMixin<Section, number>;
}
