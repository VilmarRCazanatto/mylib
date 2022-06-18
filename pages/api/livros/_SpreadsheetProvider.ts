import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from 'google-spreadsheet'

type getSheetParams = {
    sheetId: string,
    sheetTitle: string,
    creadentials: any
}
export const getSheet = async (
    { sheetId, sheetTitle, creadentials }: getSheetParams
): Promise<GoogleSpreadsheetWorksheet> => {

    let doc = new GoogleSpreadsheet(sheetId)

    try {
        await doc.useServiceAccountAuth(creadentials)
        await doc.loadInfo()

        if (doc.sheetsByIndex.map(sheet => sheet.title).indexOf(sheetTitle) < 0) throw new Error()

        return doc.sheetsByTitle[sheetTitle]
    }
    catch (err) {
        throw new Error("Erro ao pegar worksheet. (_SpreadsheetProvider.ts)")
    }
}