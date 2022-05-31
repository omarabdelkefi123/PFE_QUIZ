import { Suggestion } from "./Suggestion";
import { TypeQuestionEnum } from "./typeQuestionEnum";

export class Question {
    id: number;
    question: string;
    typeQuestion: TypeQuestionEnum;
    duration: number;
    answered: string;
    score: string;
    filter: boolean;
    suggestions: Suggestion[];
    scoreinput: string;
    scoreResult: string;
}