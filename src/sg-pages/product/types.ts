export interface ProductPayload {
  id: string
    productName: string
    productDetail: string
    quantity: number
    wordingOrder: string
    price: number
    imgURL : string
    available: 'available' | 'unavailable'
    facebookId : string
    createdDate : string
  }
  