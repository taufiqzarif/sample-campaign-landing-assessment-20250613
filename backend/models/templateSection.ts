import {
	Table,
	Column,
	Model,
	ForeignKey,
	DataType,
} from "sequelize-typescript";
import { Template } from "./template";
import { Section } from "./section";

@Table({
	timestamps: true,
	modelName: "TemplateSection",
	tableName: "TemplateSections",
})
export class TemplateSection extends Model {
	@ForeignKey(() => Template)
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
	})
	templateId!: number;

	@ForeignKey(() => Section)
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
	})
	sectionId!: number;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	order!: number;
}
