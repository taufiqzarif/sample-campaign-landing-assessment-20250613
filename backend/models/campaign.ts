import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  HasMany,
  BelongsToMany,
  DataType,
} from "sequelize-typescript";
import { Template } from "./template";
import { SectionContent } from "./sectionContent";
import { Product } from "./product";
import { CampaignProduct } from "./campaignProduct";
import {
  BelongsToManyAddAssociationsMixin,
  HasManyAddAssociationMixin,
} from "sequelize";

@Table({
  timestamps: true,
  modelName: "Campaign",
  tableName: "Campaigns",
})
export class Campaign extends Model {
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

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  slug!: string;

  @ForeignKey(() => Template)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  templateId!: number;

  @BelongsTo(() => Template)
  template!: Template;

  @BelongsToMany(() => Product, () => CampaignProduct)
  products!: Product[];

  public addProducts!: BelongsToManyAddAssociationsMixin<Product, number>;

  @HasMany(() => SectionContent)
  contents!: SectionContent[];
}
