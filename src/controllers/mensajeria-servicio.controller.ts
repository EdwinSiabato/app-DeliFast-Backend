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
  Mensajeria,
  Servicio,
} from '../models';
import {MensajeriaRepository} from '../repositories';

export class MensajeriaServicioController {
  constructor(
    @repository(MensajeriaRepository) protected mensajeriaRepository: MensajeriaRepository,
  ) { }

  @get('/mensajerias/{id}/servicio', {
    responses: {
      '200': {
        description: 'Mensajeria has one Servicio',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Servicio),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Servicio>,
  ): Promise<Servicio> {
    return this.mensajeriaRepository.servicio(id).get(filter);
  }

  @post('/mensajerias/{id}/servicio', {
    responses: {
      '200': {
        description: 'Mensajeria model instance',
        content: {'application/json': {schema: getModelSchemaRef(Servicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mensajeria.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {
            title: 'NewServicioInMensajeria',
            exclude: ['id'],
            optional: ['mensajeriaId']
          }),
        },
      },
    }) servicio: Omit<Servicio, 'id'>,
  ): Promise<Servicio> {
    return this.mensajeriaRepository.servicio(id).create(servicio);
  }

  @patch('/mensajerias/{id}/servicio', {
    responses: {
      '200': {
        description: 'Mensajeria.Servicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {partial: true}),
        },
      },
    })
    servicio: Partial<Servicio>,
    @param.query.object('where', getWhereSchemaFor(Servicio)) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.mensajeriaRepository.servicio(id).patch(servicio, where);
  }

  @del('/mensajerias/{id}/servicio', {
    responses: {
      '200': {
        description: 'Mensajeria.Servicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Servicio)) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.mensajeriaRepository.servicio(id).delete(where);
  }
}
