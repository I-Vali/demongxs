export class FetchProducts {
    static readonly type = '[Product] Fetch All';
  }
  
  export class FetchProductById {
    constructor(public id: number) {}
    static readonly type = '[Product] Fetch By ID';
  }
  