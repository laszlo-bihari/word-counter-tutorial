"use strict";

////////////////////////////////////////////////////////////////////////////
// VARIABLES/REFERENCES
////////////////////////////////////////////////////////////////////////////

// CONSTANTS
const KEYWORDS_PER_PAGE = 4;
const READING_SPEED_WPS = 4;
const SPEAKING_SPEED_WPS = 2.5;

// VIEWPORT WIDTH
const viewportWidth = window.innerWidth;

// OUTER FRAME
const body = document.querySelector("body");
const mainContainer = document.querySelector(".main-container");

const modeSwitchButton = document.querySelector(".dark-light-switch-btn");
const sunnyIcon = document.querySelector(".sunny-icon");
const moonIcon = document.querySelector(".moon-icon");

const mainTitle = document.querySelector(".main-title");
const subTitle = document.querySelector(".subtitle");
const switchModeTitle = document.querySelector(".switch-mode-title");

// TEXTAREA
const textbox = document.querySelector(".textbox");

const deleteBtn = document.querySelector(".delete-btn");
const copyBtn = document.querySelector(".copy-btn");

// DASHBOARDS
const analyticsDashboard = document.querySelector(".analytics-dashboards");

// UPPER DASHBOARD
const upperDb = document.querySelector(".upper-dashboard");
const dbWordCount = document.getElementById("words-digits");
const dbCharacterCount = document.getElementById("characters-digits");
const dbCharacterWSpacesCount = document.getElementById(
  "characters-no-space-digits"
);
const dbSentenceCount = document.getElementById("sentences-digits");
const dbAvgSentenceLength = document.getElementById(
  "avg-sentence-length-digits"
);
const dbParagraphCount = document.getElementById("paragraph-digits");
const dbReadingTimeEstimate = document.getElementById("reading-time-digits");
const dbSpeakingTimeEstimate = document.getElementById("speaking-time-digits");

// LOWER DASHBOARD
const db2Word1 = document.getElementById("db2-word-1");
const db2Word2 = document.getElementById("db2-word-2");
const db2Word3 = document.getElementById("db2-word-3");
const db2Word4 = document.getElementById("db2-word-4");
const db2WordsArray = [db2Word1, db2Word2, db2Word3, db2Word4];

const db2Amount1 = document.getElementById("db2-amount-1");
const db2Amount2 = document.getElementById("db2-amount-2");
const db2Amount3 = document.getElementById("db2-amount-3");
const db2Amount4 = document.getElementById("db2-amount-4");
const db2AmountsArray = [db2Amount1, db2Amount2, db2Amount3, db2Amount4];

const db2Percentage1 = document.getElementById("db2-percentage-1");
const db2Percentage2 = document.getElementById("db2-percentage-2");
const db2Percentage3 = document.getElementById("db2-percentage-3");
const db2Percentage4 = document.getElementById("db2-percentage-4");
const db2PercentagesArray = [
  db2Percentage1,
  db2Percentage2,
  db2Percentage3,
  db2Percentage4,
];

const db2Row5 = document.querySelector(".db2-row-5");

const currentPageNumber = document.getElementById("current-page-number");
const endPageNumber = document.getElementById("end-page-number");

const leftArrowBtn = document.querySelector(".left-arrow-btn");
const rightArrowBtn = document.querySelector(".right-arrow-btn");

const leftDoubleArrowBtn = document.querySelector(".left-double-arrow-btn");
const rightDoubleArrowBtn = document.querySelector(".right-double-arrow-btn");

const introText = document.querySelector(".intro-text");
const paginationPanel = document.querySelector(".pagination-panel");

////////////////////////////////////////////////////////////////////////////
// DESIGN FUNCTIONALITY
////////////////////////////////////////////////////////////////////////////

// Switching between light mode and dark mode
modeSwitchButton.addEventListener("click", function () {
  sunnyIcon.classList.toggle("hidden");
  moonIcon.classList.toggle("hidden");
  body.classList.toggle("light-mode");
  if (sunnyIcon.classList.contains("hidden")) {
    switchModeTitle.textContent = "Dark Mode";
  } else {
    switchModeTitle.textContent = "Light Mode";
  }
});

