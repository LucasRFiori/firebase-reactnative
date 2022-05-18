import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore'

import { styles } from './styles';
import { Product, ProductProps } from '../Product';

import { shoppingListExample } from '../../utils/shopping.list.data';

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  
  // useEffect(() => {
  //   const subscribe = firestore()
  //   .collection('products')
  //   .orderBy('quantity')
  //   .startAt(3)
  //   .endAt(4) // quantidade entre 3 e 4
  //   .onSnapshot(querySnapshot => {
  //     const data = querySnapshot.docs.map((doc) => {
  //       return {
  //         id: doc.id,
  //         ...doc.data()
  //       }
  //     }) as ProductProps[]
  //     setProducts(data)
  //   })

  //   return() => subscribe();
  // }, []) // interval docs (filtragem de precos *)

  // useEffect(() => {
  //   const subscribe = firestore()
  //   .collection('products')
  //   .orderBy('description', 'desc')
  //   .onSnapshot(querySnapshot => {
  //     const data = querySnapshot.docs.map((doc) => {
  //       return {
  //         id: doc.id,
  //         ...doc.data()
  //       }
  //     }) as ProductProps[]
  //     setProducts(data)
  //   })

  //   return() => subscribe();
  // }, []) // ordering docs

  // useEffect(() => {
  //   const subscribe = firestore()
  //   .collection('products')
  //   .limit(3)
  //   .onSnapshot(querySnapshot => {
  //     const data = querySnapshot.docs.map((doc) => {
  //       return {
  //         id: doc.id,
  //         ...doc.data()
  //       }
  //     }) as ProductProps[]
  //     setProducts(data)
  //   })

  //   return() => subscribe();
  // }, []) // limit search docs

  // useEffect(() => {
  //   const subscribe = firestore()
  //   .collection('products')
  //   .where('quantity', '==', 2)
  //   .onSnapshot(querySnapshot => {
  //     const data = querySnapshot.docs.map((doc) => {
  //       return {
  //         id: doc.id,
  //         ...doc.data()
  //       }
  //     }) as ProductProps[]
  //     setProducts(data)
  //   })

  //   return() => subscribe();
  // }, []) // filtering docs

  useEffect(() => {
    const subscribe = firestore()
    .collection('products')
    .onSnapshot(querySnapshot => {
      const data = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }) as ProductProps[]
      setProducts(data)
    })

    return() => subscribe();
  }, []) // search all doc in realtime

  // useEffect(() => {
  //   firestore()
  //   .collection('products')
  //   .get()
  //   .then(response => {
  //     const data = response.docs.map(doc => {
  //       return {
  //         id: doc.id,
  //         ...doc.data()
  //       }
  //     }) as ProductProps[]

  //     setProducts(data)
  //   }).catch(error => console.log(error)) // search all documents one time
  // }, [])

  // useEffect(() => {
  //   firestore()
  //   .collection('products')
  //   .doc('zVdqYSpcG6gNCWCQa7se')
  //   .get()
  //   .then(response => console.log({
  //     id: response.id,
  //     ...response.data()
  //   }))
  //   .catch(error => console.log(error)) //search one document
  // })

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
