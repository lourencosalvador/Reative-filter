'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { from } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import axios from 'axios';

interface Item {
  id: number;
  [key: string]: any;
}



export function FilterCompos() {
  const [item, setItem] = useState<Item | null>(null);

  const fetchData =  useCallback(async() => {
    try {
      const response = await axios.get('http://localhost:3000/produtos');
      const result = await response.data
      // console.log(result)
      const data: Item[] = response.data; 
      const observable = from(data); 
      observable
        .pipe(
          filter((item: Item) => item.id === 9), 
          map((filteredItem: Item) => ({
            ...filteredItem,
            additionalProperty: 'Value',
          }))
        )
        .subscribe(setItem);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  }, [item])

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {item ? (
        <div>
          <h1>Item filtrado:</h1>
          <pre>{JSON.stringify(item, null, 2)}</pre>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}
