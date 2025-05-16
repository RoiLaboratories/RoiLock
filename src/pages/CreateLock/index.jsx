import Footer from "../../components/Footer";
import Warning from "../../components/warning";
import CreateLockScreen from "./CreateLockScreen";


// Example usage for Blockchain chains
export default function CreateLockHolder() {

  return (
    <div className="flex flex-col w-full pt-8 items-center justify-center">
     <CreateLockScreen/>
      <Warning/>
    <Footer/>
    </div>
  );
}