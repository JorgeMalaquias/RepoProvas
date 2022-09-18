import { Request, Response } from 'express';
import { ITestReq } from '../types/testTypes';
import * as testService from '../services/testService';

export async function postingNewTest(req:Request,res:Response){
    const newTest = await testService.postingNewTest(req.body);
    res.status(201).send(newTest);
}