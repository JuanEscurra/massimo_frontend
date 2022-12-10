import { Command, CommandDetail } from "shared/models/Command";
import Page from "shared/models/page";
import { instance } from "./AdminInterceptors";

export const saveCommand = async(command: Command): Promise<Command> => {
  try {
		const response = await instance.post('/commands', command);
		
		if(response.status != 201) throw new response.data;

		return response.data;
  } catch(e) {
    throw e;
  }
}

export const getCommandById = async(id: number): Promise<Command> => {
  try {
    const response = await instance.get(`/commands/${id}`);
    if(response.status != 200) throw new response.data;

    return response.data;
  } catch(e) {
    throw e;
  }
}

export const saveCommandDetail = async (commandDetail: CommandDetail): Promise<CommandDetail> => {
  try {
    const response = await instance.post('/commands/details', commandDetail);
    if(response.status != 201) throw  response;

    return response.data;
  } catch(e) {
    throw e;
  }
}

export const deleteCommandDetail = async(id: number): Promise<void> => {
  try {
    const response = await instance.delete(`/commands/details/${id}`);

    if(response.status != 204) throw response;
  } catch(e) {
    throw e;
  }
}

export const getAllCommands = async(page:number = 0, size: number = 20): Promise<Page<Command>> => {
  try {
    const response = await instance.get('/commands', {params: {page, size}});
    if(response.status != 200) throw response;
    
    return response.data;
  } catch(e) {
    throw e;
  }
}