////////////////////////////////////////////////////////////////////////////
// TEXTAREA FUNCTIONALITY
////////////////////////////////////////////////////////////////////////////

// Ensuring that the textarea's size equals to the text size
textbox.addEventListener("input", function () {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px"; // scrollheight returns the full height of the textbox scrolling included in pixels
});

// keeping the shape of the dashboards in case of sticky transition
const keepDashboardFrame = function () {
  // should only fire if the dashboard is next to the textbox which is bound to view width
  if (viewportWidth > 1344) {
    const rect = analyticsDashboard.getBoundingClientRect();
    analyticsDashboard.style.width = rect.width + "px";
    analyticsDashboard.style.height = rect.height + "px";
    analyticsDashboard.style.position = "fixed";
    analyticsDashboard.style.right = 0;
    analyticsDashboard.style.top = rect.top + "px";
    analyticsDashboard.style.left = rect.left + "px";
  }
};

// Making the analytics dashboards sticky after a certain point
const observer = new IntersectionObserver(
  function (entries) {
    const ent = entries[0]; // this is the event itself firing when the conditions are met
    if (ent.isIntersecting === false) {
      keepDashboardFrame();
    }
    if (ent.isIntersecting) {
      analyticsDashboard.style.position = "static";
    }
  },
  {
    root: null, // main title will be observed inside the viewport
    threshold: 0, // event fires when 0% of the main title is inside the viewport
  }
);

observer.observe(modeSwitchButton);

// wake up the intersection observer when I paste in something so that the sticky dashboard can react if appropriate
textbox.addEventListener("paste", () => {
  setTimeout(() => {
    const distanceFromTitle =
      mainTitle.getBoundingClientRect().bottom + window.scrollY;
    if (distanceFromTitle < window.scrollY) {
      keepDashboardFrame();
    }
  }, 0);
});

// remaining at the same viewport at the case of a paste so that complications are avoided with the sticky dashboard
textbox.addEventListener("paste", (e) => {
  // Save the scroll position
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  // Allow paste to happen, then restore scroll
  setTimeout(() => {
    window.scrollTo(scrollX, scrollY);
  }, 0);
});

// delete button funcionality
deleteBtn.addEventListener("click", function () {
  // clearing the textbox
  textbox.value = "";
  // resizing the textbox height
  textbox.style.height = "50rem";
  // putting the cursor back to the textarea after deleting
  textbox.focus();
  // resetting dashboard 1
  dbCharacterCount.textContent = "0";
  dbCharacterWSpacesCount.textContent = "0";
  dbWordCount.textContent = "0";
  dbSentenceCount.textContent = "0";
  dbAvgSentenceLength.textContent = "0";
  dbParagraphCount.textContent = "0";
  dbReadingTimeEstimate.textContent = "0";
  dbSpeakingTimeEstimate.textContent = "0";
  // resetting dashboard 2
  for (let i = 0; i < KEYWORDS_PER_PAGE; i++) {
    clearLowerDashboard(i);
  }
  // resetting the intro text
  introText.textContent =
    "Type or paste your text or URL to see the most used keywords";
  paginationPanel.style.display = "none";
});

// copy button functionality
copyBtn.addEventListener("click", function () {
  const textboxContent = textbox.value;
  navigator.clipboard.writeText(textboxContent);
});

////////////////////////////////////////////////////////////////////////////
// DASHBOARDS FUNCTIONALITY
////////////////////////////////////////////////////////////////////////////

// common variable needed
let amountOfWords;

///////////////////////////////
/////// UPPER DASHBOARD ///////
///////////////////////////////

