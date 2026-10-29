const SPREADSHEET_ID = '1XQWmYdBFG0PRuSr-yZQOiay15eXS-ddl6Xzys53Pktc';
const SHEET_NAME = '顧客名單';

function doPost(e) {
  try {
    const p = (e && e.parameter) ? e.parameter : {};
    const name = String(p.name || '').trim();
    const email = String(p.email || '').trim();
    const phone = String(p.phone || '').trim();
    const consent = String(p.consent || '').trim();

    if (!name || !email || consent !== 'on') {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, message: '請完整填寫必填欄位並同意接收資訊。' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      sheet.appendRow(['提交時間', '姓名', '電子郵件', '聯絡電話', '行銷資訊同意']);
    }
    sheet.appendRow([new Date(), name, email, phone, '是']);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: '資料已保存。' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: '儲存失敗，請檢查試算表 ID 與部署權限。' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
