import { User } from "../user/User";
import { Question } from "./Question";
import { Suggestion } from "./Suggestion";
import { Test } from "./Test";
import { TypeQuestionEnum } from "./typeQuestionEnum";

export class TestEvaluation {
    id: number;
    test: Test;
    suggestionsAnswered: Suggestion[];
    questionsAnswered: Question[];
    user: User;
    score: string;  
}