export interface Category { id: string; slug: string; title: string; description?: string; image?: string }
export interface Product { id: string; title: string; category: string; price?: number; oldPrice?: number; availability: 'in_stock' | 'low' | 'out'; availabilityCount?: number; image?: string; gallery?: string[]; badges?: string[]; manufacturer?: string; description?: string; characteristics?: Record<string, string>; storeIds?: string[]; stockByStore?: Record<string, number> }
export interface Store { id: string; city: string; address: string; phone?: string; email?: string; openingHours: string; coordinates?: [number, number]; paymentMethods?: string[] }
export interface Contacts { phone?: string; email?: string; hours?: string; socials: { name: string; url: string }[] }
