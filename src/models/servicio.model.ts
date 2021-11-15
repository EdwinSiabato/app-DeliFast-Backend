import {belongsTo, Entity, model, property, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Producto} from './producto.model';
import {Mensajeria} from './mensajeria.model';

@model()
export class Servicio extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  id_producto: string;

  @property({
    type: 'string',
    required: true,
  })
  id_mensajeria: string;

  @property({
    type: 'number',
    required: true,
  })
  totalServicio: number;

  @belongsTo(() => Cliente)
  clienteId: string;

  @property({
    type: 'string',
  })
  productoId?: string;

  @property({
    type: 'string',
  })
  mensajeriaId?: string;

  @hasMany(() => Producto)
  productos: Producto[];

  @hasMany(() => Mensajeria)
  mensajerias: Mensajeria[];

  constructor(data?: Partial<Servicio>) {
    super(data);
  }
}

export interface ServicioRelations {
  // describe navigational properties here
}

export type ServicioWithRelations = Servicio & ServicioRelations;
