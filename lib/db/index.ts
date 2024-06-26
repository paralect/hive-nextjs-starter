import { ZodObject } from "zod";
// const requireDir = require('require-dir');

import getResources from "./getResources";
import getSchemas from "./getSchemas";

import {
  Database,
  IDocument,
  Service,
  ServiceOptions,
} from "@/node-mongo/src/index";
import config from "../config";


const db = new Database(config.MONGO_URI, config.MONGO_DB_NAME);

function createService<T extends IDocument>(
  collectionName: string,
  options: ServiceOptions<T> = {}
) {
  return new Service<T>(collectionName, db, options);
}

async function init() {
  await db.connect();
  db.services = {};
  // db.schemas = {};

  const schemaPaths = await getSchemas();

  await Promise.all(schemaPaths.map(
    async ({ file: schemaFile, resourceName, name: schemaName }) => {
      const { schema } = await import("../../resources/" + schemaFile + ".js");
      // db.schemas[schemaName] = schema;

      console.log("Registering service", schemaName);

      db.services[schemaName] = createService(`${schemaName}`, {
        schemaValidator: (obj) => schema.parseAsync(obj),
      });
    }
  ));

  const resourcePaths = await getResources();

  // _.each(resourcePaths, ({ dir }) => {
  //   if (fs.existsSync(`${dir}/handlers`)) {
  //     requireDir(`${dir}/handlers`);
  //   }
  // });

  // const mapSchema = require('autoMap/mapSchema');
  // await mapSchema();

  // const addHandlers = require('autoMap/addHandlers');
  // await addHandlers();
}

export { db, init };
