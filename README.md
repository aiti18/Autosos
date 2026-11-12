# АвтоSOS 312

Одностраничный адаптивный сайт службы автопомощи и услуг водителя в Бишкеке и по Кыргызстану.

## Запуск локально

```bash
python3 -m http.server 4173 --directory dist
```

После запуска сайт будет доступен по адресу `http://localhost:4173`.

## Структура

- `dist/index.html` — разметка сайта;
- `dist/styles.css` — основные стили;
- `dist/card-overrides.css` — стили карточек и точечные переопределения;
- `dist/responsive.css` — адаптивные стили;
- `dist/script.js` — интерактивность и отправка заявки в WhatsApp;
- `dist/assets/photos/` — изображения услуг.

Публичная версия: https://autosos312.kg/
