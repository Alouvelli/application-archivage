import fs from 'fs/promises';
import path from 'path';

const INPUT_DIR = path.resolve('.jhipster');
const OUTPUT_FILE = path.resolve('src/main/resources/config/liquibase/changelog/20250212_fake-data.xml');
const CSV_BASE = 'config/liquibase/fake-data';

const toChangeSetId = tableName => `fake-data-${tableName}`;

const run = async () => {
  const files = (await fs.readdir(INPUT_DIR)).filter(file => file.endsWith('.json')).sort();
  const parts = [];
  parts.push('<?xml version="1.0" encoding="UTF-8"?>');
  parts.push('<databaseChangeLog xmlns="http://www.liquibase.org/xml/ns/dbchangelog"');
  parts.push('    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"');
  parts.push('    xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-3.8.xsd">');
  parts.push('');

  for (const file of files) {
    const json = JSON.parse(await fs.readFile(path.join(INPUT_DIR, file), 'utf8'));
    const entityName = json.name;
    const tableName = json.entityTableName ?? entityName?.toLowerCase();
    if (!entityName || !tableName) {
      continue;
    }
    const csvPath = `${CSV_BASE}/${entityName}.csv`;
    parts.push(`    <changeSet id="${toChangeSetId(tableName)}" author="codex">`);
    parts.push(`        <loadData file="${csvPath}" tableName="${tableName}" separator="," encoding="UTF-8"/>`);
    parts.push('    </changeSet>');
    parts.push('');
  }

  parts.push('</databaseChangeLog>');
  const content = parts.join('\n');
  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
  await fs.writeFile(OUTPUT_FILE, content, 'utf8');
  console.log(`Generated ${OUTPUT_FILE}`);
};

run().catch(err => {
  console.error(err);
  process.exit(1);
});
