import type { NextPage } from "next";
import Navbar from '@/components/Navbar'
import Grid from '@/components/Grid';
import QueryContainer from '@/components/Query/QueryContainer';

const Home: NextPage = () => {
  return (
    <>
      <Grid />
      <Navbar />
      <div className='flex justify-center items-center z-10 h-screen'>
        <QueryContainer />
      </div>
    </>
  )
};

export default Home;
