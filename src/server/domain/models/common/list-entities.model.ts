export type ListEntitiesModel<EntityType> = {
  data: EntityType[]
  page: number
  lastPage: number
  recordsCount: number
  rowsPerPage: number
}
