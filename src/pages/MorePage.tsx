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

const PHOTOS = [
  { id: 'umtymp-mom', caption: 'UMTYMP graduation, with my mom', src: umtympMom },
  { id: 'family-graduation', caption: "Whole family at my sister's Carlson commencement", src: familyGraduation },
  { id: 'sister-graduation', caption: 'With my sister at her U of M graduation', src: sisterGraduation },
  { id: 'friends-suits-lake', caption: 'Prom night at Excelsior Commons', src: friendsSuitsLake },
  { id: 'friends-suits-field', caption: 'Prom dance at Veterans Field', src: friendsSuitsField },
  { id: 'friends-night-lights', caption: 'VANTAGE Health Sciences crew', src: friendsNightLights },
  { id: 'club-group-classroom', caption: 'My APUSH class, sophomore year', src: clubGroupClassroom },
  { id: 'tennis', caption: 'Tennis season', src: null },
  { id: 'deca-bpa', caption: 'DECA / BPA competition', src: null },
  { id: 'content-creation', caption: 'Content creation (TikTok)', src: null },
  { id: 'pc-building', caption: 'PC building project', src: null },
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
            <li>Barbering -- @pomar.blendz</li>
            <li>Tennis</li>
            <li>PC building and hardware</li>
            <li>Content creation and video editing</li>
          </ul>
        </div>
      </div>
    </PageLayout>
  )
}
