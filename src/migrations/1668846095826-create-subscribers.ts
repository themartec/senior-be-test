import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from 'typeorm'

export class createSubscribers1668846095826 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'subscribers',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true
          },
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ],
      }),
      true
    );

    await queryRunner.createIndex(
      'subscribers',
      new TableIndex({
        name: 'idx_on_user_id_email',
        columnNames: ['user_id', 'email'],
        isUnique: true
      })
    );

    await queryRunner.createForeignKey(
      'subscribers',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('subscribers');
  }
}
