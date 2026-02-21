import React from 'react'
import {
  Navbar,
  Hero,
  TrustedBy,
  Features,
  ProductShowcase,
  Trainers,
  Categories,
  Testimonials,
  Pricing,
  Gallery,
  CTA,
  Footer,
} from './sections'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white antialiased">
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <Features />
        <ProductShowcase />
        <Trainers />
        <Categories />
        <Testimonials />
        <Pricing />
        <Gallery />
        <CTA />
        <Footer />
      </main>
    </div>
  )
}

export default LandingPage
