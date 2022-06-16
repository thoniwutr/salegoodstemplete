export interface TransactionResponse {
    id: string
    transactionId: string
    productId: string
    quantity: number
    transactionDetail : TransactionDetail
  }
  
  export interface TransactionDetail {
    commentId: string
    commentMsg: string
    createTime: string
    customerFacebookId: number
    processStatus: string
    pageId: number
    pageName : string
    postId: string
    username : string
    wording? : string
    products: Product
  }
  

  export interface Product {
    productNo: string
    quantity?: number
  }
  