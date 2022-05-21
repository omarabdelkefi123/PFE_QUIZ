import { Suggestion } from "./Suggestion";
import { TypeQuestionEnum } from "./typeQuestionEnum";

export class Question {
    id: number;
    question: string;
    typeQuestion: TypeQuestionEnum;
    suggestions: Suggestion[];
}