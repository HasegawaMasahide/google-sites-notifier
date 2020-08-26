export enum Type {
  Create,
  Update,
}

export namespace Type {
  export function toString(arg: Type) {
    switch (arg) {
      case Type.Create:
        return '作成';
      case Type.Update:
        return '更新';
    }
  }

  export function toType(arg: string) {
    switch (arg) {
      case '作成':
      case '追加':
        return Type.Create;
      case '更新':
      case '添付':
        return Type.Update;
    }
  }
}
