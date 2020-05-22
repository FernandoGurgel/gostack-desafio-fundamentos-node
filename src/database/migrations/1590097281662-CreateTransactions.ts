import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateTransactions1590097281662
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('create schema IF NOT EXISTS "transaction"');
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
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
          {
            name: 'create_at',
            type: 'timestamp with time zone',
            isNullable: false,
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transactions');
  }
}
