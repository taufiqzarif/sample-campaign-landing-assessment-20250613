import {
	Table,
	Column,
	Model,
	BelongsToMany,
	DataType,
} from "sequelize-typescript";
import { Campaign } from "./campaign";
import { CampaignProduct } from "./campaignProduct";

@Table({
	timestamps: true,
	modelName: "Product",
	tableName: "Products",
})
export class Product extends Model {
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
		type: DataType.DECIMAL(10, 2),
		allowNull: false,
	})
	price!: number;

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	imageUrl?: string;

	@BelongsToMany(() => Campaign, () => CampaignProduct)
	campaigns!: Campaign[];
}