const updateUpperDb = function (baseText) {
  // character count
  dbCharacterCount.textContent = `${baseText.length}`;
  // caracter count without spaces
  dbCharacterWSpacesCount.textContent = `${baseText.replace(/\s/g, "").length}`;

  // word counting
  amountOfWords = baseText.trim().split(/\s+/).length;
  dbWordCount.textContent = `${amountOfWords}`;
  if (baseText === "") {
    dbWordCount.textContent = "0";
  }

  // sentence counting
  const amountOfSentences = baseText
    .split(/[.!?]+/)
    .filter((s) => s.trim() !== "").length;
  dbSentenceCount.textContent = `${amountOfSentences}`;

  // avg. sentence length
  if (amountOfWords !== 0 && amountOfSentences !== 0) {
    const avgSentenceLength = (amountOfWords / amountOfSentences).toFixed(1);
    dbAvgSentenceLength.textContent = `${avgSentenceLength}`;
  } else {
    dbAvgSentenceLength.textContent = "0";
  }

  // paragraph count
  dbParagraphCount.textContent = `${
    baseText.split(/\n+/).filter((p) => p.trim() !== "").length
  }`;

  // reading time estimation
  const readingTotalSeconds = Math.round(amountOfWords / READING_SPEED_WPS);
  const readingMinutes = Math.floor(readingTotalSeconds / 60);
  const readingSeconds = (readingTotalSeconds % 60).toString().padStart(2, "0");
  dbReadingTimeEstimate.textContent = `${readingMinutes}:${readingSeconds}`;

  // speaking time estimation
  const speakingTotalSeconds = Math.round(amountOfWords / SPEAKING_SPEED_WPS);
  const speakingMinutes = Math.floor(speakingTotalSeconds / 60);
  const speakingSeconds = (speakingTotalSeconds % 60)
    .toString()
    .padStart(2, "0");
  dbSpeakingTimeEstimate.textContent = `${speakingMinutes}:${speakingSeconds}`;
};

///////////////////////////
///// LOWER DASHBOARD /////
///////////////////////////

// page number variables
let currentPage = Number(currentPageNumber.textContent);
let endPage = Number(endPageNumber.textContent);

// adjustment for the rendering of the second dashboard
let pageAddOn = (currentPage - 1) * KEYWORDS_PER_PAGE;

// clear lower dashboard
function clearLowerDashboard(i) {
  db2WordsArray[i].textContent = "";
  db2AmountsArray[i].textContent = "";
  db2PercentagesArray[i].textContent = "";
}

// function to handle and support the keywords listed in the lower dashboard
const updateKeywords = function (wordsArray) {
  return wordsArray.reduce((acc, word) => {
    if (!(word in acc)) {
      acc[word] = 1;
    } else {
      acc[word] = acc[word] + 1;
    }
    return acc;
  }, {});
};

// function returns an array of the most frequent words, you can change the length of the array
const mostFrequentWords = function (array, arrayLength) {
  return array.slice(0, arrayLength);
};

// function for displaying the correct end page
const updateEndPage = function (nOfKeywords) {
  endPage = Math.ceil(nOfKeywords / 4);
  endPageNumber.textContent = `${endPage}`;
  if (endPage < currentPage) {
    currentPage = Number(endPageNumber.textContent);
    currentPageNumber.textContent = `${currentPage}`;
    pageAddOn = (currentPage - 1) * KEYWORDS_PER_PAGE;
  }
};

// reducing page number by 1
leftArrowBtn.addEventListener("click", function () {
  if (currentPage > 1) {
    currentPageNumber.textContent = `${(currentPage -= 1)}`;
  }
  pageAddOn = (currentPage - 1) * KEYWORDS_PER_PAGE;
  updateLowerDb(textbox.value);
});

// reducing page number by 10
leftDoubleArrowBtn.addEventListener("click", function () {
  if (currentPage > 10) {
    currentPageNumber.textContent = `${(currentPage -= 10)}`;
  } else if (currentPage - 10 < 1 && currentPage - 10 > -9) {
    currentPageNumber.textContent = `${1}`;
    currentPage = 1;
  }
  pageAddOn = (currentPage - 1) * KEYWORDS_PER_PAGE;
  updateLowerDb(textbox.value);
});

