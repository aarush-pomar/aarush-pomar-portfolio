import PageLayout from '../components/shared/PageLayout'
import PageHeader from '../components/shared/PageHeader'
import PhotoCarousel from '../components/shared/PhotoCarousel'
import FavoriteReadsSection from '../components/sections/FavoriteReadsSection'
import { FAVORITE_READS } from '../data/favoriteReads'
import umtympMom from '../assets/photos/award-umtymp-mom.jpg'
import familyGraduation from '../assets/photos/family-graduation.jpg'
import friendsSuitsLake from '../assets/photos/friends-suits-lake.jpg'
import friendsSuitsField from '../assets/photos/friends-suits-field.jpg'
import tennisBTeamSingles from '../assets/photos/tennis-b-team-singles-champion.jpg'
import conferenceGroupSuits from '../assets/photos/conference-group-suits.jpg'
import conferenceGroupWinter from '../assets/photos/conference-group-winter.jpg'
import econClubFirstMeeting from '../assets/photos/econ-club-first-meeting.jpg'
import minnetonkaForumGroup from '../assets/photos/minnetonka-forum-group.jpg'

// Verified events/accomplishments only -- a curated selection (not every
// photo from the full album), each captioned with what it documents.
// Order is deliberately interleaved (not grouped by type) so the carousel
// doesn't run a stretch of all-formal-group-photos or all-prom-photos.
const PHOTOS = [
  { caption: 'UMTYMP graduation, with my mom', src: umtympMom },
  { caption: 'DECA State competition', src: conferenceGroupSuits },
  { caption: 'Prom night at Excelsior Commons', src: friendsSuitsLake },
  { caption: 'Minnetonka Forum team', src: minnetonkaForumGroup },
  { caption: "Whole family at my sister's Carlson commencement", src: familyGraduation },
  { caption: 'Our BPA chapter', src: conferenceGroupWinter },
  { caption: 'Prom dance at Veterans Field', src: friendsSuitsField },
  { caption: 'First Econ Club meeting ever', src: econClubFirstMeeting },
  { caption: 'Minnetonka B Team singles champion', src: tennisBTeamSingles },
]

export default function MorePage() {
  return (
    <PageLayout>
      <PageHeader title="More" subtitle="Photos and a few things I'm into outside of school" />

      <div className="flex flex-col gap-8 pb-10 pt-4 sm:gap-10">
        <div>
          <h2 className="hero-heading pb-4 text-xl font-black uppercase tracking-tight sm:text-2xl md:text-3xl">
            Photo Album
          </h2>
          <PhotoCarousel photos={PHOTOS} />
        </div>

        <FavoriteReadsSection books={FAVORITE_READS} />

        <div className="rounded-[32px] border-2 border-[#D7E2EA]/18 bg-[#131313] p-5 sm:rounded-[40px] sm:p-7 md:rounded-[48px] md:p-8">
          <h2 className="hero-heading pb-6 text-xl font-black uppercase tracking-tight sm:text-2xl md:text-3xl">
            Interests
          </h2>
          <ul className="list-disc space-y-1 pl-5 text-base text-[#D7E2EA] sm:text-lg">
            <li>Tennis</li>
            <li>Pickleball</li>
            <li>PC building and hardware</li>
            <li>Content creation and video editing</li>
            <li>Gaming</li>
          </ul>
        </div>
      </div>
    </PageLayout>
  )
}
