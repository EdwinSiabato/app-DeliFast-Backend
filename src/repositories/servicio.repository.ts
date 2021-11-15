import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Servicio, ServicioRelations, Cliente, Producto, Mensajeria} from '../models';
import {ClienteRepository} from './cliente.repository';
import {ProductoRepository} from './producto.repository';
import {MensajeriaRepository} from './mensajeria.repository';

export class ServicioRepository extends DefaultCrudRepository<
  Servicio,
  typeof Servicio.prototype.id,
  ServicioRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Servicio.prototype.id>;

  public readonly productos: HasManyRepositoryFactory<Producto, typeof Servicio.prototype.id>;

  public readonly mensajerias: HasManyRepositoryFactory<Mensajeria, typeof Servicio.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>, @repository.getter('MensajeriaRepository') protected mensajeriaRepositoryGetter: Getter<MensajeriaRepository>,
  ) {
    super(Servicio, dataSource);
    this.mensajerias = this.createHasManyRepositoryFactoryFor('mensajerias', mensajeriaRepositoryGetter,);
    this.registerInclusionResolver('mensajerias', this.mensajerias.inclusionResolver);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productoRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
