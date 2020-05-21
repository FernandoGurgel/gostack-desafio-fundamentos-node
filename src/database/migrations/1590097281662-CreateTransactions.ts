import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateTransactions1590097281662
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'value',
            type: 'float4',
            isNullable: false,
          },
          {
            name: 'type',
            enum: ['outcome', 'income'],
            enumName: 'status',
            type: 'enum',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transactions');
  }
}
