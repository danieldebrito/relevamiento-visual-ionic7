import { Injectable } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, docData, Firestore, orderBy, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Usuario } from 'src/app/class/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private firestore: Firestore) { }

  public addItem(item: Usuario) {
    const col = collection(this.firestore, 'usuarios');
    const newDoc = doc(col);

    item.id = newDoc.id; // guardo el id del documento que crea firebase
    setDoc(newDoc, item);
  }

  public getItems(): Observable<Usuario[]> {
    const col = collection(this.firestore, 'usuarios');
    const queryObservable = query(col, orderBy('id')); // ordenar  /////////////////////////////////////////////
    const observable = collectionData(queryObservable).pipe(
      map(res => {
        return res as Usuario[];
      }),
      catchError(err => {
        console.error('Error obteniendo datos:', err);
        return throwError(() => err);
      })
    );
    return observable;
  }

  public getItemById(id: string): Observable<Usuario> {
    const col = collection(this.firestore, 'usuarios');
    const documento = doc(col, id);

    const observable = docData(documento).pipe(
      map(res => {
        return res as Usuario;
      }),
      catchError(err => {
        console.error('Error obteniendo el documento:', err);
        return throwError(() => err);
      })
    );
    return observable;
  }

  public update(id: string, Item: any) {
    const col = collection(this.firestore, 'usuarios');
    const documento = doc(col, id);

    updateDoc(documento, Item);
  }

  public delete(id: string) {
    const col = collection(this.firestore, 'usuarios');
    const documento = doc(col, id);

    deleteDoc(documento);
  }


  public checkLogin(email: string, password: string): Observable<Usuario[]> {
    const col = collection(this.firestore, 'usuarios');
    const queryObservable = query(col, where('correo', '==', email), where('clave', '==', password));

    const observable = collectionData(queryObservable).pipe(
      map((res) => {
        return res as Usuario[];
      }),
      catchError((err) => {
        console.error('Error obteniendo datos:', err);
        return throwError(() => err);
      })
    );

    return observable;
  }

}
