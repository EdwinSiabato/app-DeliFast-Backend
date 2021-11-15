import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Producto, ProductoRelations, Servicio} from '../models';
import {ServicioRepository} from './servicio.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly servicio: HasOneRepositoryFactory<Servicio, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>,
  ) {
    super(Producto, dataSource);
    this.servicio = this.createHasOneRepositoryFactoryFor('servicio', servicioRepositoryGetter);
    this.registerInclusionResolver('servicio', this.servicio.inclusionResolver);
  }
}
