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

////////////////////////////////////////////////////////////////////////////
// TEXTAREA FUNCTIONALITY
////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////
// DASHBOARDS FUNCTIONALITY
////////////////////////////////////////////////////////////////////////////

///////////////////////////////
/////// UPPER DASHBOARD ///////
///////////////////////////////

///////////////////////////
///// LOWER DASHBOARD /////
///////////////////////////
