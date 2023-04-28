export enum DomainErrorCode {
  AGGREGATE_ALREADY_CREATED_ERROR = 'AGGREGATE_ALREADY_CREATED_ERROR',
  INVALID_DATE_RANGE = 'INVALID_DATE_RANGE',
  SPEAKER_DOES_NOT_EXISTS = 'SPEAKER_DOES_NOT_EXISTS',
  UNDERAGE_SPEAKER = 'UNDERAGE_SPEAKER',
  TALK_DOES_NOT_EXISTS = 'TALK_DOES_NOT_EXISTS',
  MAXIMUM_COSPEAKERS_REACHED = 'MAXIMUM_COSPEAKERS_REACHED',
  TALK_TITLE_TOO_LONG = 'TALK_TITLE_TOO_LONG',
  TALK_DESCRIPTION_TOO_LONG = 'TALK_DESCRIPTION_TOO_LONG',
  TALK_ALREADY_BEING_REVIEWED = 'TALK_ALREADY_BEING_REVIEWED',
  TALK_CANNOT_BE_APPROVED = 'TALK_CANNOT_BE_APPROVED',
  TALK_EVENT_NOT_FOUND = 'TALK_EVENT_NOT_FOUND',
}
