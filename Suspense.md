# Suspense

A React Suspense egy olyan komponens, amely lehetővé teszi, hogy "felfüggesszük" a renderelést, amíg valamilyen aszinkron művelet (például adatbetöltés vagy kód betöltése) be nem fejeződik. Eközben egy fallback UI-t jeleníthetünk meg, például egy betöltő indikátort.
Íme néhány példa a Suspense használatára:

1.  Adatbetöltés:

A UserData komponenst a React.lazy() függvénnyel definiáljuk, amely egy aszinkron adatbetöltő függvényt (fetchUserData) hív meg.
A Suspense komponens körülveszi a UserData-t, és megadunk egy fallback UI-t, amely megjelenik, amíg az adat betöltődik.

```js
import React, { Suspense } from 'react';
import { fetchUserData } from './api';

const UserData = React.lazy(() => fetchUserData());

function UserProfile({ id }) {
  return (
    <Suspense fallback={<div>Betöltés...</div>}>
      <UserData id={id} />
    </Suspense>
  );
}

export default UserProfile;
```

2. Kód hasítás (code splitting):

A Suspense nagyon hasznos lehet nagy alkalmazások esetén, ahol szeretnénk a kódot kisebb darabokra bontani és csak akkor betölteni, amikor szükség van rá.

- A HeavyComponent-et dinamikusan importáljuk a React.lazy() segítségével.
- A Suspense komponens lehetővé teszi, hogy betöltő üzenetet jelenítsünk meg, amíg a HeavyComponent betöltődik.

```js
import React, { Suspense } from 'react';

const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <div>
      <h1>Fő alkalmazás</h1>
      <Suspense fallback={<div>Komponens betöltése...</div>}>
        <HeavyComponent />
      </Suspense>
    </div>
  );
}

export default App;
```

## Mikor érdemes használni a Suspense-t?

Nagy alkalmazásoknál a kezdeti betöltési idő csökkentésére (kód hasítás).
Adatfüggő komponenseknél, ahol az adatbetöltés ideje alatt loading állapotot szeretnénk mutatni.
Képek vagy más média tartalmak betöltésénél.
Több, párhuzamosan futó aszinkron művelet kezelésénél.

## A Suspense előnyei:

Egyszerűsíti a loading állapotok kezelését.
Javítja a felhasználói élményt azáltal, hogy lehetővé teszi a fokozatos tartalom betöltést.
Segít a kód szervezésében és a komponensek egyszerűsítésében.
Lehetővé teszi a deklaratív megközelítést az aszinkron műveletek kezelésében.

## SAMPLE

```js
import React, { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

// Lazy-loaded komponensek
const UserProfile = React.lazy(() => import('./UserProfile'));
const Posts = React.lazy(() => import('./Posts'));
const Weather = React.lazy(() => import('./Weather'));

// Adatbetöltő függvények
const fetchUserData = () => new Promise(resolve => setTimeout(() => resolve({ name: 'Kovács János', age: 30 }), 1000));
const fetchPosts = () => new Promise(resolve => setTimeout(() => resolve([{ id: 1, title: 'Első poszt' }, { id: 2, title: 'Második poszt' }]), 1500));
const fetchWeather = () => new Promise(resolve => setTimeout(() => resolve({ temp: 25, condition: 'Napos' }), 800));

// Komponensek adatbetöltéssel
const UserDataFetcher = React.lazy(() => fetchUserData().then(data => ({ default: () => <UserProfile data={data} /> })));
const PostsFetcher = React.lazy(() => fetchPosts().then(data => ({ default: () => <Posts data={data} /> })));
const WeatherFetcher = React.lazy(() => fetchWeather().then(data => ({ default: () => <Weather data={data} /> })));

function LoadingFallback() {
  return <div>Betöltés...</div>;
}

function ErrorFallback({ error }) {
  return <div>Hiba történt: {error.message}</div>;
}

function App() {
  const [showWeather, setShowWeather] = useState(false);

  return (
    <div className="App">
      <h1>Példa Alkalmazás</h1>
      
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LoadingFallback />}>
          <UserDataFetcher />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LoadingFallback />}>
          <PostsFetcher />
        </Suspense>
      </ErrorBoundary>

      <button onClick={() => setShowWeather(!showWeather)}>
        {showWeather ? 'Időjárás elrejtése' : 'Időjárás mutatása'}
      </button>

      {showWeather && (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<LoadingFallback />}>
            <WeatherFetcher />
          </Suspense>
        </ErrorBoundary>
      )}
    </div>
  );
}

export default App;
```

- Kód hasítás (Code Splitting):

A UserProfile, Posts és Weather komponenseket lazy loadinggal töltjük be, ami lehetővé teszi a kód felosztását és a kezdeti betöltési idő csökkentését.


- Adatbetöltés:

A UserDataFetcher, PostsFetcher és WeatherFetcher komponensek kombinálják a lazy loadingot az adatbetöltéssel. Ezek a komponensek csak akkor renderelődnek, amikor az adatok már elérhetők.


- Feltételes renderelés:

Az időjárás komponens csak akkor jelenik meg, amikor a felhasználó rákattint a gombra. Ez demonstrálja, hogyan lehet a Suspense-t használni dinamikusan betöltött tartalomnál.


- Hibakezelés:

Minden Suspense komponenst egy ErrorBoundary vesz körül, amely kezeli a betöltés során esetlegesen felmerülő hibákat.


- Párhuzamos adatbetöltés:

A különböző adatbetöltések (felhasználói adatok, posztok, időjárás) párhuzamosan futnak, ami javítja a teljesítményt.



- További fontos pontok:

Granularitás: Minden komponensnek saját Suspense wrappere van, ami lehetővé teszi, hogy külön-külön kezeljük a betöltési állapotokat.
Fallback UI: A LoadingFallback komponens egységes betöltési UI-t biztosít az egész alkalmazásban.
Hibakezelés: Az ErrorBoundary komponensek lehetővé teszik a hibák elegáns kezelését minden aszinkron műveletnél.
Felhasználói interakció: A Weather komponens példája mutatja, hogyan lehet a Suspense-t használni felhasználói interakciókra reagáló dinamikus tartalombetöltésnél.

## Suspense + TanstackQuery

- Egyszerűsített loading állapotok: A Suspense segítségével deklaratívan kezelhetjük a betöltési állapotokat, míg a TanStack Query kezeli az adatbetöltést és cache-elést.
- Optimális felhasználói élmény: A TanStack Query background refetch és optimistic updates funkcióit kombinálhatjuk a Suspense fokozatos betöltési képességeivel.
- Hatékony error handling: A TanStack Query fejlett hibakezelését összekapcsolhatjuk a Suspense error boundary-kkel.
- Párhuzamos és vízesés-szerű adatbetöltések kezelése: A TanStack Query és Suspense együtt hatékonyan kezelhetik a komplex adatbetöltési forgatókönyveket.
  
```js
import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true, // Engedélyezzük a Suspense módot
    },
  },
});

// API hívás szimulálása
const fetchUserData = async (userId) => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // 1 másodperc késleltetés
  if (userId === '1') return { id: '1', name: 'Kovács János', email: 'kovacs.janos@example.com' };
  throw new Error('Felhasználó nem található');
};

function UserProfile({ userId }) {
  const { data } = useQuery(['user', userId], () => fetchUserData(userId));
  
  return (
    <div>
      <h2>{data.name}</h2>
      <p>Email: {data.email}</p>
    </div>
  );
}

function LoadingFallback() {
  return <div>Betöltés...</div>;
}

function ErrorFallback({ error }) {
  return <div>Hiba történt: {error.message}</div>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Felhasználói Profil</h1>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<LoadingFallback />}>
            <UserProfile userId="1" />
          </Suspense>
        </ErrorBoundary>
      </div>
    </QueryClientProvider>
  );
}

export default App;
```

1. A QueryClient-et úgy konfiguráltuk, hogy alapértelmezetten használja a Suspense módot.
2. A useQuery hook-ot használjuk az adatbetöltésre. A Suspense módban ez a hook "felfüggeszti" a komponenst, amíg az adat be nem töltődik.
3. A Suspense komponens kezeli a betöltési állapotot, míg az ErrorBoundary kezeli a hibákat.
4. A UserProfile komponens csak akkor renderelődik, amikor az adatok már elérhetők, így nem kell explicit loading állapotot kezelnie.

**Ez a megközelítés több előnnyel jár:**

- Tisztább komponens logika: A UserProfile komponensnek nem kell foglalkoznia a loading vagy error - állapotokkal, csak az adatok megjelenítésére koncentrálhat.
- Deklaratív error és loading kezelés: A Suspense és ErrorBoundary komponensek kezelik ezeket az állapotokat, így a kód olvashatóbb és karbantarthatóbb.
- Hatékony cache-elés: A TanStack Query kezeli az adatok cache-elését, így ha újra szükség van ugyanarra az adatra, nem kell újra lekérni.
- Automatikus újrapróbálkozás és invalidáció: A TanStack Query funkcióit (pl. automatikus újrapróbálkozás hiba esetén, vagy adat invalidáció) továbbra is kihasználhatjuk.
- Párhuzamos lekérések: Ha több useQuery hívásunk van egy komponensen belül vagy különböző komponensekben a Suspense alatt, azok párhuzamosan fognak futni, optimalizálva a betöltési időt.

Ez a kombináció különösen hasznos lehet olyan alkalmazásokban, ahol sok aszinkron adatbetöltés van, és fontos a felhasználói élmény optimalizálása. A TanStack Query és Suspense együttes használata lehetővé teszi, hogy hatékonyan kezeljük az adatbetöltést, miközben egyszerű és deklaratív marad a kódunk.