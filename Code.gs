const SHEET_ID = "1jy2Im5RPUeVQeGbnxrQtq2pmuGKCKFm76-J4NFwuuAY";  // think of other ways to store this!

// Create a menu in the Google Slides to trigger the poll
function onOpen() {
  const ui = SlidesApp.getUi();
  ui.createMenu('Poll')
    .addItem('Start Poll', 'openPoll')
    .addToUi();
}

// Function to open the poll
function openPoll() {
  const htmlOutput = HtmlService.createHtmlOutputFromFile('Poll')
    .setWidth(500)
    .setHeight(400);
  SlidesApp.getUi().showModalDialog(htmlOutput, 'Poll');
}

// Function to submit the poll response
function submitResponse(response) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
  sheet.appendRow([response.email, response.answer]);
  return 'Thank you for your response!';
}


// Function to get responses from the Google Sheets
function getResponses() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
  const values = sheet.getDataRange().getValues();
  // const rowCount = values.length;
  // const colCount = values[0].length; // NOTE: can error if 2D array not square matrix
  Logger.log(`values: ${values}`)
  return values;
}


/*
FUTURE ENHANCEMENTS:
Be able to export the wordcloud into a media file format? jpeg, png, pdf, etc.
Be able to generate the wordcloud directly as a media object in slides itself
Able to interact with the vis? tooltip to show number of responses for each word?
*/

