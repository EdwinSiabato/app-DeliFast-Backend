import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Mensajeria} from '../models';
import {MensajeriaRepository} from '../repositories';

export class MensajeriaController {
  constructor(
    @repository(MensajeriaRepository)
    public mensajeriaRepository : MensajeriaRepository,
  ) {}

  @post('/mensajerias')
  @response(200, {
    description: 'Mensajeria model instance',
    content: {'application/json': {schema: getModelSchemaRef(Mensajeria)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mensajeria, {
            title: 'NewMensajeria',
            exclude: ['id'],
          }),
        },
      },
    })
    mensajeria: Omit<Mensajeria, 'id'>,
  ): Promise<Mensajeria> {
    return this.mensajeriaRepository.create(mensajeria);
  }

  @get('/mensajerias/count')
  @response(200, {
    description: 'Mensajeria model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Mensajeria) where?: Where<Mensajeria>,
  ): Promise<Count> {
    return this.mensajeriaRepository.count(where);
  }

  @get('/mensajerias')
  @response(200, {
    description: 'Array of Mensajeria model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Mensajeria, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Mensajeria) filter?: Filter<Mensajeria>,
  ): Promise<Mensajeria[]> {
    return this.mensajeriaRepository.find(filter);
  }

  @patch('/mensajerias')
  @response(200, {
    description: 'Mensajeria PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mensajeria, {partial: true}),
        },
      },
    })
    mensajeria: Mensajeria,
    @param.where(Mensajeria) where?: Where<Mensajeria>,
  ): Promise<Count> {
    return this.mensajeriaRepository.updateAll(mensajeria, where);
  }

  @get('/mensajerias/{id}')
  @response(200, {
    description: 'Mensajeria model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Mensajeria, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Mensajeria, {exclude: 'where'}) filter?: FilterExcludingWhere<Mensajeria>
  ): Promise<Mensajeria> {
    return this.mensajeriaRepository.findById(id, filter);
  }

  @patch('/mensajerias/{id}')
  @response(204, {
    description: 'Mensajeria PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mensajeria, {partial: true}),
        },
      },
    })
    mensajeria: Mensajeria,
  ): Promise<void> {
    await this.mensajeriaRepository.updateById(id, mensajeria);
  }

  @put('/mensajerias/{id}')
  @response(204, {
    description: 'Mensajeria PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() mensajeria: Mensajeria,
  ): Promise<void> {
    await this.mensajeriaRepository.replaceById(id, mensajeria);
  }

  @del('/mensajerias/{id}')
  @response(204, {
    description: 'Mensajeria DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.mensajeriaRepository.deleteById(id);
  }
}
