# React testing

A React alkalmazásokat a `Jest` (vannak más tesztkörnyezetek is, de ez a legnépszerűbb) és a `React Testing Library` segítségével tudjuk tesztelni. A Hook-ok (főleg a Custom Hook-ok) teszetlésére pedig a [React-Hooks-Testing-Library](https://react-hooks-testing-library.com/)-t érdemes használni (`npm install --save-dev @testing-library/react-hooks`).
Tesztelés során lehetőleg minél több eshetőségre érdemes tesztet írni (pl. renderelés, eventek, image/link url ellenőrzés, hook-ok, stb).

## Installation & start

`npm i jest`
`npm i react-hooks-testing-library`
`npm test`

## Basic settings

Importáljuk be a tesztekhez szükséges eszközöket, mint `render`, `screen` `fireEvent`/`userEvent`. stb, emellett pedig az adott komponenst, amit tesztelni szeretnénk. **FIGYELEM!** Minden komponenshez külön tesztet kell írni, VISZONT ha egy komponens "kiegészítő"-ként (Pl layout) van jelen, akkor azt meg lehet tesztelni együtt.
A teszteket a `describe`-on belül tudjuk csoportosítani, aminek előszőr egy leírást adunk (pl. 'Testing Greeting component'), majd a callback függvényben adjuk meg a teszteket a `test`-en belül a tényleges teszt eset leírással. A `test`-nek is van egy callback függénye, amin belül írjuk meg a teszteseteket. Először a `render`-en belül hozzáadjuk a a tesztelni kívánt komponensünket, (átadjuk a mock adatokat, ha kell), majd jöhetnek a tesztek.

```js
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Greeting from "./Greeting";

describe('Testing Greeting component', () => {
    test('rendering Hello World', () => {
        render(....);

   // teszteset
})
```

## Testing

A renderelést álatalában a `screen.getByText()` és a `screen.getAllByText()`-el tudjuk ellenőrizni. Ezek után vagy azt ellenőrizzük, hogy az adott elem/adat benne van-e a tesztelő környezetben a `toBeInTheDocument()`-el, vagy azt, hogy tesztelt adattal/szöveggel megegyező elemek száma nagyobb-e, mint 0. Ez a teszt azt vizsgálja, hogy van-e olyan elem, amelynek a szövege megegyezik a keresett szöveggel, és ezt a feltételt kifejezésben rögzíti. Tehát ha legalább egy ilyen elemet talál, amelynek a szövege megegyezik a valami-vel, akkor a teszt sikeres lesz.

```js

describe("Testing Greeting component", () => {
  test("rendering Hello Word", () => {
    render(<Greeting />);

    expect(screen.getByText(/Hello World/i)).toBeInTheDocument();
  });

  test('rendering "good to see you" when button NOT clicked', () => {
    render(<Greeting />);

    expect(screen.getByText(/good to see you/i)).toBeInTheDocument();
  });

  test('rendering "Changed!" when button clicked', () => {
    render(<Greeting />);
    // Simulating the button clicking with userEvent, but we can use fireEvent too
    userEvent.click(screen.getByRole("button"));

    expect(screen.getByText("Changed!")).toBeInTheDocument();
  });
});

```

### getByText vs getAllByText

- getByText: Az első olyan elemet találja meg, amelynek a szövege megegyezik a megadott szöveggel. (Ha például egy gombot keresünk a tesztelőkörnyezetben, amelynek a felirata "Kattintson ide", akkor a getByText("Kattintson ide") segítségével megtalálhatjuk ezt az elemet.)

- getAllByText: Az összes olyan elemet találja meg, amelyeknek a szövege megegyezik a megadott szöveggel. (Ha több gombot keresünk a tesztelőkörnyezetben, amelyeknek a felirata "Kattintson ide", akkor a getAllByText("Kattintson ide") segítségével megtalálhatjuk az összes ilyen elemet egy tömbben.)

### getByRole

- getByRole: Az első olyan elemet találja meg, amelynek a szerepe megegyezik a megadott értékkel.
- getAllByRole: Az összes olyan elemet találja meg, amelyeknek a szerepe megegyezik a megadott értékkel.

**Gyakran használt role-ok:**

- button: Gombot jelöl.
- checkbox: Jelölőnégyzetet jelöl.
- link: Hivatkozást jelöl.
- heading: Címsort jelöl (pl. h1, h2 stb.).
- textbox: Szövegbeviteli mezőt jelöl.
- radio: Választógombot jelöl.
- listitem: Listaelemet jelöl (pl. li).
- menu: Menüt jelöl.
- dialog: Párbeszédpanelt jelöl.

[További role-ok](https://www.w3.org/TR/html-aria/#docconformance)

### userEvent vs fireEvent

A React tesztelése során a `fireEvent` és a `userEvent` két eseménykezelő könyvtár, amelyeket a tesztekben használnak a felhasználói interakciók szimulálásához.

A `fireEvent` a tesztlés alapvető eszköze, amely közvetlenül meghívja az eseménykezelőket a tesztelt komponensen. Ez hasznos eszköz lehet a komponens belső állapotának és logikájának teszteléséhez, de nem szimulálja teljes mértékben a felhasználói interakciókat.

Ezzel szemben a `userEvent` könyvtár a felhasználói eseményeket próbálja lehető legvalósághűbben szimulálni. Ez azt jelenti, hogy a `userEvent` metódusok nem csak egyszerűen meghívják az eseménykezelőket, hanem szimulálják a teljes felhasználói interakciót. Például a `userEvent.click` nem csak meghívja a `click` eseménykezelőt, hanem szimulálja a teljes kattintási folyamatot, beleértve a `mousedown`, `mouseup` és `click` eseményeket is, pont úgy ahogy egy valódi felhasználói kattintás történne.

Összefoglalva, a `fireEvent` közvetlenül meghívja az eseménykezelőket, míg a `userEvent` a felhasználói eseményeket szimulálja. A `userEvent` gyakran realisztikusabb teszteket biztosít, mert több a felhasználói interakció részleteit szimulálja.
