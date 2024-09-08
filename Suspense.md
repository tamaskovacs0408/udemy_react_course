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