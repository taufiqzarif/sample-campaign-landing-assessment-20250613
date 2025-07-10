import {
	Table,
	Column,
	Model,
	BelongsToMany,
	HasMany,
	DataType,
} from "sequelize-typescript";
import { Template } from "./template";
import { TemplateSection } from "./templateSection";
import { SectionContent } from "./sectionContent";

@Table({
	timestamps: true,
	modelName: "Section",
	tableName: "Sections",
})
export class Section extends Model {
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
		type: DataType.ENUM("hero", "product-list", "footer"),
		allowNull: false,
	})
	type!: "hero" | "product-list" | "footer";

	@BelongsToMany(() => Template, () => TemplateSection)
	templates!: Template[];

	@HasMany(() => SectionContent)
	contents!: SectionContent[];
}
