# Реализация своего шаблона

Templator - класс шаблонизатора. Подставляет переменные с помощью {{props}}.

Вспомогательная функция getObjectKey нужна для получения данных из объекта, например user.info.firstName

## Пример работы с шаблоном

```
    import { getTemplate } from '../../utils/Templator';

    const example = () => {
        const context = {
            title: "Пример работы с шаблонизатором",
            clickHandler: ()=>{console.log("hello word!")},
        };
        const template = `
            <h1>{{title}}<h1/>
            <button onClick={{clickHandler}}>Click Me<button/>
        `;
        return getTemplate(template, context);
    }
```

## нуждается в доработке

- дописать обработку массивов mas[0]
- баг. если название функции в проекте одинаковые, то они переопределяются. ( временное решение, добавление хеша в название функции)
