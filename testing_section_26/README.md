# React testing




## userEvent vs fireEvent


A React tesztelése során a `fireEvent` és a `userEvent` két eseménykezelő könyvtár, amelyeket a tesztekben használnak a felhasználói interakciók szimulálásához.

A `fireEvent` a tesztlés alapvető eszköze, amely közvetlenül meghívja az eseménykezelőket a tesztelt komponensen. Ez hasznos eszköz lehet a komponens belső állapotának és logikájának teszteléséhez, de nem szimulálja teljes mértékben a felhasználói interakciókat.

Ezzel szemben a `userEvent` könyvtár a felhasználói eseményeket próbálja lehető legvalósághűbben szimulálni. Ez azt jelenti, hogy a `userEvent` metódusok nem csak egyszerűen meghívják az eseménykezelőket, hanem szimulálják a teljes felhasználói interakciót. Például a `userEvent.click` nem csak meghívja a `click` eseménykezelőt, hanem szimulálja a teljes kattintási folyamatot, beleértve a `mousedown`, `mouseup` és `click` eseményeket is, pont úgy ahogy egy valódi felhasználói kattintás történne.

Összefoglalva, a `fireEvent` közvetlenül meghívja az eseménykezelőket, míg a `userEvent` a felhasználói eseményeket szimulálja. A `userEvent` gyakran realisztikusabb teszteket biztosít, mert több a felhasználói interakció részleteit szimulálja.
