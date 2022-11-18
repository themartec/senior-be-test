import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class createUsers1668767339148 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
              name: 'users',
              columns: [
                  {
                      name: 'id',
                      type: 'int',
                      isPrimary: true,
                      isGenerated: true
                  },
                  {
                      name: 'email',
                      type: 'varchar',
                      isNullable: false
                  },
                  {
                      name: 'access_token',
                      type: 'text',
                      isNullable: false
                  },
                  {
                      name: 'refresh_token',
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
          'users',
          new TableIndex({
              name: 'idx_on_email',
              columnNames: ['email']
          })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }
}
