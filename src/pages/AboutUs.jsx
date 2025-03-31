import WithoutFooterLayout from '../components/Layout/WithoutFooterLayout'
import AboutUsCard from '../components/AboutUsCard'
import AboutUsForm from '../components/AboutUsForm'

const AboutUs = () => {
  return (
    <WithoutFooterLayout>
      <AboutUsCard />
      <AboutUsForm />
    </WithoutFooterLayout>
  )
}

export default AboutUs