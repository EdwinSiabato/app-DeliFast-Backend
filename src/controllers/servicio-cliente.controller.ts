import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Servicio,
  Cliente,
} from '../models';
import {ServicioRepository} from '../repositories';

export class ServicioClienteController {
  constructor(
    @repository(ServicioRepository)
    public servicioRepository: ServicioRepository,
  ) { }

  @get('/servicios/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Servicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.string('id') id: typeof Servicio.prototype.id,
  ): Promise<Cliente> {
    return this.servicioRepository.cliente(id);
  }
}
