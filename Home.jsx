import HomeHero from '../components/sections/HomeHero.jsx'
import ColorDiv from '../components/layout/ColorDiv.jsx'
import TechSection from '../components/sections/TechSection.jsx'
import FeaturedProjects from '../components/sections/FeaturedProjects.jsx'
import ContactSection from '../components/sections/ContactSection.jsx'
import ExperienceSection from '../components/sections/ExperienceSection.jsx'

export default function Home() {
    return(
        <>
            <HomeHero />
            <ColorDiv />
            <TechSection />
            <FeaturedProjects />
            <ExperienceSection />
            <ColorDiv />
            <ContactSection />
        </>
    )
}