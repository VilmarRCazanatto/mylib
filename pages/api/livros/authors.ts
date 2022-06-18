//EXTERNAL
import type { NextApiRequest, NextApiResponse } from 'next'
import { GoogleSpreadsheetWorksheet } from 'google-spreadsheet'

//INTERNAL
import { getSheet } from './_SpreadsheetProvider'
import creadentials from '../../../credentials.json'
import {sheetId, worksheet} from './_GOOGLE_CONST.json'

//TYPES
import { Author } from '../../../types'
type Response = {
    status: number,
    authors?: Author[],
    error?: string
}

//CONSTANTS
const sheetTitle = worksheet.AUTHORS

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
    let response: Response = { status: 0 }
    let sheet

    try {
        sheet = await getSheet({ sheetId, sheetTitle, creadentials })
    } catch (err) {
        response = { status: 500 }
        console.log(err)
        return
    }

    switch (req.method) {
        case 'GET':
            response = {
                status: 200,
                authors: await getRequest(sheet)
            }
            break;
        case 'POST':
            if (!req.body) {
				response = {
					status: 400,
					error: "Autor nao enviado"
				}
				break;
			}

			let author: Author
			try {
				author = JSON.parse(req.body)
			} catch (error) {
				response = {
					status: 400,
					error: "Author precisa estar em formato JSON valido"
				}
				break;
			}

			if (
				!author.name
			) {
				response = {
					status: 400,
					error: "Author com informações incompletas e/ou invalidas"
				}
				break;
			}

			response = await postRequest(sheet, author)
				? { status: 201 }
				: {
					status: 409,
					error: "Author ja adicionado"
				}

			break;
        default:
            response = {
                status: 405,
                error: "Metodo invalido"
            }
            break;
    }



    res.status(response.status).json(response)
}

const getRequest = async (sheet: GoogleSpreadsheetWorksheet): Promise<Author[]> => {
    const rows = await sheet.getRows()

    return rows.map(({ name }): Author => ({ name }))
}

const postRequest = async (sheet: GoogleSpreadsheetWorksheet, author: Author): Promise<boolean> => {
    let dbauthor = await getRequest(sheet)

    if (dbauthor.filter(
        ({name}) => name == author.name
    ).length) return false


    sheet.addRow(author as {}) //solve this after

    return true
}