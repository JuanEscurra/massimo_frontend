import Product from "./Product";

export interface Command {
	id?: number,
	tableNumber?: number,
	creationDate?: string,
	status?: CommandStatus,
	totalPrice?: number,
	details?: CommandDetail[]
}

export enum CommandStatus {
	POR_ATENDER = 0,
	ATENDIDO = 1,
	PAGADO = 2,
}

export interface CommandDetail {
	id?: number,
	product?: Product,
	unitPrice?: number,
	quantity?: number,
	command?: Command
}