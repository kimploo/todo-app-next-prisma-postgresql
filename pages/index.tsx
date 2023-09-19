import Toast from "@/components/Alert/Alert";
import Card from "@/components/Card/Card";
import Header from "@/components/Header/Header";
import Input from "@/components/Input/Input";

const Home = () => {
  return (
    <>
      <Toast />
      <main className="h-screen flex flex-col justify-center items-center">
        <Header />
        <Input />
        <Card />
      </main>
    </>
  );
};

export default Home;
