import { Request, Response } from 'express';
import { ITestReq } from '../types/testTypes';
import * as testServices from '../services/testService';

export async function postingNewTest(req:Request,res:Response){
    const newTest = await testServices.postingNewTest(req.body);
    res.status(201).send(newTest);
}

export async function gettingAllTestsByDiscipline(req:Request,res:Response){
    const tests = await testServices.gettingAllTestsByDiscipline();
    res.status(200).send(tests);
}
export async function gettingAllTestsByTeacher(req:Request,res:Response){
    const newTest = await testServices.postingNewTest(req.body);
    res.status(201).send(newTest);
}