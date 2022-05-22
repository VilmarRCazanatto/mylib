import type { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'

import { SearchHeader, ShelfScroll, Head } from './../components'

const Home: NextPage = () => {

  return (
    <div>
      <Head />
      
      <SearchHeader />
      <ShelfScroll />
      <div >

        <div>

        </div>
      </div>

    </div>
  )
}

export default Home