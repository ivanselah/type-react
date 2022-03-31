function fetcher(base_url) {
  return function (url, options) {
    return fetch(base_url + url, options) //
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("error");
        }
      });
  };
}

const testApi = fetcher("https://jsonplaceholder.typicode.com");
testApi("/todos/7").then((res) => console.log(res));

/** CSS BEM
 * .header__navigation--navi-text { color: red; }
 * header : block, navigation: element, navi-text : modifier
 *
 * modifier
 * <ul class="tab">
     <li class="tab__item tab__item--focused">탭 01</li>
     <li class="tab__item">탭 02</li>
     <li class="tab__item">탭 03</li>
   </ul>
 * --focused 불리언 타입이라고 하며, 그 값이 true라고 가정하고 사용
 * 
 * 키-벨류(key-value) 타입도 있음
 * 성질-내용
 * <div class="title title--color-gray"></div>  // color-gray
 * <form class="form-login form-login--theme-normal"></from> // theme-normal
 * 
 */
