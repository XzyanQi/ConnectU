import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, docData, Firestore, getDoc, getDocs, orderBy, OrderByDirection, query, setDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private firestore: Firestore) { }

  docRef(path: string): any {
    return doc(this.firestore, path);
  }
  
  collectionRef(path: string): any {
    return collection(this.firestore, path);
  }
  
  setDocument(path: string, data: any): Promise<void> {
    const dataRef = this.docRef(path);
    return setDoc(dataRef, data);
  }
  
  addDocument(path: string, data: any): Promise<any> {
    const dataRef = this.collectionRef(path);
    return addDoc(dataRef, data);
  }
  
  getDocById(path: string): Promise<any> {
    const dataRef = this.docRef(path);
    return getDoc(dataRef);
  }
  
  async getDocs(path: string, queryFn?: any): Promise<any[]> {
    try {
      const dataRef: any = queryFn ? query(this.collectionRef(path), queryFn) : this.collectionRef(path);
      const snapshot = await getDocs(dataRef);
      return snapshot.docs.map((doc) => {
        const data = doc.data() as Record<string, unknown>; 
        return { id: doc.id, ...data };
      });
    } catch (error) {
      console.error('Error getting documents: ', error);
      throw error; 
    }
  }
  
  
  collectionDataQuery(path: string, queryFn?: any): Observable<any[]> {
    let dataRef: any = this.collectionRef(path);
    if (queryFn) {
      const q = query(dataRef, queryFn);
      dataRef = q;
    }
    return collectionData<any>(dataRef, { idField: 'id' });
  }
  
  docDataQuery(path: string, id?: boolean, queryFn?: any): Observable<any> {
    let dataRef: any = this.docRef(path);
    if (queryFn) {
      const q = query(dataRef, queryFn);
      dataRef = q;
    }
    return id ? docData<any>(dataRef, { idField: 'id' }) : docData<any>(dataRef);
  }
  
  whereQuery(fieldPath: string, condition: any, value: any): any {
    return where(fieldPath, condition, value);
  }
  
  orderByQuery(fieldPath: string, directionStr: OrderByDirection = 'asc'): any {
    return orderBy(fieldPath, directionStr);
  }
  

}
