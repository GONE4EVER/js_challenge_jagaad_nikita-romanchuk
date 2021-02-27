export default class BaseProvider {
  constructor(Entity) {
    this.Entity = Entity;
  }

  mapStructureToEntity = data => new this.Entity(data)

  transform = data => (Array.isArray(data)
    ? this.transformArray(data)
    : this.transformObject(data))

  transformArray = data => data.map(this.transformObject)

  transformObject = data => this.mapStructureToEntity(data)
}
