import type { NextPage } from "next";
import Navbar from '@/components/Navbar'
import Grid from '@/components/Grid';

const Home: NextPage = () => {
  return (
    <div>
      <Navbar />
      <Grid />
    </div>)
};

export default Home;
