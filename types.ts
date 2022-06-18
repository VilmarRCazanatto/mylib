export interface Livro {
	title: string,
	author: number,
	author_name?: string,
	release: number,
	rate: number,
	pages: number,
	sinopse: string,
	cover: string,
	code: string,
	will_have: -1 | 1 | 2, // -1: not buy; 1: will buy; 2: have 
	status: number //-1: will read; 1.x: reading (x = reading page / 10000); 2: readed
}

export interface Author {
	name: string
}



export interface LivrosAPI_ResponseType {
	status: number,
	livros?: Livro[],
	error: string
}
export interface AuthorsAPI_ResponseType {
	status: number,
	authors?: Author[],
	error: string
}