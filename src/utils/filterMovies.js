export function filterMovies(moviesList, inputText, shortCheckbox) {
  return moviesList.filter((movie) => {
    const movieNameRu = movie.nameRU && movie.nameRU.toLowerCase();
    const movieNameEn = movie.nameEN && movie.nameEN.toLowerCase();
    const inputTextLow = inputText.toLowerCase();
    const textResult = checkIncludes(movieNameRu, inputTextLow) || checkIncludes(movieNameEn, inputTextLow);
    const movieDuration = movie.duration;
    if(shortCheckbox) return textResult && movieDuration <= 40;
    else return textResult;
  });
}

function checkIncludes (text, includesPart) {
  if(!text) return false;
  else {
    return text.includes(includesPart);
  }
}