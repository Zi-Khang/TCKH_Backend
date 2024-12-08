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
    ASSIGNING = 2,
    REVIEWING = 3,
    REVISIONING = 4,
    COMPLETE = 5,
    PUBLIC = 6,
    REJECT = 7,
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
    REJECT = 3,
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

