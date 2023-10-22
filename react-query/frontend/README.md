# React Query

A Tanstack/React Query-vel HTTP Request-eket tudunk küldeni és szinkrinban tudujuk tartani a frontendet a backenddel.
**VISZONT!** a Tanstack Query NEM küld magától HTTP Requesteket, azokat nekünk kell megírnunk (fetch, axios, etc), ő csak kezeli az adatokat, error-okat, caching-et, stb.

## Installation

`npm i @tanstack/react-query`

## useQuery hook

`import { useQuery } from '@tanstack/react-query'`

A React Query useQuery() hook egy állapotkezelő hook, amely lehetővé teszi a React alkalmazások számára, hogy adatokat kérjenek le egy API-ból. A hook visszaad egy objektumot, amely tartalmazza a lekérdezés állapotát (töltés, hiba vagy siker), a lekérdezésből visszakapott adatokat és a lekérdezés újratöltésére szolgáló függvényeket.

A useQuery() hook használatához a következőket kell tennie:

1. Importálja a hook-ot a React Query könyvtárból.
2. Definiáljon egy lekérdezést a hook első argumentumában. A lekérdezés egy olyan függvény, amely visszaadja a lekérdezés URL-címét és a lekérdezési paramétereket.
3. Használja a hook-ot a React komponensben. A hook visszaad egy objektumot, amelyet a komponensben felhasználhat az adatokhoz való hozzáférésre.

Íme egy példa a useQuery() hook használatára:

```jsx
import { useQuery } from "react-query";

const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
};

const App = () => {
  const { data, error, isLoading } = useQuery("users", fetchUsers);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

Ez a példa egy egyszerű alkalmazást mutat be, amely az `https://jsonplaceholder.typicode.com/users` API-ból kér adatokat. A `fetchUsers()` függvény letölti az adatokat az API-ból és visszaadja egy JSON objektum formájában. A `useQuery()` hook visszaadja egy objektumot, amely tartalmazza a lekérdezés állapotát, az adatokat és a lekérdezés újratöltésére szolgáló függvényeket.

A `data` tulajdonság tartalmazza a lekérdezésből visszakapott adatokat. A `error` tulajdonság tartalmazza a lekérdezés során fellépő hibákat. Az `isLoading` tulajdonság jelzi, hogy a lekérdezés még fut.

A komponens ellenőrzi a `isLoading` tulajdonságot, hogy ellenőrizze, a lekérdezés megtörtént-e. Ha a lekérdezés még fut, a komponens egy egyszerű üzenet jelenít meg. Ha a lekérdezés sikeresen megtörtént, a komponens egy listát jelenít meg az adatokból.

A `useQuery()` hook számos további lehetőséget kínál, például:

* A lekérdezés cache-elhető, hogy a későbbi lekérdezések gyorsabbak legyenek.
* A lekérdezés állapotát meg lehet változtatni, hogy a komponens frissüljön, ha az adatok megváltoznak.
* A lekérdezést újra lehet tölteni, ha az adatok elavultak.


### queryFn

A queryFn (queryFunction) részbe adjuk meg azt a függvény, amellyel lekérjük aza datokat a backend szerverről.

```jsx
useQuery({
    queryFn: fetchEvents
  })
```

### queryKey

A queryKey az az adat, amivel el tudjuk cach-elni az adott HTTP Requestet. Ez úgy működik, hogy a queryFn függvényt használatával lekérjük az adatokat (pl. 10:31-kor) és ezt a queryKey-nél megadott paraméterrel cach-eli a böngészővel. Majd ha később (pl. 10:35-kor) hozzá szeretnénk férni az adatokhoz, akkor be tudjuk állítani (erről később), hogy ezeket az adatokat ne kérje le újra, hanem a cach-ből használja fel.

```jsx
  useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents
  })
```