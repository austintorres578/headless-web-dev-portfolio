import HomeHero from '../components/HomeHero.jsx'
import ColorDiv from '../components/ColorDiv.jsx'
import TechSection from '../components/TechSection.jsx'
import FeaturedProjects from '../components/FeaturedProjects.jsx'

export default function Home() {
    return(
        <>
            <HomeHero />
            <ColorDiv />
            <TechSection />
            <FeaturedProjects />
        </>
    )
}