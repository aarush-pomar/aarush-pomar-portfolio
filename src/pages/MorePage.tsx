import PageLayout from '../components/shared/PageLayout'
import MoreParallaxHeader from '../components/sections/MoreParallaxHeader'
import ImageGalaxy3D from '../components/ui/3d-image-gallery'
import umtympMom from '../assets/photos/award-umtymp-mom.jpg'
import familyGraduation from '../assets/photos/family-graduation.jpg'
import sisterGraduation from '../assets/photos/sister-graduation.jpg'
import friendsSuitsLake from '../assets/photos/friends-suits-lake.jpg'
import friendsSuitsField from '../assets/photos/friends-suits-field.jpg'
import friendsNightLights from '../assets/photos/friends-night-lights.jpg'
import clubGroupClassroom from '../assets/photos/club-group-classroom.jpg'
import seniorPortraitField from '../assets/photos/senior-portrait-field.jpg'
import seniorPortraitWalkingAway from '../assets/photos/senior-portrait-walking-away.jpg'
import seniorPortraitBridge from '../assets/photos/senior-portrait-bridge.jpg'
import seniorPortraitCreek from '../assets/photos/senior-portrait-creek.jpg'
import seniorPortraitWalking from '../assets/photos/senior-portrait-walking.jpg'
import seniorPortraitScissors from '../assets/photos/senior-portrait-scissors.jpg'
import tennisBTeamSingles from '../assets/photos/tennis-b-team-singles-champion.jpg'
import conferenceGroupSuits from '../assets/photos/conference-group-suits.jpg'
import conferenceGroupWinter from '../assets/photos/conference-group-winter.jpg'
import hosaSlcGroup from '../assets/photos/hosa-slc-group.webp'
import econClubFirstMeeting from '../assets/photos/econ-club-first-meeting.jpg'
import minnetonkaForumGroup from '../assets/photos/minnetonka-forum-group.jpg'
import dadGhirardelli from '../assets/photos/dad-ghirardelli.jpg'
import friendsBerkeleyGate from '../assets/photos/friends-berkeley-gate.jpg'
import friendsCarouselFair from '../assets/photos/friends-carousel-fair.jpg'
import friendsCloudyNeighborhood from '../assets/photos/friends-cloudy-neighborhood.jpg'
import friendsConcertSunglasses from '../assets/photos/friends-concert-sunglasses.jpg'
import friendsHifiLake from '../assets/photos/friends-hifi-lake.jpg'
import minnsectShowStage from '../assets/photos/minnsect-show-stage.jpg'
import santaMonicaSunset from '../assets/photos/santa-monica-sunset.jpg'

// Every card is a real photo -- no empty "coming soon" slots. The floating
// card shows a cropped version; clicking it opens the full uncropped photo.
const PHOTOS = [
  { id: 'senior-portrait-field', caption: 'Senior photos, fall 2026', src: seniorPortraitField },
  { id: 'senior-portrait-walking-away', caption: 'Senior photos, fall 2026', src: seniorPortraitWalkingAway },
  { id: 'senior-portrait-bridge', caption: 'Senior photos, fall 2026', src: seniorPortraitBridge },
  { id: 'senior-portrait-creek', caption: 'Senior photos, fall 2026', src: seniorPortraitCreek },
  { id: 'senior-portrait-walking', caption: 'Senior photos, fall 2026', src: seniorPortraitWalking },
  { id: 'senior-portrait-scissors', caption: 'Senior photos, with my tools', src: seniorPortraitScissors },
  { id: 'umtymp-mom', caption: 'UMTYMP graduation, with my mom', src: umtympMom },
  { id: 'family-graduation', caption: "Whole family at my sister's Carlson commencement", src: familyGraduation },
  { id: 'sister-graduation', caption: 'With my sister at her U of M graduation', src: sisterGraduation },
  { id: 'dad-ghirardelli', caption: 'With my dad at Ghirardelli', src: dadGhirardelli },
  { id: 'tennis', caption: 'Minnetonka B Team singles champion', src: tennisBTeamSingles },
  { id: 'deca-state', caption: 'DECA State', src: conferenceGroupSuits },
  { id: 'bpa-chapter', caption: 'Our BPA chapter', src: conferenceGroupWinter },
  { id: 'hosa-slc', caption: 'HOSA SLC', src: hosaSlcGroup },
  { id: 'econ-club', caption: 'First Econ Club meeting ever', src: econClubFirstMeeting },
  { id: 'minnetonka-forum', caption: 'Minnetonka Forum team', src: minnetonkaForumGroup },
  { id: 'friends-suits-lake', caption: 'Prom night at Excelsior Commons', src: friendsSuitsLake },
  { id: 'friends-suits-field', caption: 'Prom dance at Veterans Field', src: friendsSuitsField },
  { id: 'friends-night-lights', caption: 'VANTAGE Health Sciences crew', src: friendsNightLights },
  { id: 'club-group-classroom', caption: 'My APUSH class, sophomore year', src: clubGroupClassroom },
  { id: 'minnsect-show', caption: 'The Great Minnsect Show', src: minnsectShowStage },
  { id: 'friends-hifi-lake', caption: 'HiFi on the Lake', src: friendsHifiLake },
  { id: 'friends-concert', caption: 'Concert with friends', src: friendsConcertSunglasses },
  { id: 'friends-carousel', caption: 'Night at the fair', src: friendsCarouselFair },
  { id: 'friends-neighborhood', caption: 'Summer evening with friends', src: friendsCloudyNeighborhood },
  { id: 'berkeley-gate', caption: 'Sather Gate, UC Berkeley', src: friendsBerkeleyGate },
  { id: 'santa-monica', caption: 'Sunset in Santa Monica', src: santaMonicaSunset },
]

export default function MorePage() {
  return (
    <PageLayout>
      <MoreParallaxHeader title="More" subtitle="Photos and a few things I'm into outside of school" />

      <div className="flex flex-col gap-8 pb-10 pt-4 sm:gap-10">
        <div>
          <h2 className="hero-heading pb-4 text-xl font-black uppercase tracking-tight sm:text-2xl md:text-3xl">
            Photo Album
          </h2>
          <ImageGalaxy3D photos={PHOTOS} />
        </div>

        <div className="rounded-[32px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-5 sm:rounded-[40px] sm:p-7 md:rounded-[48px] md:p-8">
          <h2 className="hero-heading pb-6 text-xl font-black uppercase tracking-tight sm:text-2xl md:text-3xl">
            Interests
          </h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-[#D7E2EA]/80 sm:text-base">
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
