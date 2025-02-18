import { ServerActionResponse } from "@/features/common/server-action-response";
import { CosmosClient } from "@azure/cosmos";
import { stringIsNullOrEmpty } from "../utils/helpers";

export const cosmosClient = () => {
  const endpoint = process.env.AZURE_COSMOSDB_ENDPOINT;
  const key = process.env.AZURE_COSMOSDB_KEY;

  if (stringIsNullOrEmpty(endpoint)) {
    throw new Error("Missing required environment variable for CosmosDB endpoint");
  }

  if (stringIsNullOrEmpty(key)) {
    throw new Error("Missing required environment variable for CosmosDB key");
  }

  return new CosmosClient({ endpoint, key });
};

export const cosmosConfiguration = (): boolean => {
  const endpoint = process.env.AZURE_COSMOSDB_ENDPOINT;
  const key = process.env.AZURE_COSMOSDB_KEY;

  return (
    endpoint !== undefined &&
    key !== undefined &&
    endpoint.trim() !== "" &&
    key.trim() !== ""
  );
};