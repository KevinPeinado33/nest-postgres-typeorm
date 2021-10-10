import {MigrationInterface, QueryRunner} from "typeorm";

export class createCategories1633835229552 implements MigrationInterface {
    name = 'createCategories1633835229552'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categorys" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_9a7e5e363f8590fc5dadb71751d" UNIQUE ("name"), CONSTRAINT "PK_806896a0a29595c702235036597" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products_categories_categorys" ("productsId" integer NOT NULL, "categorysId" integer NOT NULL, CONSTRAINT "PK_48a0486468b93cd36617086ff76" PRIMARY KEY ("productsId", "categorysId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c91d1508a2b0d10f786624c9e7" ON "products_categories_categorys" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_723432f13b653d1d5d0571af24" ON "products_categories_categorys" ("categorysId") `);
        await queryRunner.query(`ALTER TABLE "products_categories_categorys" ADD CONSTRAINT "FK_c91d1508a2b0d10f786624c9e7a" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_categories_categorys" ADD CONSTRAINT "FK_723432f13b653d1d5d0571af24f" FOREIGN KEY ("categorysId") REFERENCES "categorys"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_categories_categorys" DROP CONSTRAINT "FK_723432f13b653d1d5d0571af24f"`);
        await queryRunner.query(`ALTER TABLE "products_categories_categorys" DROP CONSTRAINT "FK_c91d1508a2b0d10f786624c9e7a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_723432f13b653d1d5d0571af24"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c91d1508a2b0d10f786624c9e7"`);
        await queryRunner.query(`DROP TABLE "products_categories_categorys"`);
        await queryRunner.query(`DROP TABLE "categorys"`);
    }

}
