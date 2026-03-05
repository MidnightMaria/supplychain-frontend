export type Product = {
  sku: string
  name: string
  description: string
  price: number
  minStock: number
  quantity: number
  dynamicPricing: boolean
  competitorPrice: number
}