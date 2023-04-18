import HeaderHome from "../components/HeaderHome/HeaderHome";
import SidebarHome from "../components/SidebarHome/SidebarHome";
import HomeMain from "../components/HomeMain/HomeMain";
import "../styles/Home.scss";

function Home() {
  return (
    <div>
      <HeaderHome />
      <div className="homewrapper">
        <SidebarHome />
        <HomeMain />
      </div>
    </div>
  );
}

export default Home;
