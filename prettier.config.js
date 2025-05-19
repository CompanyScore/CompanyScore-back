/** @type {import("prettier").Config} */
module.exports = {
  // Использовать 2 пробела для отступов
  tabWidth: 2,

  // Использовать пробелы, а не табы
  useTabs: false,

  // Добавлять точку с запятой в конце строк
  semi: true,

  // Одинарные кавычки для строк
  singleQuote: true,

  // В JSX использовать двойные кавычки (по умолчанию)
  jsxSingleQuote: false,

  // Пробелы внутри фигурных скобок: { foo: bar }
  bracketSpacing: true,

  // Перенос закрывающей скобки на новую строку в JSX
  bracketSameLine: false,

  // Удалять скобки у стрелочных функций с одним аргументом
  arrowParens: 'avoid',

  // Добавлять запятые в конце элементов (в том числе в объектах, массивах и параметрах функций)
  trailingComma: 'all',

  // Стиль переноса строки: LF (\n, Unix)
  endOfLine: 'lf',

  // Максимальная длина строки перед переносом
  printWidth: 80,
};
