import { Inject, Injectable } from '@nestjs/common'
import { EventBus } from '../../../shared/domain/hex/EventBus'
import { UseCase } from '../../../shared/domain/hex/UseCase'
import { AppProvider } from '../../AppProviders'
import { TalkRepository } from '../domain/TalkRepository'
import { TalkStatus } from '../domain/TalkStatus'
import { TalkAlreadyBeingReviewed } from '../domain/errors/TalkAlreadyBeingReviewed'
import { TalkAssignedForReview } from '../domain/TalkAssignedForReview'
import { Talk } from '../domain/Talk'
import { TalkNotFoundError } from '../domain/errors/TalkNotFoundError'

export type ReviewTalkParams = {
  talkId: string
  reviewerId: string
}

@Injectable()
export class ReviewTalk extends UseCase {
  constructor(
    @Inject(AppProvider.EVENT_BUS) private readonly eventBus: EventBus,
    @Inject(AppProvider.TALK_REPOSITORY) private readonly talkRepository: TalkRepository
  ) {
    super()
  }

  async execute({ talkId, reviewerId }: ReviewTalkParams) {
    const talk = await this.talkRepository.findBy(talkId)

    if (!talk) {
      throw new TalkNotFoundError(talkId)
    }

    if (this.getCurrentStatus(talk) === TalkStatus.REVIEWING) {
      throw new TalkAlreadyBeingReviewed(talk.getTalkId())
    }

    talk.setReviewerId(reviewerId)

    await this.talkRepository.save(talk)
    await this.eventBus.publish([new TalkAssignedForReview(talk.getTalkId(), reviewerId)])
  }

  private getCurrentStatus(talk: Talk) {
    if (talk.getIsApproved()) {
      return TalkStatus.APPROVED
    } else if (talk.getIsApproved() === false) {
      return TalkStatus.REJECTED
    } else if (talk.getReviewerId()) {
      return TalkStatus.REVIEWING
    } else {
      return TalkStatus.PROPOSAL
    }
  }
}
