# React Query (Tanstack Query)

## Installation

`npm i @tanstack/react-query`

## Usage

**FONTOS**
A *tanstack query*-nek NINCS beépített HTTP request mechaniznusa. Nekünk kell megírni az aktuális HTTP kéréseket, a tanstack query pedig kezeli az adatoakt, hibákat és a többi dolgot.

```js
import { useQuery } from "@tanstack/react-query"
...
const { data, isPending, isError, error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents
  })
```
Az alábbi kódban egy useQuery hookot használsz a React Query könyvtárból. Ez a hook segít a háttérben történő adatlekérdezéseket kezelni és kezelni a különböző állapotokat, mint például a lekérdezés eredménye, a lekérdezés folyamatban van-e vagy hiba történt-e.

A hook egy objektumot ad vissza, amelynek a következő tulajdonságai vannak:

data: Az adat, amelyet lekérdeztél a fetchEvents függvény segítségével. Ez az érték undefined lehet, ha még nem történt meg a lekérdezés.
isPending: Egy logikai érték, amely jelzi, hogy a lekérdezés még mindig folyamatban van vagy sem.
isError: Egy logikai érték, amely jelzi, hogy a lekérdezés során hiba történt vagy sem.
error: Az esetleges hibaobjektum, ha hiba történt a lekérdezés során.
A useQuery hooknak két kötelező paramétere van:

queryKey: Ezt a tömböt használja a React Query a gyorsítótárazáshoz és a lekérdezések azonosításához. Ebben az esetben az "events" stringet adod meg a kulcsnak.
queryFn: Ez a függvény felelős a lekérdezés végrehajtásáért. A fetchEvents függvényt adod meg itt, amelyet a lekérdezés során futtat a React Query.

```js
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
```
Az első kódrészlet egy useQuery hook használatát mutatja be. A useQuery hook segítségével adatlekérdezéseket végezhetsz React alkalmazásodban. Az hook paraméterként egy objektumot vár, amiben megadhatod a lekérdezési kulcsot (queryKey) és a lekérdezési függvényt (queryFn).

A queryKey egy tömb, amiben megadhatod a lekérdezés egyedi azonosítóját vagy paramétereit. Ebben az esetben a lekérdezés az "events" adatokat kéri le.

A queryFn egy függvény, amit a hook meghív, hogy elvégezze a lekérdezést. Ebben az esetben a fetchEvents függvényt használja a lekérdezés végrehajtásához.

A hook visszatérési értéke egy objektum, ami tartalmazza az adatokat (data), a lekérdezés státuszát (isPending, isError) és az esetleges hibát (error).

A második kódrészletben egy QueryClient példányt hozunk létre, ami a React Query könyvtár egyik fő komponense. Ez a példány felelős a lekérdezések kezeléséért és a gyorsítótárazásért.

Az App függvény egy React komponens, amit a React alkalmazásodban használsz. A QueryClientProvider komponens segítségével a queryClient példányt adod át a React Query-nak, hogy használni tudja a lekérdezésekhez.

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh