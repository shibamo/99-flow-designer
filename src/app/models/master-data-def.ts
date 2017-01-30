export interface DTO {
  guid: string;
  name: string;
  createTime: Date;
}
export interface OrgDTO extends DTO {
  orgId: number;
  shortName: string;
  displayName: string;
  code: string;
  indexNumber: string;
  url: string;
  DunsNumber: string;
  isDefault: boolean;
  isVisible: boolean;
  affintyLevel: number;
  firstOrgSchemaId: number;
  firstOrgSchemaName: string;
}

export interface OrgSchemaDTO extends DTO {
  orgSchemaId: number;
  shortName: string;
  displayName: string;
  code: string;
  indexNumber: string;
  isDefault: boolean;
  isVisible: boolean;
  rootBizEntities: BizEntityDTO[];
}

export interface BizEntityDTO extends DTO {
  bizEntityId: number;
  shortName: string;
  displayName: string;
  englishName: string;
  code: string;
  indexNumber: string;
  url: string;
  DunsNumber: string;
  isVisible: boolean;
  firstbizEntitySchemaId: number;
  firstbizEntitySchemaName: string;
}

export interface BizEntitySchemaDTO extends DTO {
  bizEntitySchemaId: number;
  shortName: string;
  displayName: string;
  englishName: string;
  code: string;
  indexNumber: string;
  isVisible: boolean;
  rootDepartments: DepartmentDTO[];
}

export interface DepartmentDTO extends DTO {
  departmentId: number;
  assistBizEntitySchemaId: number;
  shortName: string;
  displayName: string;
  englishName: string;
  code: string;
  indexNumber: string;
  isVisible: boolean;
  users: UserDTO[];
  departments: DepartmentDTO[];
}

export interface UserDTO extends DTO {
  userId: number;
  displayName: string;
  englishName: string;
  code: string;
  indexNumber: string;
  email: string;
  accountInNT: string;
  logonName: string;
  officeTel: string;
  personalTel: string;
  personalMobile: string;
  isVisible: boolean;
  validTimeFrom?: Date;
  validTimeTo?: Date;
  departmentNames: string[];
  roleNames: string[];
}

export enum UserPositionToDepartment {
  normal,     // 普通人员
  manager,    // 管理者
  temporary,  // 临时人员
  other,      // 其他
}

export interface DepartmentUserRelation {
  departmentUserRelationId: number;
  assistDepartmentId: number;
  assistUserId: number;
  userPosition: UserPositionToDepartment;
  createTime: Date;
  isValid: boolean;
}

export interface RoleDTO extends DTO {
  roleId: number;
  displayName: string;
  englishName: string;
  code: string;
  indexNumber: string;
  isVisible: boolean;
  users: UserDTO[];
}

export interface RoleTypeDTO extends DTO {
  roleTypeId: number;
  roles: RoleDTO[];
}
