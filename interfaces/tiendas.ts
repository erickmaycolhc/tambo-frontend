export interface Tienda {
  id: number | null;
  tienda: string;
  tipo: string;
  jefes_zonal: string;
  administrador: string;
  rpe_enter_administrador: string;
  telefono_personal_adm: string;
  latitud: string;
  longitud: string;
  direccion: string;
  distrito: string;
  gerente_zonal: string;
  dias_atencion: string;
  apertura_local: string;
  cierre_local: string;
  tiendas_ripley: string;
  horario_permitido_de_recepcion: string;
  state: string;
}

export interface RutasDiariasTiendas {
  id_tienda?: string;
  cantidad_jabas?: string;
  position?: number;
}

export interface RutasDiarias {
  id_usuario?: number;
  id_rutas_diarias?: string;
  tiendas?: RutasDiariasTiendas[];
}

export interface Rutas {
  id: number;
  nombre?: string;
  fecha_creacion: string;
  estado: "active" | "inactive";
}

export interface Root {
  ruta?: Ruta;
  tiendas: Tiendas[];
}

export interface Ruta {
  id: number;
  nombre: string;
  fecha_creacion: string;
}

/* old */
/* export interface Tiendas {
  id?: number;
  tienda?: string;
  coordinate?: CoordinateUbication;
  tienda_dirrecion?: string;
  horario_de_apertura?: string;
  horario_de_cierre?: string;
  distrito?: string;
  dias_de_atencion?: string;
}
*/
export interface CoordinateUbication {
  lat: number;
  lng: number;
}

export interface Schedule {
  open: string;
  close: string;
}

/* new */
export interface Tiendas {
  id?: number;
  name?: string;
  coordinate: CoordinateUbication;
  direction?: string;
  schedule?: Schedule;
  district?: string;
  dias_atencion?: string;
}
