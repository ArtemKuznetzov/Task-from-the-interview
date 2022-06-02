interface ICourses {
  name: string;
  prices: [number, number] | [number, null] | [null, number] | [null, null];
}

function App() {
  let courses: ICourses[] = [
    { name: "Courses in England", prices: [0, 100] },
    { name: "Courses in Germany", prices: [500, null] },
    { name: "Courses in Italy", prices: [100, 200] },
    { name: "Courses in Russia", prices: [null, 400] },
    { name: "Courses in China", prices: [50, 250] },
    { name: "Courses in USA", prices: [200, null] },
    { name: "Courses in Kazakhstan", prices: [56, 324] },
    { name: "Courses in France", prices: [null, null] },
  ];

  function findCourses(pricesArray: number[]) {
    const result = courses.filter((item) => {
      // У данного решения есть баг. Если пользователь передает начальную цену выше конечной, то функция работает неверно.
      // Однако такие ошибки обычно обрабатываются еще до этапа, когда вызывается фильтрующая функция. Поэтому внутри функции
      // Эту ошибку не обрабатывал.

      // Необходимо приравнять начальную цену существующих курсов (если null) к 0 для избежания проблем при сравнении
      if (item.prices[0] === null) {
        item.prices[0] = 0;
      }
      // Необходимо приравнять конечную цену существующих курсов(если null) к бесконечности, т.к. конечная цена может быть любой.
      // Также необходимо для избежания проблем при сравнении
      if (item.prices[1] === null) {
        item.prices[1] = Infinity;
      }
      // Аналогично для начальной цены, которая передается при вызове функции
      if (pricesArray[0] === null) {
        pricesArray[0] = 0;
      }
      // Аналогично для конечной цены, которая передается при вызове функции
      if (pricesArray[1] === null) {
        pricesArray[1] = Infinity;
      }
      // В этой проверке аргумент функции сравнивается с курсами, у которых указана начал./конеч. стоимость, и у которых
      // есть только конечная стоимость. Если добавлять сравнение с курсами без конечной стоимости, то функция выполнется некорректно.
      if (
        pricesArray[1] >= item.prices[1] &&
        pricesArray[1] >= item.prices[0] &&
        item.prices[1] !== Infinity
      ) {
        return true;
      }
      // В этой проверке аргумент функции сравнивается с курсами, у которой нет конечной цены. Здесь нам важно, чтобы конечная цена
      // аргумента функции не была больше начальной в курсах.
      if (item.prices[1] === Infinity && pricesArray[1] >= item.prices[0]) {
        return true;
      }
      return false;
    });

    return result;
  }

  let requiredRange1 = [null, 200];
  let requiredRange2 = [100, 350];
  // При передачи requiredRange3 в аргумент функции, вернутся все курсы, поскольку конечная цена неуказана, а значит бюджет неограничен.
  // Можно брать любые курсы.
  let requiredRange3 = [200, null];
  console.log(findCourses(requiredRange1));

  // Курсы из Франции возвращаются всегда, т.к. здесь цена не имеет никакого значения, а значит сравнивать с чем-либо не надо.

  return <div></div>;
}

export default App;
