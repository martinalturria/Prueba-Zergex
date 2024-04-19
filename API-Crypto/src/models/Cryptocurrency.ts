import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Cryptocurrency extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100 })
    name!: string;

    @Column("text")
    ticker!: string;

    @Column("decimal", { precision: 10, scale: 2 })
    purchasePrice!: number;

    @Column("int")
    quantityPurchased!: number;

    @Column("decimal", { precision: 10, scale: 2 })
    investedAmount!: number;
}
