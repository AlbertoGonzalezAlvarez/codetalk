import { createApiTalk, createApiTalkId } from '../../../../test/mother/TalkMother'
import { TalkRepositoryFake } from '../../../../test/fakes/TalkRepositoryFake'
import { ReviewTalk } from './ReviewTalk'
import { FRAN } from '../../../shared/fixtures/organizers'
import { OrganizerId } from '../../../shared/domain/ids/OrganizerId'
import { TalkNotFoundError } from '../domain/errors/TalkNotFoundError'

describe('ReviewTalk', () => {
  it('assigns the talk to a reviewer', async () => {
    const talkId = createApiTalkId()
    const talk = createApiTalk({ id: talkId })
    const talkRepository = TalkRepositoryFake.createWith(talk)
    const reviewTalk = new ReviewTalk(talkRepository)
    const reviewerId = new OrganizerId(FRAN.id)

    await reviewTalk.execute({
      talkId,
      reviewerId,
    })

    const savedTalk = talkRepository.getLatestSavedTalk()
    expect(savedTalk.isGoingToBeReviewedBy(reviewerId)).toBe(true)
  })

  it('fails if talk does not exist', async () => {
    const notExistentId = createApiTalkId()
    const talkRepository = TalkRepositoryFake.empty()
    const reviewTalk = new ReviewTalk(talkRepository)
    const notImportantId = new OrganizerId(FRAN.id)

    const expectedError = new TalkNotFoundError(notExistentId)
    await expect(() =>
      reviewTalk.execute({
        talkId: notExistentId,
        reviewerId: notImportantId,
      })
    ).rejects.toThrowError(expectedError)
  })
})