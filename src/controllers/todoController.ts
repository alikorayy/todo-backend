import { RequestHandler, Response } from "express";
import * as TodoDAO from "../database/todoDao";
import appConstants from "../constants/appConstants";
import { TodoSchema } from "../models/todo.models"

const formattedResponseHandler = (res: Response, status: number, data: any) => {
  const responseBody = {
    data: data,
  };
  return res.status(status).json(responseBody);
};

const prepareErrorHandler = (
  res: Response,
  errorCode: number,
  errorMessage: any
) => {
  const errorBody = {
    data: {
      errorDetails: errorMessage,
    },
  };
  res.status(errorCode).json(errorBody);
};

export const getTodos: RequestHandler = async (req, res) => {
  try {
    console.log("Fetching all todos...");
    const todos = await TodoDAO.getAllTodos();
    formattedResponseHandler(res, appConstants.RESPONSE_STATUS.OK, todos);
  } catch (error: any) {
    console.error("Error fetching todos:", error.message);
    prepareErrorHandler(
      res,
      appConstants.RESPONSE_STATUS.SERVER_ERROR,
      error.message
    );
  }
};

export const createTodo: RequestHandler = async (req, res) => {
  try {
    console.log("Creating a new todo...");
    const parsed = TodoSchema.safeParse(req.body);
    if (!parsed.success) {
      prepareErrorHandler(
        res,
        appConstants.RESPONSE_STATUS.BAD_REQUEST,
        parsed.error.errors
      );
      return;
    }

    const newTodo = await TodoDAO.createTodo(parsed.data);
    formattedResponseHandler(
      res,
      appConstants.RESPONSE_STATUS.CREATED,
      newTodo
    );
  } catch (error: any) {
    console.error("Error creating todo:", error.message);
    prepareErrorHandler(
      res,
      appConstants.RESPONSE_STATUS.SERVER_ERROR,
      error.message
    );
  }
};

export const updateTodo: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Updating todo with id:", id);
    const parsed = TodoSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      prepareErrorHandler(
        res,
        appConstants.RESPONSE_STATUS.BAD_REQUEST,
        parsed.error.format()
      );
      return;
    }

    const updated = await TodoDAO.updateTodo(id, parsed.data);
    if (!updated) {
      prepareErrorHandler(
        res,
        appConstants.RESPONSE_STATUS.NOT_FOUND,
        "Todo not found"
      );
      return;
    }
    formattedResponseHandler(res, appConstants.RESPONSE_STATUS.OK, updated);
  } catch (error:any) {
    console.error("Error updating todo:", error.message);
    prepareErrorHandler(
      res,
      appConstants.RESPONSE_STATUS.SERVER_ERROR,
      error.message
    );
  }
};

export const deleteTodo: RequestHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await TodoDAO.deleteTodo(id);
      if (!deleted){
        prepareErrorHandler(res, appConstants.RESPONSE_STATUS.NOT_FOUND, "Todo not found");
        return;
      } 
  
    res.status(appConstants.RESPONSE_STATUS.NO_CONTENT).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete todo", error });
    }
  };
