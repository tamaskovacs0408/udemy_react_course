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

Az alábbi példában a button click tesztelés résznél az adott `state` feltételes renderelését teszteljük.

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

### Testing image url

Az alábbi tesztesetben azt vizsgáljuk, hogy a komponens helyesen rendereli-e a megadott mock objektumhoz tartozó adatokat, és hogy az img elemnek megfelelően beállítódik-e a src attribútuma.

```js

 test('Image src attribute with url', () => {
        render(<Component data={data} />);

        expect(screen.getByRole('img')).toHaveAttribute('src', data.imageUrl);
    });
```

### Testing rendering icon

Az alábbi tesztesetben azt vizsgáljuk, hogy az ikon megfelelően renderelődik-e ki.

```js

test('Rendering icon', () => {
        render(<Component data={data} />);

        const someIcon = document.querySelector('.label-some-icon');
        expect(someIcon).toBeInTheDocument();
        expect(someIcon).toHaveStyle(`background-image: url(${data.label_some_icon})`);
    });

```

### Testing HTTP requests

HTTP request-ek tesztelésénél használjunk mock-ot a http végpontok helyett.
Cseréld le a komponens http kérését (fetch) egy dummy fetch funkcióra, amely csak egy id-t és címet fogad el.
Abban az esetben, amikor adatokat kérünk le egy végpontról, a `findAllByRol`e-t kell használnunk, mert ez egy `Promise`-t ad vissza, amit `async/await`-tel kell kezelnünk. A `findAllByRole` több argumentumot is fogadhat, a harmadik argumentum pedig a `timeOut`, ami deafult 1000ms.

A mock-olás nem csak a HTTP kérések tesztelését teszi lehetővé, de segíti a függőségek, szolgáltatások, vagy bármely más kód rész izolált tesztelését is, amelyek általában külső rendszerektől vagy komplex műveletektől függnek. Ezáltal a tesztek egyszerűbbé, gyorsabbá és megbízhatóbbá válnak.

```js

describe('Testing Async component', () => {
    test('renders posts if request succeeds', async () => {
       window.fetch = jest.fn();
       window.fetch.mockResolvedValueOnce({
        json: async () => [{id: 'p1', title: 'First post'}]
       });
        render(<Async />);

        const listElement = await screen.findAllByRole('listitem');   
        expect(listElement).not.toHaveLength(0);
    })
})

```

A `window.fetch = jest.fn()` kifejezés a globális fetch metódust mockolja a Jest keretrendszer `fn()` metódusával. Ez egy úgynevezett "mock function", ami lehetővé teszi, hogy a tesztkörnyezetben ellenőrizzük a fetch hívásokat.

A `window.fetch.mockResolvedValueOnce({...})` metódussal beállítja, hogy a fetch metódus milyen értéket adjon vissza, amikor a teszt során meghívják. Itt a fetch metódus egy `Promise` objektumot ad vissza, ami sikeresen lefut, és egy objektumot ad vissza, aminek a json metódusa egy másik `Promis`e-t ad vissza, ami egy tömböt ad vissza, ami tartalmazza a lekért bejegyzéseket.

A `const listElement = await screen.findAllByRole('listitem')` sorban várakozik arra, hogy az összes, 'listitem' szerepkörrel rendelkező elem megjelenjen a képernyőn. Ez tipikusan arra utal, hogy a komponens sikeresen lekérte és megjelenítette a bejegyzéseket.

Végül az `expect(listElement).not.toHaveLength(0)` kifejezéssel ellenőrzi, hogy a listElement tömbnek van-e eleme. Ha nincs, akkor a teszt sikertelen, mert azt várjuk, hogy legalább egy bejegyzés megjelenjen.