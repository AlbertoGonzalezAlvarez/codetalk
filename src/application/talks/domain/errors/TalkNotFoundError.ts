import { DomainError } from '../../../../shared/domain/errors/DomainError'
import { TalkId } from '../TalkId'
import { DomainErrorCode } from '../../../../shared/domain/errors/DomainErrorCode'

export class TalkNotFoundError extends DomainError {
  constructor(notExistentId: TalkId) {
    super(
      `Talk with id ${notExistentId.toPrimitives()} not found`,
      DomainErrorCode.TALK_DOES_NOT_EXISTS
    )
  }
}
