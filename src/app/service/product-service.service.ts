import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
  images: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  // Fetch all products
  getProducts(): Observable<{ products: Product[] }> {
    console.log('Get all products')
    return this.http.get<{ products: Product[] }>(this.apiUrl);
  }

  // Fetch a single product by ID
  getProductById(id: number): Observable<Product> {
    console.log('Get product with id ', id)
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
