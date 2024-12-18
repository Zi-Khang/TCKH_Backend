export enum ERoleUser {
    ADMIN = 0,
    READER = 1,
    AUTHOR = 2,
    REVIEWER = 3,
    EDITOR = 4,
    MANERGER = 5,
}

export enum EStatusArticle {
    PENDING = 1,
    ASSIGNED = 2,
    REVIEWED = 3,
    REVISIONING = 4,
    COMPLETE = 5,
    PUBLICING = 6,
    PUBLIC = 7,
    POSTED = 8,
    REJECT = 9,
}

export enum EStatusReview {
    PENDING = 1,
    REVIEW = 2,
    REJECT = 3,
}

export enum EGender {
    MALE = 1,
    FEMALE = 2,
    UNDEFINE = 3,
}

export enum EAssigment {
    PENDING = 1,
    ACCEPT = 2,
    REVISION = 2,
    REJECT = 2,
}

export enum ENoti {
    SENT = 1,
    SEEN = 2,
}

export enum EDecision {
    ACCEPT = 1,
    REVISION = 2,
    REJECT = 2,
}

export enum EField {
    Natural_Science = 1,
    Science_And_Technology = 2,
    Medical_And_Health_Sciences = 3,
    Social_Sciences_And_Humanities = 4,
    Mathematics_And_Statistics = 5,
    Agricultural_And_Food_Science = 6,
    Science_Education = 7,
}

