import { Difficulty } from './difficulty';

export class User {
    uid: string;
    email: string;
    displayName: string;
    totalExp: number;
    todayExp: number;
    streak: number; //days
    difficulty: Difficulty;
    difficultyId: number;
    totalPoints: number;
    role: string;
}