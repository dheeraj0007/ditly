import Redirect from "./components/common/Redirect";
import Appbar from "./components/home/Appbar";
import Header from "./components/home/Header";

export default function Home() {
  return (
    <div>
      <Appbar />
      <Header />
      <Redirect />
    </div>
  );
}
