import { readdir } from 'fs/promises'
import getResources from './getResources';

export default async function getSchemas() {
  const resources = await getResources();

  /**
  * @type {Array<{file: string, resourceName: string, name: string}>}
  */
  const schemas = [];

  await Promise.all(
    resources.map(async ({ dir: resourceDir, name: resourceName }) => {
      const resourceSchemas = (await readdir(resourceDir))
        .filter((f) => f.includes('schema.js'))
        .map((f) => ({
          file: `${resourceDir.replace('resources/', '')}/${f.replace('.js', '')}`,
          resourceName,
          name: f.replace('.schema.js', ''),
        }));
      schemas.push(...resourceSchemas);
    })
  );

  return schemas;
};
