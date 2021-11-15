import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mensajeria, MensajeriaRelations, Servicio} from '../models';
import {ServicioRepository} from './servicio.repository';

export class MensajeriaRepository extends DefaultCrudRepository<
  Mensajeria,
  typeof Mensajeria.prototype.id,
  MensajeriaRelations
> {

  public readonly servicio: HasOneRepositoryFactory<Servicio, typeof Mensajeria.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>,
  ) {
    super(Mensajeria, dataSource);
    this.servicio = this.createHasOneRepositoryFactoryFor('servicio', servicioRepositoryGetter);
    this.registerInclusionResolver('servicio', this.servicio.inclusionResolver);
  }
}
