import type { NextPage } from 'next';
import Navbar from '@/components/Navbar'
import Grid from '@/components/Grid';
import QueryContainer from '@/components/Query/QueryContainer';

const Home: NextPage = () => {
  return (
    <>
      <Grid />
      <Navbar />
      <div className='flex flex-col space-y-12 justify-center items-center z-10 h-screen'>
        <div className='header-text'>
          KEEP IT SHORT
        </div>
        <QueryContainer />
      </div>
    </>
  )
};

export default Home;
