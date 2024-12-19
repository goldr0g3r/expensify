export abstract class MongoRepository {
  getPaginationParams(
    page: number,
    limit: number,
  ): { skip: number; limit: number } | undefined {
    return {
      skip: (page - 1) * limit,
      limit: limit,
    };
  }
}
