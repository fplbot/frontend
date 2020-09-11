import React from 'react'
import Features from '../components/index/Features'
import Header from '../components/Header'
import AddToSlackForm from '../components/index/AddToSlackForm'
import Footer from '../components/Footer'


export default function Index() {
  return (
    <div>
      <Header />
      <Features />
      <AddToSlackForm />
      <Footer />
    </div>
  )
}
