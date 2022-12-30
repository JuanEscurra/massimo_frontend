import { Command, CommandDetail } from "shared/models/Command";
import Page from "shared/models/page";
import { instance } from "./AdminInterceptors";

export const saveCommand = async (command: Command): Promise<Command> => {
  const response = await instance.post('/commands', command);
  if (response.status != 201) throw new response.data;
  return response.data;
}

export const getCommandById = async (id: number): Promise<Command> => {
  const response = await instance.get(`/commands/${id}`);
  if (response.status != 200) throw new response.data;
  return response.data;
}

export const saveCommandDetail = async (commandDetail: CommandDetail): Promise<CommandDetail> => {
  const response = await instance.post('/commands/details', commandDetail);
  if (response.status != 201) throw response;
  return response.data;
}

export const deleteCommandDetail = async (id: number): Promise<void> => {
  const response = await instance.delete(`/commands/details/${id}`);
  if (response.status != 204) throw response;
}

export const getAllCommands = async (params: Command, page: number = 0, size: number = 20): Promise<Page<Command>> => {
  const response = await instance.get('/commands', {
    params: { page, size, ...params }
  });
  if (response.status != 200) throw response;
  return response.data;
}

export const deleteCommand = async (id: number) => {
  const response = await instance.delete(`/commands/${id}`);
  if (response.status != 204) throw response;
}

export const finishAttention = async (id: number) => {
  const response = await instance.put(`/commands/finish/${id}`);
  if (response.status != 200) throw response;
}