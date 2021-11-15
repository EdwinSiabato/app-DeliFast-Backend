import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Servicio,
  Mensajeria,
} from '../models';
import {ServicioRepository} from '../repositories';

export class ServicioMensajeriaController {
  constructor(
    @repository(ServicioRepository) protected servicioRepository: ServicioRepository,
  ) { }

  @get('/servicios/{id}/mensajerias', {
    responses: {
      '200': {
        description: 'Array of Servicio has many Mensajeria',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mensajeria)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Mensajeria>,
  ): Promise<Mensajeria[]> {
    return this.servicioRepository.mensajerias(id).find(filter);
  }

  @post('/servicios/{id}/mensajerias', {
    responses: {
      '200': {
        description: 'Servicio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mensajeria)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Servicio.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mensajeria, {
            title: 'NewMensajeriaInServicio',
            exclude: ['id'],
            optional: ['servicioId']
          }),
        },
      },
    }) mensajeria: Omit<Mensajeria, 'id'>,
  ): Promise<Mensajeria> {
    return this.servicioRepository.mensajerias(id).create(mensajeria);
  }

  @patch('/servicios/{id}/mensajerias', {
    responses: {
      '200': {
        description: 'Servicio.Mensajeria PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mensajeria, {partial: true}),
        },
      },
    })
    mensajeria: Partial<Mensajeria>,
    @param.query.object('where', getWhereSchemaFor(Mensajeria)) where?: Where<Mensajeria>,
  ): Promise<Count> {
    return this.servicioRepository.mensajerias(id).patch(mensajeria, where);
  }

  @del('/servicios/{id}/mensajerias', {
    responses: {
      '200': {
        description: 'Servicio.Mensajeria DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Mensajeria)) where?: Where<Mensajeria>,
  ): Promise<Count> {
    return this.servicioRepository.mensajerias(id).delete(where);
  }
}
