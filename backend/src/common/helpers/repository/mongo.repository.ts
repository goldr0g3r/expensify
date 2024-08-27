export interface IPagination {
  limit: number;
  page: number;
}
export abstract class MongoRepository {
  getPaginationParams(
    data: IPagination,
  ): { limit: number; skip: number } | undefined {
    return { limit: data.limit, skip: (data.page - 1) * data.limit };
  }
}
