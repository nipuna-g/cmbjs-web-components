const containerRef = document.getElementById('container');
const darkThemeClass = 'theme-light';
const lightThemeClass = 'theme-dark';

let toggleElement = document.getElementById('theme-toggle');

toggleElement.addEventListener('toggled', e => {
  let checked = e.detail;

  if (checked) {
    containerRef.classList.remove(darkThemeClass);
    containerRef.classList.add(lightThemeClass);
  } else {
    containerRef.classList.remove(lightThemeClass);
    containerRef.classList.add(darkThemeClass);
  }
});
