const ical = require("ical-generator");
const {downloadFileFromText} = require("../../utils/saveBlob");
const {convertGrade, strToDateObj, isUrgent} = require("../../utils/module");
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

global.Buffer = global.Buffer || require('buffer/').Buffer;

// Globals: Variables which are captured once per web page
// 1. Class Page URL
// 2. Course Code: <h1 class="sidebar--title">.getText()
// 3. Course Name: <div class="sidebar--subtitle">.getText()

// Locals: Variables which are captured once per table row, many times per web page
// First, get body child of assignments table: <table id="assignments-student-table">/tbody
// Then, iterate through each row (<tr> element). All locals will be children of this element
// 1. Exercise Name: 1st child of <tr>.getText(), or <th class="table--primaryLink">.getText()
// 2. Exercise Status: 2nd child of <tr>.getText()
// 3. Exercise Due Date: <td class="progressBar--caption">.(2nd Child).getText()

// Create .ics for Courses

const courseCode = $('.sidebar--title').innerText;
const courseName = $('.sidebar--subtitle').innerText;

const courseCal = ical({name: courseName});

let courseAverageBase = 0;
let courseAverageGrade = 0;

$$('#assignments-student-table > tbody > tr').forEach(tr => {

  // Get Homework Name
  const assignmentName = tr.querySelector('.table--primaryLink > button')?.innerText ?? tr.querySelector('.table--primaryLink > a')?.innerText;

  // Get the date
  const dateParent = tr.querySelector('td:nth-of-type(2) > .submissionTimeChart > .progressBar--caption');
  const dueDateUnparsed = dateParent.querySelector('.submissionTimeChart--dueDate').innerText;
  // Un-used for now
  // const startDateUnparsed = dateParent.querySelector('.submissionTimeChart--releaseDate').innerText;

  const dueDate = strToDateObj(dueDateUnparsed);

  // 60,000 ms * 30 minutes
  const startDate = new Date(dueDate - 30 * 60000);

  // Create event in calendar IF it is still open
  if(tr.querySelector('.table--primaryLink > button')?.innerText !== null){
    courseCal.createEvent({
      start: startDate,
      end: dueDate,
      summary: `[${courseName}] ${assignmentName} due`,
      description: `Submit on Gradescope: [${courseName}] ${assignmentName}, posted on ${startDate.toString()}`
    })
  }

  // Append Grades to each of the grades
  const submissionParent = tr.querySelector('.submissionStatus');
  if(submissionParent.querySelector('.submissionStatus--score') !== null){
    // Score exists
    const submissionScore = submissionParent.querySelector('.submissionStatus--score');
    const [grade, base] = submissionScore.innerText.split('/').map(el => parseFloat(el));
    const score = convertGrade(submissionScore.innerText);
    courseAverageBase += base;
    courseAverageGrade += grade;

    // Inject scores
    submissionScore.insertAdjacentText('beforeend', ` (${score})`);

  }else{
    // Not submitted or have not been graded
    const submissionStatus = submissionParent.querySelector('.submissionStatus--text');
    if(submissionStatus.innerText === "No Submission"){
      console.log(isUrgent(dueDate));
      submissionStatus.insertAdjacentText('beforeend', isUrgent(dueDate));
    }
  }
});

const courseCalJson = courseCal.toJSON();

chrome.storage.local.get(calendars => {
  const newCalendar = Object.assign({}, calendars);
  newCalendar[courseCalJson.name] = courseCalJson;
  chrome.storage.local.set(newCalendar);
});

chrome.storage.local.get(cal => console.log(cal));

const multiDownloadHtml = `
  <button id="multi-download" class="download-btn">
    Download .ics
  </button>
`

const totalGradeHtml = `
  <div class="total-grade-container">
    <div class="grade-helper">Cumulative Grade</div>
    <div class="total-grade">${courseAverageGrade} / ${courseAverageBase} (${((courseAverageGrade/courseAverageBase) * 100).toFixed()}%)</div>
  </div>
`
$('.courseDashboard').insertAdjacentHTML('afterend', totalGradeHtml);
$('.courseDashboard').insertAdjacentHTML('afterend', multiDownloadHtml);

document.body.addEventListener('click', event => {
  const targetId = event.target.id;

  if(targetId === 'multi-download'){
    const calStr = courseCal.toString();
    downloadFileFromText(`${courseName}.ics`, calStr);
  }
});