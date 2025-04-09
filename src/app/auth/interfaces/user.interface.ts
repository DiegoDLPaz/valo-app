import {Roles} from '../../pages/admin-dashboard-page/enum/Roles.enum';

export interface User {
  id: string
  email: string
  name: string
  rol: Roles
  profileicon?: profileicon | null
}

export interface profileicon{
  data: number[]
  type: string
}