// increasing page number by 1
rightArrowBtn.addEventListener("click", function () {
  if (currentPage < endPage) {
    currentPageNumber.textContent = `${(currentPage += 1)}`;
  }
  pageAddOn = (currentPage - 1) * KEYWORDS_PER_PAGE;
  updateLowerDb(textbox.value);
});

// increasing page number by 10
rightDoubleArrowBtn.addEventListener("click", function () {
  if (currentPage + 10 < endPage) {
    currentPageNumber.textContent = `${(currentPage += 10)}`;
  } else if (currentPage + 10 > endPage && currentPage < endPage) {
    currentPageNumber.textContent = `${endPage}`;
    currentPage = endPage;
  }
  pageAddOn = (currentPage - 1) * KEYWORDS_PER_PAGE;
  updateLowerDb(textbox.value);
});

const updateLowerDb = function (baseText) {
  // handle the appearance/disappearance of the intro text and the pagination panel
  if (baseText === "") {
    paginationPanel.style.display = "none";
    introText.textContent =
      "Type or paste your text or URL to see the most used keywords";
  }
  if (baseText !== "") {
    paginationPanel.style.display = "flex";
    introText.textContent = "";
  }

  // getting the keyword object
  const wordsArray = baseText
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\s]/gu, "")
    .split(/\s+/);
  const keywordsObject = updateKeywords(wordsArray);

  // Recalculate amount of words here
  amountOfWords = wordsArray.length;

  // forming an b-a array out of the keywordsObject
  const keywordsArraySorted = Object.entries(keywordsObject).sort(
    (a, b) => b[1] - a[1]
  );

  // update the end page for the pagination
  updateEndPage(keywordsArraySorted.length);

  // converting the array into object (why does it even have to be a condition?)
  if (keywordsArraySorted.length >= 1) {
    const mostFrequentKeywords = mostFrequentWords(
      keywordsArraySorted,
      keywordsArraySorted.length
    );

    // putting the most frequent keywords on the dashboard
    for (let i = 0; i < KEYWORDS_PER_PAGE; i++) {
      if (
        i < keywordsArraySorted.length &&
        i + pageAddOn < keywordsArraySorted.length
      ) {
        db2WordsArray[i].textContent = `${
          mostFrequentKeywords[i + pageAddOn][0]
        }`;
        db2AmountsArray[i].textContent = `${
          mostFrequentKeywords[i + pageAddOn][1]
        }`;
        db2PercentagesArray[i].textContent = `${(
          (mostFrequentKeywords[i + pageAddOn][1] / amountOfWords) *
          100
        ).toFixed(1)}%`;
      }
    }
    // checking if all the 4 rows are indeed needed and cleaning up entirely if there are no words
    if (keywordsArraySorted.length % 4 !== 0) {
      for (let i = 0; i < KEYWORDS_PER_PAGE; i++) {
        if (!mostFrequentKeywords[i + pageAddOn]) {
          clearLowerDashboard(i);
        }
      }
    }
    if (baseText === "") {
      for (let i = 0; i < KEYWORDS_PER_PAGE; i++) {
        clearLowerDashboard(i);
      }
      endPage = 1;
      endPageNumber.textContent = `${endPage}`;
      currentPage = 1;
      currentPageNumber.textContent = `${currentPage}`;
    }
  }
};

// update the dashboards as the textbox content is changing
textbox.addEventListener("input", function () {
  updateUpperDb(textbox.value);
  updateLowerDb(textbox.value);
});

// update the dashboards based on selected text in the textbox
textbox.addEventListener("select", function () {
  const selectedText = textbox.value.substring(
    textbox.selectionStart,
    textbox.selectionEnd
  );

  // update the upper dashboard
  updateUpperDb(selectedText);
});

// so that the upper dashboard can recognise immediately when text is deselected
body.addEventListener("click", function () {
  // update the upper dashboard
  updateUpperDb(textbox.value);
});
