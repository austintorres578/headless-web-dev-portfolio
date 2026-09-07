import HomeHero from '../components/HomeHero.jsx'
import ColorDiv from '../components/ColorDiv.jsx'
import TechSection from '../components/TechSection.jsx'
import FeaturedProjects from '../components/FeaturedProjects.jsx'
import ContactSection from '../components/ContactSection.jsx'
import ExperienceSection from '../components/ExperienceSection.jsx'

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