//EXTERNAL
import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from 'google-spreadsheet'
import type { NextApiRequest, NextApiResponse } from 'next'

//INTERNAL
import { getSheet } from './_SpreadsheetProvider'
import creadentials from '../../../credentials.json'
import {sheetId, worksheet} from './_GOOGLE_CONST.json'

//TYPES
type Livro = {
	title: string,
	author: number,
	release: number,
	rate: number,
	pages: number,
	sinopse: string,
	cover: string,
	code: string,
	will_have: number,
	status: number
}
type Response = {
	status: number,
	livros?: Livro[],
	error?: string
}

//CONSTANTS
const sheetTitle = worksheet.BOOKS

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
	let response: Response = { status: 0 }
	let sheet

	try {
		sheet = await getSheet({sheetId, sheetTitle, creadentials})		
	} catch (err) {
		res.status(500).json({
			status: 500
		})
		console.log(err)
		return
	}

	switch (req.method) {
		case "GET":
			response = {
				status: 200,
				livros: await getRequest(sheet)
			}
			break;
		case "POST":
			if (!req.body) {
				response = {
					status: 400,
					error: "Livro nao enviado"
				}
				break;
			}

			let livro: Livro
			try {
				livro = JSON.parse(req.body)
			} catch (error) {
				response = {
					status: 400,
					error: "Livro precisa estar em formato JSON valido"
				}
				break;
			}

			if (
				!livro.title ||
				!livro.author ||
				!livro.release ||
				!livro.rate ||
				!livro.pages ||
				!livro.sinopse ||
				!livro.cover ||
				!livro.code ||
				!livro.will_have ||
				!livro.status ||

				!Number.isInteger(livro.author) ||
				!Number.isFinite(livro.rate) ||
				!Number.isInteger(livro.release) ||
				!Number.isInteger(livro.pages) ||
				!Number.isInteger(livro.will_have) ||
				!Number.isFinite(livro.status) ||

				livro.pages < 1
			) {
				response = {
					status: 400,
					error: "Livro com informações incompletas e/ou invalidas"
				}
				break;
			}

			response = await postRequest(sheet, livro)
				? { status: 201 }
				: {
					status: 409,
					error: "Livro ja adicionado"
				}

			break;
		case "DELETE":
			response = {
				status: 501,
				error: "Deleção de livros ainda não implementada"
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

//REQUEST METHODS
const getRequest = async (sheet: GoogleSpreadsheetWorksheet): Promise<Livro[]> => {
	const rows = await sheet.getRows()

	return rows.map(({ title, author, release, rate, pages, sinopse, cover, code, will_have, status }): Livro => {
		return {
			title,
			author: Number(author), 
			release: Number(release),
			rate: Number(rate.split(',').join('.')),
			pages: Number(pages), 
			sinopse, 
			cover, 
			code,
			will_have: Number(will_have),
			status: Number(status)
		}
	})
}

const postRequest = async (sheet: GoogleSpreadsheetWorksheet, livro: Livro): Promise<boolean> => {
	let dblivros = await getRequest(sheet)

	if (dblivros.filter(dblivro =>
		(dblivro.title == livro.title && dblivro.author == livro.author)
	).length) return false

	sheet.addRow(livro)

	return true
}
