import express from "express";

export const createServer = () => {
  const server = express();

  server.use(express.json());

  return server;
};
