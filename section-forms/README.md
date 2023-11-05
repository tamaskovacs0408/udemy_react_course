# FORM VALIDATION

## Validating form on submit

The form only validates on submit by checking if the input field is empty.

## Validating form on "touch"

If we focus in the form input and then focus out and the input field is empty, the input field-s background (and / or border) is changed and/or a warning message shown.

Altough, we can use 3rd party libraries which give us a great form validation handling.

- [Formik](https://formik.org/)
- [Yup](https://github.com/jquense/yup)


### FormData API

A `FormData` egy beépített függvény a böngészőben, ami arra szolgál, hogy könnyedén ki tudjunk nyerni adatokat a `form`-ból. Ehhez hozzá kell adnunk az `event.target`-et, mint argumentum, így hozzáférhetünk a `form` összes `input` adatához, viszont az összes `input`/`select`-nek (amiből aradokat szeretnénk kinyerni) kell hogy legyen `name` prop-ja. A `FormData` beépített methodjaival pedig hozzá tudunk férni az adatokhoz. A `get()` methodnak meg kell adnunk `string`-ként, az adott bemenet `name` propját, amihez hozzá szeretnénk férni. Ha több adathot szeretnénk kinyerni, akkor az `entries()` method-t ot használjuk, amit úgy tudunk a leghatékonyabbá tenni, ha betesszük egy `Object.fromEntries()` method-ba, ami kulcs-érték párokká (`object`) alakítva adja vissza nekünk az adatokat. 
(pl. `{name: 'John', email: 'fH5kQ@example.com'}`)

Ha `checkbox`-ok adataihőz szeretnénk hozzáférni, ahol mindegyik ugyanazzal a `name`-el rendelkezik, használjuk a `getAll()` methodot, megadva neki a `name`-t. Ez egy `array`-t fog visszaadni, amit aztán hozzá tudunk adni az előbbi `object`-hez (`data.checkboxData = checkboxData`).

```jsx

function handleSubmit(event) {
  event.preventDefault();

  const fd = new FormData(event.target);
  const enteredName = fd.get("name"); // Egy adatot ad vissza, mindegyikhez külön kell felvenni
  const data = Object.fromEntries(fd.entries()); // Minden adatot visszaad a formből objetctként
}

<form onSubmit={handleSubmit}>
  <input type="text" name="name" />
  <input type="email" name="email" />
</form>
```

#### event.target vs event.currentTarget:

A `FormData()`-ban az `event.target` és az `event.currentTarget` ugyanazt az értéket adja vissza, ha a `FormData()` elemre van rendelve az eseménykezelő. A különbség akkor jön létre, ha az eseménykezelőt egy szülőelemre rendelik hozzá, és az eseményt egy gyermekelem aktiválja. Ebben az esetben az `event.target` a gyermekelemet, az `event.currentTarget` pedig a szülőelemet fogja visszaadni.

Például a következő React-kódban az `event.targe`t és az `event.currentTarget` ugyanazt az értéket fogja visszaadni, ha a felhasználó a "submit" gombra kattint:

```jsx
const Form = () => {
  const [data, setData] = useState(new FormData());

  const handleSubmit = event => {
    // event.target és event.currentTarget ugyanazt az értéket fogja visszaadni
    const formData = new FormData(event.target);

    // Az adatokat a FormData objektumban tároljuk
    setData(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" />
      <input type="submit" value="Submit" />
    </form>
  );
};
```

A következő React-kódban az `event.target` a "child" elemet, az `event.currentTarget` pedig a "parent" elemet fogja visszaadni, ha a felhasználó a "child" elemre kattint:

```jsx
const Form = () => {
  const [data, setData] = useState(new FormData());

  const handleSubmit = event => {
    // event.target a "child" elemet fogja visszaadni
    const formData = new FormData(event.target);

    // Az adatokat a FormData objektumban tároljuk
    setData(formData);
  };

  return (
    <div>
      <div id="parent">
        <input type="text" name="name" />
        <button id="child" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};
```