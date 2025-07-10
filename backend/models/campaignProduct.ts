import {
	Table,
	Column,
	Model,
	ForeignKey,
	DataType,
} from "sequelize-typescript";
import { Campaign } from "./campaign";
import { Product } from "./product";

@Table({
	timestamps: true,
	modelName: "CampaignProduct",
	tableName: "CampaignProducts",
})
export class CampaignProduct extends Model {
	@ForeignKey(() => Campaign)
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
	})
	campaignId!: number;

	@ForeignKey(() => Product)
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
	})
	productId!: number;
}
