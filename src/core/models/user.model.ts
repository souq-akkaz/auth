export interface IBuildUser {
  id?: number;
  username: string;
  email: string;
  password: string;
}

export class User {
  id: number;
  username: string;
  email: string;
  password: string;

  static tableName = 'User';
  static build(data: IBuildUser): User {
    const result = new User();
    if (data.id != null) {
      result.id = data.id;
    }
    result.username = data.username;
    result.email = data.email;
    result.password = data.password;
  
    return result;
  }
}
