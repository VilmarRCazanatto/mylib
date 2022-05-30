import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from 'google-spreadsheet'
import creadentials from '../../../credentials.json'

import type { NextApiRequest, NextApiResponse } from 'next'


type Livro = {
	title: string,
	author: number,
	release: number,
	pages: number,
	sinopse: string,
	cover: string,
	code: string
}
type Response = {
	status: number,
	livros?: Livro[],
	error?: string
}

const sheetId = "1KP_c3UxswLyQeKkWEGSRNUN7JqWU6LMuwvsNrb4ijlo"
const sheetTitle = "books"

const getRequest = async (sheet: GoogleSpreadsheetWorksheet): Promise<Livro[]> => {
	const rows = await sheet.getRows()

	return rows.map(({ title, author, release, pages, sinopse, cover, code }): Livro => {
		return { title, author: Number(author), release: Number(release), pages: Number(pages), sinopse, cover, code }
	})
}

const postRequest = async (sheet: GoogleSpreadsheetWorksheet, livro: Livro): Promise<boolean> => {
	let livros = await getRequest(sheet)

	if (livros.filter(cur_livro => 
		(cur_livro.title == livro.title && cur_livro.author == livro.author)
	).length) return false

	sheet.addRow(livro)

	return true
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
	let response: Response = { status: 0 }
	let doc: GoogleSpreadsheet
	let sheet: GoogleSpreadsheetWorksheet

	try {
		doc = new GoogleSpreadsheet(sheetId)
		await doc.useServiceAccountAuth(creadentials)
		await doc.loadInfo()

		if (doc.sheetsByIndex.map(sheet => sheet.title).indexOf(sheetTitle) < 0) throw new Error()

		sheet = doc.sheetsByTitle[sheetTitle]
	} catch (error) {
		res.status(500).json({
			status: 500
		})
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
				!livro.pages ||
				!livro.sinopse ||
				!livro.cover ||
				!livro.code ||

				!Number.isInteger(livro.author) ||
				!Number.isInteger(livro.release) ||
				!Number.isInteger(livro.pages) ||

				livro.pages < 1
			) {
				response = {
					status: 400,
					error: "Livro com informações incompletas e/ou invalidas"
				}
				break;
			}

			response = await postRequest(sheet, livro) 
				? {status: 201}
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
