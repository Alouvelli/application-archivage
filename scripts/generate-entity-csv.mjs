import fs from 'fs/promises';
import path from 'path';

const INPUT_DIR = path.resolve('.jhipster');
const OUTPUT_DIR = path.resolve('src/main/resources/config/liquibase/fake-data');

const ensureDir = async dir => {
  await fs.mkdir(dir, { recursive: true });
};

const listJsonFiles = async () => {
  const entries = await fs.readdir(INPUT_DIR);
  return entries.filter(file => file.endsWith('.json'));
};

const sampleValue = (field, idx) => {
  const { fieldType, fieldName } = field;
  const base = idx + 1;
  switch (fieldType) {
    case 'String':
    case 'UUID':
    case 'TextBlob':
    case 'AnyBlob':
    case 'ImageBlob':
    case 'Blob':
      return `${fieldName}_${base}`;
    case 'Integer':
    case 'Long':
    case 'Float':
    case 'Double':
    case 'BigDecimal':
      return base;
    case 'Boolean':
      return base % 2 === 0 ? 'true' : 'false';
    case 'LocalDate':
      return `2024-0${Math.min(9, base)}-01`;
    case 'Instant':
    case 'ZonedDateTime':
      return `2024-0${Math.min(9, base)}-01T00:00:00Z`;
    case 'Duration':
      return `PT${base}H`;
    default:
      return `${fieldName}_${base}`;
  }
};

const toSnakeCase = str =>
  str
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[-\s]+/g, '_')
    .toLowerCase();

const buildHeaders = (fields, relationships) => {
  const fieldHeaders = fields.map(field => toSnakeCase(field.fieldName));
  const relHeaders = relationships
    .filter(rel => rel.ownerSide !== false && rel.relationshipType?.toLowerCase().includes('many-to-one'))
    .map(rel => `${toSnakeCase(rel.relationshipName)}_id`);
  return ['id', ...fieldHeaders, ...relHeaders];
};

const buildRows = (fields, relationships, rows = 3) => {
  const headers = buildHeaders(fields, relationships);
  const rels = relationships.filter(rel => rel.ownerSide !== false && rel.relationshipType?.toLowerCase().includes('many-to-one'));
  const dataRows = [];
  for (let i = 0; i < rows; i += 1) {
    const row = [];
    row.push(i + 1);
    for (const field of fields) {
      row.push(sampleValue(field, i));
    }
    for (const rel of rels) {
      row.push(i + 1);
    }
    dataRows.push(row.join(','));
  }
  return { headers, rows: dataRows };
};

const run = async () => {
  await ensureDir(OUTPUT_DIR);
  const files = await listJsonFiles();
  for (const file of files) {
    const content = await fs.readFile(path.join(INPUT_DIR, file), 'utf8');
    const config = JSON.parse(content);
    const fields = config.fields ?? [];
    const relationships = config.relationships ?? [];
    if (!fields.length && !relationships.length) {
      continue;
    }
    const { headers, rows } = buildRows(fields, relationships);
    const csv = [headers.join(','), ...rows].join('\n');
    const outPath = path.join(OUTPUT_DIR, `${config.name}.csv`);
    await fs.writeFile(outPath, csv, 'utf8');
  }
  console.log(`CSV templates generated in ${OUTPUT_DIR}`);
};

run().catch(err => {
  console.error(err);
  process.exit(1);
});
