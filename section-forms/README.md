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